'use client';

import { useParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductModal } from '@/components/ProductModal';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

export default function ProductPage() {
  const { slug } = useParams();

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
                Back
              </button>
            </div>
            <ProductModal
              isOpen={true}
              onClose={() => window.history.back()}
              productSlug={typeof slug === 'string' ? slug : undefined}
            />
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};