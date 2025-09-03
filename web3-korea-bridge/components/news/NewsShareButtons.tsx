'use client';

import { useState } from 'react';
import { 
  Share2, 
  Twitter, 
  Linkedin, 
  Facebook,
  Link as LinkIcon,
  Mail,
  MessageCircle
} from 'lucide-react';

interface NewsShareButtonsProps {
  url: string;
  title: string;
  locale: string;
}

export default function NewsShareButtons({ url, title, locale }: NewsShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const isKorean = locale === 'ko';

  const shareButtons = [
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-[#1DA1F2] hover:bg-[#1a8cd8]',
      onClick: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          '_blank'
        );
      }
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-[#0077B5] hover:bg-[#006399]',
      onClick: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          '_blank'
        );
      }
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2] hover:bg-[#166fe5]',
      onClick: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank'
        );
      }
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366] hover:bg-[#22c55e]',
      onClick: () => {
        window.open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`,
          '_blank'
        );
      }
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
      onClick: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
          title + '\n\n' + url
        )}`;
      }
    },
    {
      name: isKorean ? '링크 복사' : 'Copy Link',
      icon: LinkIcon,
      color: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300',
      onClick: () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-900 dark:text-white">
        <Share2 className="w-5 h-5" />
        <h3 className="text-lg font-semibold">
          {isKorean ? '공유하기' : 'Share this article'}
        </h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {shareButtons.map((button) => {
          const Icon = button.icon;
          const isLinkButton = button.name.includes('Copy') || button.name.includes('링크');
          
          return (
            <button
              key={button.name}
              onClick={button.onClick}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-white transition-all duration-200 ${button.color} ${
                isLinkButton && copied ? 'ring-2 ring-green-500' : ''
              }`}
              title={button.name}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">
                {isLinkButton && copied ? (isKorean ? '복사됨!' : 'Copied!') : button.name}
              </span>
            </button>
          );
        })}
      </div>

      {copied && (
        <div className="text-sm text-green-600 dark:text-green-400 animate-fade-in">
          {isKorean ? '✓ 링크가 클립보드에 복사되었습니다' : '✓ Link copied to clipboard'}
        </div>
      )}
    </div>
  );
}