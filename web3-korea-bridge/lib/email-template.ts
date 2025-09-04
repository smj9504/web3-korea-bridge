interface ContactEmailData {
  name: string
  email: string
  company?: string
  phone?: string
  inquiryType: string
  message: string
}

export function generateContactEmailHTML(data: ContactEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Web3 Korea Bridge - 문의사항</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Web3 Korea Bridge</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">새로운 문의사항이 도착했습니다</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
        <h2 style="color: #495057; margin-top: 0; border-bottom: 2px solid #6f42c1; padding-bottom: 10px;">문의자 정보</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #6f42c1; width: 120px;">이름:</td>
            <td style="padding: 8px 0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #6f42c1;">이메일:</td>
            <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #007bff;">${data.email}</a></td>
          </tr>
          ${data.company ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #6f42c1;">회사:</td>
            <td style="padding: 8px 0;">${data.company}</td>
          </tr>
          ` : ''}
          ${data.phone ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #6f42c1;">연락처:</td>
            <td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #007bff;">${data.phone}</a></td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #6f42c1;">문의 유형:</td>
            <td style="padding: 8px 0;">
              <span style="background: #6f42c1; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px;">
                ${getInquiryTypeLabel(data.inquiryType)}
              </span>
            </td>
          </tr>
        </table>

        <h3 style="color: #495057; margin-top: 25px; margin-bottom: 15px; border-bottom: 1px solid #dee2e6; padding-bottom: 8px;">문의 내용</h3>
        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #6f42c1; font-size: 14px;">
          ${data.message.replace(/\n/g, '<br>')}
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; font-size: 12px; color: #6c757d;">
          <p style="margin: 0;">이 이메일은 <strong>web3-korea-bridge.com</strong> 웹사이트의 contact form을 통해 자동으로 발송되었습니다.</p>
          <p style="margin: 5px 0 0 0;">전송 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function getInquiryTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'general': '일반 문의',
    'partnership': '파트너십',
    'investment': '투자 문의',
    'media': '미디어 문의',
    'technical': '기술 지원',
    'other': '기타'
  }
  return labels[type] || type
}

export function generateContactEmailSubject(name: string, inquiryType: string): string {
  const typeLabel = getInquiryTypeLabel(inquiryType)
  return `[Web3 Korea Bridge] ${typeLabel} - ${name}님의 문의`
}