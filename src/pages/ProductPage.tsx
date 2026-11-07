import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductModal } from '@/components/ProductModal';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

export const ProductPage = () => {
  const { slug } = useParams();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="section-padding">
          <div className="container-max">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <button
                onClick={() => window.history.back()}
                className="text-sm text-blue-700 font-medium hover:underline no-underline flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            </div>
            <ProductModal
              isOpen={true}
              onClose={() => {}}
              productSlug={slug || undefined}
            />
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};
