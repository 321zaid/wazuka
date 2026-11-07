export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  sortOrder: number;
  productCount: number;
};

export const categories: Category[] = [
  {
    id: 'glassware',
    name: 'Glassware',
    slug: 'glassware',
    description: 'Drinking glasses, dessert cups, and glass serveware for every table.',
    icon: '🥛',
    sortOrder: 1,
    productCount: 4,
  },
  {
    id: 'ceramics-tableware',
    name: 'Ceramics & Tableware',
    slug: 'ceramics-tableware',
    description: 'Plates, bowls, mugs, and serveware for daily meals and gatherings.',
    icon: '🍽️',
    sortOrder: 2,
    productCount: 0,
  },
  {
    id: 'cookware',
    name: 'Cookware',
    slug: 'cookware',
    description: 'Pots, pans, and bakeware built to last.',
    icon: '🍳',
    sortOrder: 3,
    productCount: 7,
  },
  {
    id: 'kitchen-appliances',
    name: 'Kitchen Appliances',
    slug: 'kitchen-appliances',
    description: 'Rice cookers, induction cookers, gas cookers, and more.',
    icon: '🔌',
    sortOrder: 4,
    productCount: 0,
  },
  {
    id: 'storage-organization',
    name: 'Storage & Organization',
    slug: 'storage-organization',
    description: 'Jars, containers, and racks to keep your kitchen tidy.',
    icon: '📦',
    sortOrder: 5,
    productCount: 3,
  },
  {
    id: 'utensils-tools',
    name: 'Utensils & Tools',
    slug: 'utensils-tools',
    description: 'Spatulas, knives, peelers, and every tool you need to cook.',
    icon: '🍴',
    sortOrder: 6,
    productCount: 0,
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);

export const getCategoryById = (id: string): Category | undefined =>
  categories.find((c) => c.id === id);
