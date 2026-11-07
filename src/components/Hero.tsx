import { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { WhatsAppLink } from './links';

type Slide = {
  id: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  name: string;
  caption: string;
  productSlug: string;
};

type HeroSlideshowProps = {
  slides: Slide[];
};

export const HeroSlideshow: React.FC<HeroSlideshowProps> = ({ slides }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const timerRef = useRef<number | null>(null);
  const slideDuration = 5000;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  useEffect(() => {
    if (!isPlaying || isHovered) return;
    timerRef.current = window.setInterval(nextSlide, slideDuration);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [current, isPlaying, isHovered, nextSlide, slideDuration]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) window.clearInterval(timerRef.current);
      } else {
        if (isPlaying && !isHovered && timerRef.current === null) {
          timerRef.current = window.setInterval(nextSlide, slideDuration);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isPlaying, isHovered, nextSlide, slideDuration]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    },
    [prevSlide, nextSlide]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart) return;
      const dx = e.changedTouches[0].clientX - touchStart.x;
      const dy = e.changedTouches[0].clientY - touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx > 0) prevSlide();
        else nextSlide();
      }
      setTouchStart(null);
    },
    [touchStart, prevSlide, nextSlide]
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[400px] md:min-h-[560px] overflow-hidden rounded-3xl bg-blue-50 border border-navy-900/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          } transition-opacity duration-700 ease-in-out`}
        >
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0 bg-gradient-to-t from-blue-50/30 via-transparent to-transparent"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1556912197-4c92d8c28132?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')`} }
              aria-hidden="true"
            />
            <img
              src={slide.image}
              alt={slide.alt}
              width={slide.width}
              height={slide.height}
              className={`max-w-full max-h-[400px] md:max-h-[560px] object-cover mx-auto md:mx-0 ${
                index === current ? 'animate-ken-burns' : ''
              }`}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 flex items-end justify-between pt-8 pb-12 pl-12 pr-12 md:pl-20 md:pr-20">
              <div className="max-w-md">
                <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-2 shadow-sm">{slide.name}</h3>
                <p className="text-white text-sm md:text-base shadow-sm">{slide.caption}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur text-navy-900 w-10 h-10 rounded-full flex items-center justify-center shadow-soft hover:bg-white transition-colors opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur text-navy-900 w-10 h-10 rounded-full flex items-center justify-center shadow-soft hover:bg-white transition-colors opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pause/play button */}
      <button
        onClick={() => setIsPlaying((prev) => !prev)}
        className="absolute right-4 bottom-4 bg-white/90 backdrop-blur text-navy-900 w-10 h-10 rounded-full flex items-center justify-center shadow-soft hover:bg-white transition-colors"
        aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
      >
        {isPlaying ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === current ? 'bg-blue-700 w-8' : 'bg-navy-900/20 hover:bg-navy-900/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === current ? 'true' : undefined}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-navy-900/10 overflow-hidden">
        <div
          className="h-full bg-blue-700 transition-all duration-linear"
          style={{ width: isPlaying ? ((current / slides.length) * 100) : 100 }}
        />
      </div>
    </section>
  );
};

type HeroProps = {};

export const Hero: React.FC<HeroProps> = () => {
  const slides: Slide[] = [
    {
      id: 'slide-1',
      image: '/products/deli-glass.jpg',
      alt: 'Deli Glass dessert cups with berries and cream',
      width: 1600,
      height: 1600,
      name: 'Deli Glass Dessert Cups',
      caption: 'Clear glass cups perfect for parfaits and desserts.',
      productSlug: 'deli-glass-dessert-cups',
    },
    {
      id: 'slide-2',
      image: '/products/emerald-glass.jpg',
      alt: 'Emerald green textured drinking glasses',
      width: 1600,
      height: 1600,
      name: 'Emerald Green Glasses',
      caption: 'Rich green textured tumblers for every drink.',
      productSlug: 'emerald-green-textured-drinking-glasses',
    },
    {
      id: 'slide-3',
      image: '/products/long-glass.jpg',
      alt: 'Long glass tumblers with drinks and citrus',
      width: 1600,
      height: 1600,
      name: 'Long Glass Tumblers',
      caption: 'Tall diamond-cut glasses for cocktails and juices.',
      productSlug: 'long-glass-tumblers',
    },
    {
      id: 'slide-4',
      image: '/products/tea-glass.jpg',
      alt: 'Clear glass mugs with handles',
      width: 1600,
      height: 1600,
      name: 'Clear Glass Mugs',
      caption: 'Textured glass mugs with comfortable handles.',
      productSlug: 'clear-glass-mugs-with-handles',
    },
  ];

  return (
    <section className="relative pt-8 md:pt-24 pb-8 md:pb-20 overflow-hidden">
      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider">
              <span className="w-3 h-0.5 bg-red-500 rounded-full inline-block dpr:scale-100"></span>
              Kitchen essentials
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-blue-900 leading-tight text-balance">
              Beautiful kitchen essentials for everyday life.
              <span className="border-b border-red-500 border-b-2 w-24 dpr:border-b-4" />
            </h1>
            <p className="text-lg md:text-xl text-navy-900/70 max-w-lg leading-relaxed">
              Glassware, ceramics, cookware, and more for your home. Quality you can trust, at prices that feel fair.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="#products"
                className="btn-primary text-center"
              >
                Browse products
              </Link>
              <WhatsAppLink
                message={`Hello ${siteConfig.businessName}, I saw your website and I'd like to know more about your products.`}
                className="btn-outline text-center"
              />
            </div>
          </div>
          <div className="relative">
            <HeroSlideshow slides={slides} />
          </div>
        </div>
      </div>
    </section>
  );
};
