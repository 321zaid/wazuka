'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories, getCategoryBySlug } from '@/data/categories';

type CategoryTilesProps = {
  onSelect?: (slug: string) => void;
};

export const CategoryTiles: React.FC<CategoryTilesProps> = ({ onSelect }) => {
  const pathname = usePathname();
  const [activeSlug, setActiveSlug] = useState<string | null>(
    getCategoryBySlug(pathname.replace('/category/', ''))?.slug || null
  );

  const handleSelect = (slug: string) => {
    setActiveSlug(slug);
    onSelect?.(slug);
  };

  return (
    <section className="py-16 md:py-24 bg-[--color-blue-50]">
      <div className="container-max section-padding">
        <div className="section-header mb-12 flex flex-col sm:flex-row items-center gap-2">
          <p className="text-xs md:text-sm font-medium tracking-wider text-blue-600 uppercase mb-2 sm:mb-0">
            COLLECTIONS
          </p>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy-900 mb-0">
            Shop by category
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => {
            const isActive = activeSlug === category.slug;

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                onClick={() => handleSelect(category.slug)}
                className="group block rounded-2xl bg-white border border-navy-900/5 transition-all duration-300 hover:shadow-lg hover:border-navy-900/10 no-underline cursor-pointer border-b-2 border-red-500/0 hover:border-red-500/20"
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="relative h-48 sm:h-64 md:h-80 bg-[--color-blue-50] overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  {category.slug === 'glassware' ? (
                    <img
                      src="/products/emerald-glass.jpg"
                      alt={category.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="flex items-center justify-center h-full text-navy-900/60"
                    >
                      <svg
                        className="w-8 h-8 mx-auto opacity-70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6m2-3a2 2 0 012 2h2m2-3a2 2 0 012 2h2m2-3a2 2 0 012 2h2m-6-6h.01M19.5 18c0 1.216-.943 2.11-2.128 2.11C15.29 20 14 19.5 14 18s.29-.5.5-.82m-6.12-6.89a2 2 0 11-1.897.4L13.95 7m5.64 4L19.5 14M16 16l6-10L8 16m0 6a2 2 0 100 4 2 2 0 000-4z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-heading font-bold text-navy-900 line-clamp-1">
                    <span className="relative inset-0">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-0.5 bg-red-500 rounded-full"></span>
                      {category.name}
                    </span>
                  </h3>
                  <p className="mt-1 text-sm text-navy-900/60 line-clamp-1">
                    {category.description}
                  </p>
                  <span className="mt-1 block text-red-500 text-xs font-medium uppercase">Coming soon</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};