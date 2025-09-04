'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  locale: string;
}

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  inquiryType: z.string().min(1, 'Please select an inquiry type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  privacy: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy',
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm({ locale }: ContactFormProps) {
  const t = useTranslations('contact.form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      privacy: false,
    },
  });

  const privacyValue = watch('privacy');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // In production, you would send the data to your API endpoint
      console.log('Form submitted:', data);
      
      setSubmitStatus('success');
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
      id="contact-form"
    >
      <h2 className="text-2xl font-bold mb-6">{t('title')}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <Label htmlFor="name" className="mb-2">
            {t('name')} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            {...register('name')}
            placeholder={t('namePlaceholder')}
            className={errors.name ? 'border-red-500' : ''}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <Label htmlFor="email" className="mb-2">
            {t('email')} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder={t('emailPlaceholder')}
            className={errors.email ? 'border-red-500' : ''}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Company Field */}
        <div>
          <Label htmlFor="company" className="mb-2">
            {t('company')}
          </Label>
          <Input
            id="company"
            {...register('company')}
            placeholder={t('companyPlaceholder')}
            disabled={isSubmitting}
          />
        </div>

        {/* Phone Field */}
        <div>
          <Label htmlFor="phone" className="mb-2">
            {t('phone')}
          </Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder={t('phonePlaceholder')}
            disabled={isSubmitting}
          />
        </div>

        {/* Inquiry Type */}
        <div>
          <Label htmlFor="inquiryType" className="mb-2">
            {t('inquiryType')} <span className="text-red-500">*</span>
          </Label>
          <Select
            onValueChange={(value) => setValue('inquiryType', value)}
            disabled={isSubmitting}
          >
            <SelectTrigger className={errors.inquiryType ? 'border-red-500' : ''}>
              <SelectValue placeholder={t('inquiryTypePlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">{t('inquiryTypes.general')}</SelectItem>
              <SelectItem value="partnership">{t('inquiryTypes.partnership')}</SelectItem>
              <SelectItem value="investment">{t('inquiryTypes.investment')}</SelectItem>
              <SelectItem value="technical">{t('inquiryTypes.technical')}</SelectItem>
            </SelectContent>
          </Select>
          {errors.inquiryType && (
            <p className="mt-1 text-sm text-red-500">{errors.inquiryType.message}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <Label htmlFor="message" className="mb-2">
            {t('message')} <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="message"
            {...register('message')}
            placeholder={t('messagePlaceholder')}
            rows={5}
            className={errors.message ? 'border-red-500' : ''}
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
          )}
        </div>

        {/* Privacy Checkbox */}
        <div className="flex items-start space-x-2">
          <Checkbox
            id="privacy"
            checked={privacyValue}
            onCheckedChange={(checked) => setValue('privacy', checked as boolean)}
            disabled={isSubmitting}
          />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="privacy"
              className="text-sm font-normal cursor-pointer"
            >
              {t('privacyAgree')} <span className="text-red-500">*</span>
            </Label>
            {errors.privacy && (
              <p className="text-sm text-red-500">{errors.privacy.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
          size="lg"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {isSubmitting ? t('sending') : t('submit')}
        </Button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2"
          >
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <p className="text-green-800 dark:text-green-300">{t('success')}</p>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2"
          >
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <p className="text-red-800 dark:text-red-300">{t('error')}</p>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}