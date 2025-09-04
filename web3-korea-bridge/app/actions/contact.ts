'use server'

import { Resend } from 'resend'
import { z } from 'zod'
import { generateContactEmailHTML, generateContactEmailSubject } from '@/lib/email-template'

const resend = new Resend(process.env.RESEND_API_KEY)

// Form validation schema (서버사이드)
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').max(100),
  company: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  inquiryType: z.string().min(1, 'Please select an inquiry type'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  privacy: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy',
  }),
})

// Rate limiting (메모리 기반 - 간단한 구현)
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW = 5 * 60 * 1000 // 5분
const RATE_LIMIT_MAX_REQUESTS = 3 // 5분당 3회

function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const requests = rateLimitMap.get(identifier) || []
  
  // 5분 이내의 요청만 필터링
  const recentRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW)
  
  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }
  
  // 새 요청 시간 추가
  recentRequests.push(now)
  rateLimitMap.set(identifier, recentRequests)
  
  return true
}

export interface ContactFormState {
  success?: boolean
  message?: string
  errors?: {
    name?: string[]
    email?: string[]
    company?: string[]
    phone?: string[]
    inquiryType?: string[]
    message?: string[]
    privacy?: string[]
  }
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    // IP 기반 rate limiting (헤더에서 가져오기)
    // 실제로는 headers()를 사용해야 하지만, 간단한 구현을 위해 이메일 기반 제한
    const email = formData.get('email') as string
    if (email && !checkRateLimit(email)) {
      return {
        success: false,
        message: '너무 많은 요청입니다. 5분 후에 다시 시도해주세요.'
      }
    }

    // 입력 데이터 검증
    const rawData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string || undefined,
      phone: formData.get('phone') as string || undefined,
      inquiryType: formData.get('inquiryType') as string,
      message: formData.get('message') as string,
      privacy: formData.get('privacy') === 'true',
    }

    // Zod 검증
    const validationResult = contactFormSchema.safeParse(rawData)
    
    if (!validationResult.success) {
      const fieldErrors: Record<string, string[]> = {}
      validationResult.error.issues.forEach((error) => {
        const field = error.path[0] as string
        if (!fieldErrors[field]) {
          fieldErrors[field] = []
        }
        fieldErrors[field].push(error.message)
      })
      
      return {
        success: false,
        message: '입력 정보를 확인해주세요.',
        errors: fieldErrors as ContactFormState['errors']
      }
    }

    const validatedData = validationResult.data

    // 환경 변수 검증
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return {
        success: false,
        message: '이메일 서비스 설정에 문제가 있습니다. 관리자에게 문의해주세요.'
      }
    }

    if (!process.env.EMAIL_TO_ADMIN) {
      console.error('EMAIL_TO_ADMIN is not configured')
      return {
        success: false,
        message: '이메일 서비스 설정에 문제가 있습니다. 관리자에게 문의해주세요.'
      }
    }

    // 이메일 전송
    const emailHtml = generateContactEmailHTML(validatedData)
    const emailSubject = generateContactEmailSubject(validatedData.name, validatedData.inquiryType)

    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: process.env.EMAIL_TO_ADMIN,
      subject: emailSubject,
      html: emailHtml,
    })

    if (result.error) {
      console.error('Email sending failed:', result.error)
      return {
        success: false,
        message: '이메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.'
      }
    }

    console.log('Email sent successfully:', result.data?.id)
    
    return {
      success: true,
      message: '문의사항이 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.'
    }

  } catch (error) {
    console.error('Contact form submission error:', error)
    
    return {
      success: false,
      message: '시스템 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
    }
  }
}