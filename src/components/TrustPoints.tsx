export const TrustPoints = () => {
  const points = [
    {
      title: 'Quality you can see',
      text: 'Every product is photographed as-is so you know exactly what you’re ordering.',
    },
    {
      title: 'Friendly advice',
      text: 'Not sure what you need? Message us on WhatsApp and we’ll help you choose.',
    },
    {
      title: 'Easy ordering',
      text: 'No cart, no checkout. Just send us a message and we’ll confirm your order.',
    },
    {
      title: 'Fair prices',
      text: 'Good kitchenware at honest prices for households and small food businesses.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-max section-padding">
        <div className="section-header text-center mb-16">
          <h2 className="section-title">Why choose WAZUKA</h2>
          <p className="section-subtitle">
            Simple, honest, and built for real kitchens.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, index) => (
            <div key={index} className="p-8 rounded-2xl bg-navy-50 border border-navy-900/5">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 text-xl mb-6">
                {index === 0 ? '✓' : index === 1 ? '💬' : index === 2 ? '📦' : '💰'}
              </div>
              <h3 className="text-lg font-heading font-bold text-navy-900 mb-3">{point.title}</h3>
              <p className="text-navy-900/70 leading-relaxed">{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
