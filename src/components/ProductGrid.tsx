import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/data/products';
import { productService } from '@/lib/productService';
import { ProductCard } from './ProductCard';

type ProductGridProps = {
  categorySlug?: string;
};

export const ProductGrid: React.FC<ProductGridProps> = ({ categorySlug }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all');

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      if (categorySlug) {
        const filtered = await productService.getProductsByCategory(categorySlug);
        setProducts(filtered);
        setActiveTab(categorySlug);
      } else {
        const all = await productService.getProducts();
        setProducts(all);
        setActiveTab('all');
      }
      setLoading(false);
    };
    loadProducts();
  }, [categorySlug]);

  useParams();

  const handleFilter = async (slug: string) => {
    setActiveTab(slug);
    setLoading(true);
    if (slug === 'all') {
      const all = await productService.getProducts();
      setProducts(all);
    } else {
      const filtered = await productService.getProductsByCategory(slug);
      setProducts(filtered);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="container-max section-padding">
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-700 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const categories = ['all', 'glassware', 'ceramics-tableware', 'cookware', 'kitchen-appliances', 'storage-organization', 'utensils-tools'];
  const categoryNames: Record<string, string> = {
    all: 'All products',
    glassware: 'Glassware',
    'ceramics-tableware': 'Ceramics & Tableware',
    cookware: 'Cookware',
    'kitchen-appliances': 'Appliances',
    'storage-organization': 'Storage',
    'utensils-tools': 'Utensils',
  };

  const filteredProducts =
    activeTab === 'all' ? products : products.filter((p) => p.category === activeTab);

  return (
    <section id="products" className="py-16 md:py-24">
      <div className="container-max section-padding">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-900 mb-2">
              {categorySlug ? 'Category' : 'All products'}
            </h2>
            <p className="text-navy-900/60">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} available
            </p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === cat
                    ? 'bg-blue-700 text-white shadow-soft'
                    : 'bg-navy-50 text-navy-900/60 hover:bg-navy-900/10 hover:text-navy-900 border border-transparent'
                }`}
              >
                {categoryNames[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
              📭
            </div>
            <h3 className="text-xl font-heading font-bold text-navy-900 mb-2">
              No products in this category yet
            </h3>
            <p className="text-navy-900/60 max-w-sm mx-auto">
              We're adding new products to this category soon. Check back or browse other categories.
            </p>
            <button onClick={() => handleFilter('all')} className="mt-6 btn-outline">
              Browse all products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
