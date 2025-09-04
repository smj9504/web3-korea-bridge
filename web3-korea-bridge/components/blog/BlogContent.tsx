'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface BlogContentProps {
  content: string;
  className?: string;
}

export function BlogContent({ content, className }: BlogContentProps) {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    // Parse headings for table of contents
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = parseMarkdown(content);
    
    const headingElements = tempDiv.querySelectorAll('h1, h2, h3');
    const headingData = Array.from(headingElements).map((heading, index) => {
      const id = `heading-${index}`;
      const level = parseInt(heading.tagName[1]);
      return {
        id,
        text: heading.textContent || '',
        level,
      };
    });
    
    setHeadings(headingData);
  }, [content]);

  // Simple markdown parser
  const parseMarkdown = (markdown: string) => {
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 id="$1">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 id="$1">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 id="$1">$1</h1>');

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');

    // Lists
    html = html.replace(/^\* (.+)/gim, '<li>$1</li>');
    html = html.replace(/(<li>[\s\S]*<\/li>)/g, '<ul class="list-disc pl-6 space-y-2">$1</ul>');
    
    html = html.replace(/^\d+\. (.+)/gim, '<li>$1</li>');
    html = html.replace(/(<li>[\s\S]*<\/li>)/g, '<ol class="list-decimal pl-6 space-y-2">$1</ol>');

    // Code blocks
    html = html.replace(/```([^`]+)```/g, '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>');
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">$1</code>');

    // Blockquotes
    html = html.replace(/^> (.+)/gim, '<blockquote class="border-l-4 border-primary pl-4 italic">$1</blockquote>');

    // Horizontal rule
    html = html.replace(/^---$/gim, '<hr class="my-8 border-border" />');

    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p class="mb-4">');
    html = '<p class="mb-4">' + html + '</p>';

    // Clean up empty paragraphs
    html = html.replace(/<p class="mb-4"><\/p>/g, '');
    html = html.replace(/<p class="mb-4">(<h[1-6])/g, '$1');
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
    html = html.replace(/<p class="mb-4">(<ul|<ol|<blockquote|<pre|<hr)/g, '$1');
    html = html.replace(/(<\/ul>|<\/ol>|<\/blockquote>|<\/pre>|<hr \/>)<\/p>/g, '$1');

    return html;
  };

  const processedContent = parseMarkdown(content);

  // Add IDs to headings for navigation
  const contentWithIds = processedContent.replace(
    /<(h[1-3])([^>]*)>([^<]+)<\/\1>/g,
    (match, tag, attrs, text, index) => {
      const headingIndex = headings.findIndex(h => h.text === text);
      const id = headingIndex !== -1 ? headings[headingIndex].id : `heading-${index}`;
      return `<${tag} id="${id}" class="scroll-mt-20">${text}</${tag}>`;
    }
  );

  return (
    <div 
      className={cn(
        "prose prose-lg dark:prose-invert max-w-none",
        "prose-headings:font-bold prose-headings:tracking-tight",
        "prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8",
        "prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8",
        "prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6",
        "prose-p:leading-relaxed prose-p:text-foreground/90",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-strong:text-foreground prose-strong:font-semibold",
        "prose-ul:my-6 prose-ol:my-6",
        "prose-li:my-2",
        "prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg",
        "prose-code:text-primary prose-code:font-mono prose-code:text-sm",
        "prose-pre:bg-gray-900 prose-pre:text-gray-100",
        className
      )}
      dangerouslySetInnerHTML={{ __html: contentWithIds }}
    />
  );
}