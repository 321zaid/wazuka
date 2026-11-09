'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

type LegalPageProps = {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
};

export const LegalPage: React.FC<LegalPageProps> = ({ title, lastUpdated, children }) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <nav className="mb-10">
            <Link
              href="/"
              className="text-blue-700 text-sm font-medium hover:underline no-underline inline-flex items-center gap-1 mb-4"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to home
            </Link>
          </nav>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-navy-900 mb-2">{title}</h1>
          <p className="text-navy-900/50 text-sm mb-8">Last updated: {lastUpdated}</p>

          <div className="prose prose-navy max-w-none">
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
