import { useState } from 'react';
import { SkipLink } from '@/components/links';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { CategoryTiles } from '@/components/CategoryTiles';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductModal } from '@/components/ProductModal';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { TrustPoints } from '@/components/TrustPoints';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';

export const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<string | null>(null);

  const closeModal = () => {
    setModalOpen(false);
    setModalProduct(null);
  };

  return (
    <div className="relative flex flex-col">
      <SkipLink />
      <Header />
      <main id="main-content" className="flex-1 relative overflow-x-hidden">
        <Hero />
        <CategoryTiles />

        <section id="products" className="py-16 md:py-24 bg-navy-50 scroll-margin-top">
          <div className="container-max section-padding">
            <div className="section-header text-center mb-16">
              <h2 className="section-title">Featured products</h2>
              <p className="section-subtitle">
                Our most popular items — customer favourites you’ll love too.
              </p>
            </div>
            <ProductGrid />
          </div>
        </section>

        <section id="all-products" className="py-16 md:py-24 bg-white scroll-margin-top">
          <div className="container-max section-padding">
            <div className="section-header text-center mb-16">
              <h2 className="section-title">All products</h2>
              <p className="section-subtitle">
                Browse our full catalogue. Use the filter tabs to explore by category.
              </p>
            </div>
            <ProductGrid />
          </div>
        </section>

        <TrustPoints />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />

      {modalOpen && modalProduct && (
        <ProductModal isOpen={true} onClose={closeModal} productSlug={modalProduct} />
      )}

      <FloatingWhatsApp />
    </div>
  );
};
