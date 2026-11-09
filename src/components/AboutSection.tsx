import { siteConfig } from '@/config/site';

export const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-navy-50 scroll-margin-top">
      <div className="container-max section-padding">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8 reveal-on-scroll">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-blue-900 leading-tight reveal">
              About WAZUKA
            </h2>
            <p className="text-lg text-navy-900/70 leading-relaxed reveal reveal-delay-1">
              WAZUKA is a kitchenware brand built for households, home cooks, and small food
              businesses who want reliable, good-looking kitchen products at fair prices.
            </p>
            <p className="text-lg text-navy-900/70 leading-relaxed reveal reveal-delay-2">
              We believe buying for your kitchen should be simple and trustworthy. No hidden
              fees, no complicated checkouts — just browse, message us, and we’ll take care of
              the rest.
            </p>
            <p className="text-lg text-navy-900/70 leading-relaxed reveal reveal-delay-3">
              From glassware and ceramics to cookware and appliances, we’re here to help you
              find what you need.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-blue-700/10 rounded-3xl blur-3xl" />
            <div className="relative rounded-3xl overflow-hidden border border-navy-900/10 shadow-card bg-white">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    W
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900">WAZUKA Kitchenware</h4>
                    <p className="text-sm text-navy-900/50">{siteConfig.address}</p>
                  </div>
                </div>
                <p className="text-navy-900/60 leading-relaxed">
                  [Placeholder brand story — tell your customers about who you are, how you
                  started, and what makes your kitchenware special.]
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
