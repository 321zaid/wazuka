import { Link } from 'react-router-dom';
import type { Product } from '@/data/products';
import { siteConfig } from '@/config/site';


type ProductCardProps = {
  product: Product;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const mainImage = product.images[0];
  const whatsAppMsg = `Hello ${siteConfig.businessName}, I'm interested in ${product.name}. Is it available?`;

  return (
    <article className="product-card group">
      <div className="relative h-64 md:h-72 bg-navy-50 overflow-hidden">
        <img
          src={mainImage.src}
          alt={mainImage.alt}
          width={mainImage.width}
          height={mainImage.height}
          className="w-full h-full object-contain p-4 md:p-6 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        {product.placeholder && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            Placeholder
          </div>
        )}
        {product.featured && (
          <div className="absolute top-3 right-3 bg-white shadow-soft flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-blue-700 border border-blue-100">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Featured
          </div>
        )}
        {!siteConfig.showPrices && product.price !== undefined && (
          <div className="absolute bottom-3 left-3 bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-card">
            Contact for price
          </div>
        )}
        {siteConfig.showPrices && product.price !== undefined && (
          <div className="absolute bottom-3 left-3 bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-card">
            {siteConfig.currency} {product.price.toFixed(2)}
          </div>
        )}
      </div>
      <div className="p-5">
        <Link
          to={`/product/${product.slug}`}
          className="text-navy-900 font-medium text-sm md:text-base leading-tight group-hover:text-blue-700 transition-colors no-underline mb-1 block"
        >
          {product.name}
        </Link>
        <p className="text-xs text-navy-900/50 uppercase tracking-wider font-semibold mb-3">
          {product.category.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
        </p>
        <p className="text-sm text-navy-900/70 line-clamp-2 mb-4">{product.shortDescription}</p>
        <div className="flex items-center justify-between pt-4 border-t border-navy-900/5">
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsAppMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-700 text-xs font-semibold hover:text-blue-600 no-underline"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
};
