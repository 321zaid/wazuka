import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cookie Policy', href: '/cookies' },
  ];

  const categories = [
    { name: 'Glassware', href: '#products' },
    { name: 'Ceramics & Tableware', href: '#products' },
    { name: 'Cookware', href: '#products' },
    { name: 'Appliances', href: '#products' },
    { name: 'Storage', href: '#products' },
    { name: 'Utensils', href: '#products' },
  ];

  return (
    <footer className="bg-navy-900 text-white pt-16 md:pt-20 pb-8">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <svg
                width="36"
                height="36"
                className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ease-out"
                viewBox="0 0 200 80"
                aria-label="WAZUKA Kitchenware"
              >
<circle cx="130" cy="55" r="2.5" fill="#D62839"/>
              </svg>
            </div>
            <p className="text-navy-200/70 text-sm leading-relaxed max-w-sm">
              Beautiful kitchen essentials for everyday life. Glassware, ceramics, cookware, and more —
              contact us by WhatsApp, phone, or email to order.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Quick links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-navy-200/60 text-sm hover:text-white transition-colors no-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Categories</h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <a
                    href={cat.href}
                    className="text-navy-200/60 text-sm hover:text-white transition-colors no-underline"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Follow us</h4>
            <ul className="space-y-3">
              {siteConfig.instagram && (
                <li>
                  <a
                    href={`https://instagram.com/${siteConfig.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy-200/60 text-sm hover:text-white transition-colors no-underline flex items-center gap-2"
                  >
                    Instagram
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.071 3.252.144 4.771 1.691 4.915 4.915.059 1.265.071 1.645.071 4.85 0 3.204-.012 3.584-.071 4.85-.144 3.252-1.691 4.771-4.915 4.915-1.265.059-1.645.071-4.85.071-3.204 0-3.584-.012-4.85-.071-3.252-.144-4.771-1.691-4.915-4.915-.059-1.265-.071-1.645-.071-4.85 0-3.204.012-3.584.071-4.85.144-3.252 1.691-4.771 4.915-4.915 1.265-.059 1.645-.071 4.85-.071zM12 6.885c-1.16 0-2.184.48-2.896 1.223-.68.71-1.085 1.69-1.134 2.65-.04.85.012 1.736.059 2.65.04.85.124 1.645.256 2.242.173.775.548 1.456 1.23 1.943.71.506 1.749.776 2.837.776 1.155 0 2.22-.293 2.957-.823.754-.537 1.155-1.25 1.31-2.057.167-.843.19-1.784.149-2.67-.04-.91-.064-1.82-.105-2.724-.07-.935-.422-1.69-1.04-2.242-.6-.54-1.6-.92-2.84-1.274-.73-.21-1.793-.258-2.985-.258zm0 2.162c1.206 0 2.27.48 3.063 1.309.754.791 1.14 1.882 1.18 3.092.04 1.223-.012 2.327-.09 3.452-.063.994-.188 1.83-.383 2.535-.256.903-.718 1.66-1.506 2.19-.843.57-2.004.804-3.36.804-1.37 0-2.547-.244-3.401-.823-.791-.537-1.206-1.318-1.393-2.217-.186-.887-.21-1.806-.169-2.74.031-.947.07-1.893.1-2.84.031-.947.133-1.691.323-2.342.244-.81.63-1.456 1.18-2.057.537-.602 1.319-1.085 2.458-1.309 1.16-.228 2.242-.308 3.47-.308 1.217 0 2.29.08 3.47.308 1.155.228 1.937.706 2.464 1.309.537.602.918 1.248 1.16 2.057.24.81.357 1.656.323 2.342.031.947.069 1.893.1 2.84.041.934.017 1.853-.169 2.74-.187.898-.602 1.68-1.393 2.217-.854.58-2.031.823-3.401.823-1.356 0-2.517-.234-3.36-.804-.788-.53-1.25-1.287-1.506-2.19-.195-.705-.32-1.54-.383-2.535-.078-1.125-.13-2.229-.09-3.452-.04-1.21.426-2.301 1.18-3.092.793-.83 1.857-1.31 3.063-1.31z" />
                    </svg>
                  </a>
                </li>
              )}
              {siteConfig.facebook && (
                <li>
                  <a
                    href={`https://facebook.com/${siteConfig.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy-200/60 text-sm hover:text-white transition-colors no-underline"
                  >
                    Facebook
                  </a>
                </li>
              )}
              {siteConfig.tiktok && (
                <li>
                  <a
                    href={`https://tiktok.com/@${siteConfig.tiktok}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy-200/60 text-sm hover:text-white transition-colors no-underline"
                  >
                    TikTok
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-700/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-navy-400 text-sm">
            © {currentYear} {siteConfig.businessName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-navy-400 text-sm hover:text-white no-underline">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="text-navy-400 text-sm hover:text-white no-underline">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-navy-400 text-sm hover:text-white no-underline">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
