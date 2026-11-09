'use client';

import { useEffect } from 'react';
import { siteConfig } from '@/config/site';

export const SkipLink = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .skip-link {
        position: absolute;
        top: -48px;
        left: 1rem;
        background: #0B4FC7;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        z-index: 10000;
        transition: top 0.2s;
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
      }
      .skip-link:focus {
        top: 1rem;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <a href="#main-content" className="skip-link">
      Skip to content
    </a>
  );
};

export const WhatsAppLink = ({ message, className }: { message: string; className?: string }) => {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, '')}?text=${encoded}`;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
      WhatsApp
    </a>
  );
};
