import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactFAQ from '@/components/contact/ContactFAQ';
import ContactCTA from '@/components/contact/ContactCTA';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function ContactPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  
  return (
    <MainLayout locale={locale}>
      {/* Hero Section */}
      <ContactHero locale={locale} />
      
      {/* Main Contact Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <ContactForm locale={locale} />
            </div>
            
            {/* Contact Information */}
            <div className="order-1 lg:order-2">
              <ContactInfo locale={locale} />
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <ContactFAQ locale={locale} />
      
      {/* CTA Section */}
      <ContactCTA locale={locale} />
    </MainLayout>
  );
}