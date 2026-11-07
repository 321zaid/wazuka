// Phase 2: replace with Supabase
import type { Product } from '../data/products';
import type { Category } from '../data/categories';
import type { ProductImage } from '../data/products';
import {
  products,
  getFeaturedProducts,
  getProductsByCategory,
  getProductBySlug,
  getProductById,
} from '../data/products';
import { categories } from '../data/categories';

export type { Product, Category, ProductImage };

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    return Promise.resolve([...products]);
  },
  getProductBySlug: async (slug: string): Promise<Product | undefined> => {
    return Promise.resolve(getProductBySlug(slug));
  },
  getProductById: async (id: string): Promise<Product | undefined> => {
    return Promise.resolve(getProductById(id));
  },
  getCategories: async (): Promise<Category[]> => {
    return Promise.resolve([...categories]);
  },
  getFeaturedProducts: async (): Promise<Product[]> => {
    return Promise.resolve(getFeaturedProducts());
  },
  getProductsByCategory: async (categorySlug: string): Promise<Product[]> => {
    return Promise.resolve(getProductsByCategory(categorySlug));
  },
};

export default productService;
