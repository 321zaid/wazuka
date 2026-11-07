import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { WhatsAppLink } from './links';
import { siteConfig } from '@/config/site';

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    setLogoVisible(true);
    const scrollHandler = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Products', href: '#products' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <div className="scroll-progress" />
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all ${scrolled
          ? 'duration-300 bg-white/90 backdrop-blur-md shadow-sm border-b border-navy-900/5'
          : 'duration-300 bg-transparent/50'}`}
      >
        <div className="container-max section-padding">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 hover:no-underline"
              onClick={() => setMobileOpen(false)}
            >
              <div className={`group relative ${logoVisible ? 'animate-fade-in-up transition-all duration-800 ease-out' : ''}`}>
                <svg
                  width="36"
                  height="36"
                  className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ease-out"
                  viewBox="0 0 200 80"
                  aria-label="WAZUKA Kitchenware"
                >
<text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle"
                      font-family="Plus Jakarta Sans, sans-serif"
                      className="text-52 md:text-48 font-bold tracking-wider"
                      fill="#0B3D91">
                    WAZUKA
                  </text>
                  <circle cx="130" cy="55" r="2.5" fill="#D62839" />
                  <text x="50%" y="70" dominant-baseline="middle" text-anchor="middle"
                        font-family="Plus Jakarta Sans, sans-serif"
                        font-weight="500"
                        font-size="8"
                        letter-spacing="1"
                        fill="#0B3D91"
                        opacity="0.7">
                    KITCHENWARE
                  </text>
                </svg>
              </div>
              <span className="hidden md:inline font-heading font-bold text-xl tracking-wider">WAZUKA</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href.startsWith('#') ? link.href : link.href}
                  className="text-sm font-medium text-navy-900/80 transition-colors hover:text-blue-700 no-underline"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <WhatsAppLink
                message={`Hello ${siteConfig.businessName}, I'd like to enquire about your products.`}
                className="btn-primary whitespace-nowrap"
              />
            </div>

            <button
              className="md:hidden text-navy-900"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-navy-900/5">
            <div className="container-max section-padding py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href.startsWith('#') ? link.href : link.href}
                  className="block text-base font-medium text-navy-900 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 no-underline"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <WhatsAppLink
                message={`Hello ${siteConfig.businessName}, I'd like to enquire about your products.`}
                className="block w-full text-center btn-primary"
              />
            </div>
          </div>
        )}
      </header>

      <div className="h-16 md:h-20" />
    </>
  );
};