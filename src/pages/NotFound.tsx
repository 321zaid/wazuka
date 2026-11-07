import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const NotFound = () => {
  return (
    <section className="py-20 md:py-32 flex items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-6xl md:text-8xl mb-8">404</div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-navy-900 mb-4">
          Page not found
        </h1>
        <p className="text-lg text-navy-900/60 mb-10">
          Sorry, we can’t find that page. It may have moved or been removed.
        </p>
        <Link
          to="/"
          className="btn-primary"
        >
          Back to home
        </Link>
      </motion.div>
    </section>
  );
};
