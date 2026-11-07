import { siteConfig } from '@/config/site';

export const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-white scroll-margin-top">
      <div className="container-max section-padding">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-blue-900 leading-tight">
              Get in touch
            </h2>
            <p className="text-lg text-navy-900/70 leading-relaxed">
              Have a question about a product? Want to place an order? Message us on WhatsApp,
              call, or email — we’ll reply as soon as we can.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 shrink-0">
                  💬
                </div>
                <div>
                  <h3 className="font-bold text-navy-900">WhatsApp</h3>
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${siteConfig.businessName}, I found you online and would like to enquire about your products.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 font-medium text-sm hover:underline no-underline"
                  >
                    {siteConfig.whatsappNumber}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 shrink-0">
                  📞
                </div>
                <div>
                  <h3 className="font-bold text-navy-900">Phone</h3>
                  <a
                    href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}
                    className="text-blue-700 font-medium text-sm hover:underline no-underline"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 shrink-0">
                  ✉️
                </div>
                <div>
                  <h3 className="font-bold text-navy-900">Email</h3>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-blue-700 font-medium text-sm hover:underline no-underline"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-navy-900/5">
              <p className="text-sm text-navy-900/50 mb-2">
                Address
              </p>
              <div className="flex items-start gap-3">
                <span className="text-navy-900/70 text-sm leading-relaxed">
                  {siteConfig.address}
                </span>
              </div>
              <p className="text-sm text-navy-900/50 mt-2">
                {siteConfig.openingHours}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 text-sm font-medium hover:underline no-underline mt-2 inline-block"
              >
                Open in Google Maps
              </a>
            </div>

            <p className="text-sm text-navy-900/50 mt-6">
              By contacting us you agree to our{' '}
              <a href="/privacy" className="text-blue-700 font-medium hover:underline no-underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <div className="bg-blue-700 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6">
              Ready to order?
            </h3>
            <p className="text-blue-100 mb-8 leading-relaxed">
              Send us a message on WhatsApp with the product name and we’ll check availability
              and confirm the price.
            </p>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${siteConfig.businessName}, I’d like to order from your kitchenware range. Please share availability and prices.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white text-blue-700 px-6 py-4 rounded-xl font-semibold text-base hover:bg-blue-50 transition-colors no-underline flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Message us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
