'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { Product } from '@/data/products';
import { productService } from '@/lib/productService';
import { siteConfig } from '@/config/site';
import { WhatsAppLink } from './links';

type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productSlug?: string;
};

export const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, productSlug }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && productSlug) {
      const loadProduct = async () => {
        const p = await productService.getProductBySlug(productSlug);
        setProduct(p || null);
        setCurrentImage(0);
      };
      loadProduct();
    } else if (!isOpen) {
      setProduct(null);
      setCurrentImage(0);
      setIsZoomed(false);
    }
  }, [isOpen, productSlug]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const mainImage = product?.images[currentImage];

  const handleZoom = useCallback(() => {
    setIsZoomed((prev) => !prev);
  }, []);

  const whatsAppMsg = product
    ? `Hello ${siteConfig.businessName}, I'm interested in ${product.name}. Is it available?`
    : '';

  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 400 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="relative bg-white rounded-3xl shadow-card max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-navy-900/10 text-navy-900 flex items-center justify-center hover:bg-navy-900/20 transition-colors z-20"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image gallery */}
            <div className="w-full md:w-1/2 border-r border-navy-900/5 flex flex-col">
              <div className="relative h-[400px] md:h-full flex items-center justify-center bg-navy-50">
                {mainImage && (
                  <img
                    src={mainImage.src}
                    alt={mainImage.alt}
                    width={mainImage.width}
                    height={mainImage.height}
                    className={`max-h-full max-w-full object-contain p-4 md:p-8 ${
                      isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
                    } transition-transform duration-300`}
                    onClick={handleZoom}
                  />
                )}
                {isZoomed && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm">
                    Click to zoom out
                  </div>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto px-4 py-3 border-t border-navy-900/5 scrollbar-hide">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 ${
                        currentImage === index
                          ? 'border-blue-700 bg-blue-50'
                          : 'border-navy-900/5 bg-white hover:border-navy-900/20'
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product details */}
            <div className="flex-1 p-6 md:p-10 overflow-y-auto">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 block">
                    {product.category.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy-900 mb-2 leading-tight">
                    {product.name}
                  </h2>
                  {siteConfig.showPrices && product.price !== undefined && (
                    <p className="text-xl font-bold text-blue-700 mb-4">
                      {siteConfig.currency} {product.price.toFixed(2)}
                    </p>
                  )}
                  {!siteConfig.showPrices && product.price === undefined && (
                    <p className="text-lg font-semibold text-blue-700 mb-4">
                      Contact for price
                    </p>
                  )}
                </div>
                <button
        onClick={() => {
          onClose();
          router.push(`/product/${product.slug}`);
        }}
                  className="text-navy-900/60 hover:text-blue-700 transition-colors"
                  aria-label="Open product page"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </button>
              </div>

              <p className="text-navy-900/70 leading-relaxed mb-6">
                {product.description}
              </p>

              {product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-navy-900 uppercase tracking-wider mb-4">
                    Key features
                  </h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-navy-900/70 leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 text-xs font-bold shrink-0">
                          {index + 1}
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-navy-900 uppercase tracking-wider mb-3">
                  Availability
                </h3>
                <div className={`flex items-center gap-2 ${
                  product.inStock ? 'text-green-600' : 'text-amber-600'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-current" />
                  <span className="font-medium">
                    {product.inStock ? 'In stock' : 'Out of stock'}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <WhatsAppLink
                  message={whatsAppMsg}
                  className="w-full btn-primary text-center justify-center"
                />
                <a
                  href={`mailto:${siteConfig.email}?subject=Enquiry: ${product.name}`}
                  className="w-full btn-outline text-center justify-center"
                >
                  Email us
                </a>
              </div>

              {product.placeholder && (
                <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-100">
                  <p className="text-sm text-red-700">
                    This product has placeholder details. Please contact us for full information.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
