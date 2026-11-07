export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  features: string[];
  price?: number;
  images: ProductImage[];
  featured: boolean;
  inStock: boolean;
  sortOrder: number;
  placeholder: boolean;
};

export const products: Product[] = [
  {
    id: 'deli-glass-dessert-cups',
    name: 'Deli Glass Dessert Cups (Set of 6)',
    slug: 'deli-glass-dessert-cups',
    category: 'glassware',
    shortDescription:
      'Clear glass dessert cups with a fluted base, perfect for parfaits, puddings, and fruit trifles.',
    description:
      'A set of six clear glass dessert cups with a textured fluted design and sturdy pedestal base. Ideal for serving desserts, parfaits, or layered fruit cups at home or for small catering orders. [to be added]',
    features: [
      'Set of 6 matching glass dessert cups',
      'Clear glass with textured fluted pattern',
      'Sturdy pedestal base for stability',
      'Suitable for desserts, puddings, and fruit cups',
      '[to be added]',
    ],
    images: [
      {
        src: '/products/deli-glass.jpg',
        alt: 'Six clear glass dessert cups filled with yogurt, berries, and cream, arranged on a wooden surface',
        width: 1600,
        height: 1600,
      },
    ],
    featured: true,
    inStock: true,
    sortOrder: 1,
    placeholder: false,
  },
  {
    id: 'emerald-glass-drinking-glasses',
    name: 'Emerald Green Textured Drinking Glasses',
    slug: 'emerald-green-textured-drinking-glasses',
    category: 'glassware',
    shortDescription:
      'Rich green textured tumblers with a chevron pattern, shown with ice and lemon.',
    description:
      'Emerald green drinking glasses with a textured chevron pattern and dark base. The photo shows a set arranged on a light wooden table, one glass filled with water, ice, and a lemon slice. [to be added]',
    features: [
      'Emerald green tinted glass',
      'Textured chevron pattern',
      'Dark weighted base',
      'Shown as a set of multiple glasses',
      '[to be added]',
    ],
    images: [
      {
        src: '/products/emerald-glass.jpg',
        alt: 'Emerald green textured drinking glasses arranged in a row on a wooden table, front glass filled with water, ice, and lemon slice',
        width: 1600,
        height: 1600,
      },
    ],
    featured: true,
    inStock: true,
    sortOrder: 2,
    placeholder: false,
  },
  {
    id: 'long-glass-tumblers',
    name: 'Long Glass Tumblers (Set)',
    slug: 'long-glass-tumblers',
    category: 'glassware',
    shortDescription:
      'Tall clear glass tumblers with diamond-cut texture, served with citrus and mint.',
    description:
      'A set of tall clear glass tumblers with diamond-cut and ribbed textures, shown filled with colorful drinks, ice, citrus slices, and mint. Presented with a GLASS WARE gift box in the background. [to be added]',
    features: [
      'Set of tall clear glass tumblers',
      'Diamond-cut and ribbed textures',
      'Thick sturdy base',
      'Gift box packaging shown',
      '[to be added]',
    ],
    images: [
      {
        src: '/products/long-glass.jpg',
        alt: 'Six tall clear glass tumblers with diamond-cut texture, filled with colorful drinks, ice, citrus, and mint, arranged on a table with a GLASS WARE box',
        width: 1600,
        height: 1600,
      },
    ],
    featured: false,
    inStock: true,
    sortOrder: 3,
    placeholder: false,
  },
  {
    id: 'tea-glass-mugs',
    name: 'Clear Glass Mugs with Handles',
    slug: 'clear-glass-mugs-with-handles',
    category: 'glassware',
    shortDescription:
      'Clear glass mugs with handles and a bubble-textured body, shown with gift packaging.',
    description:
      'Clear glass mugs with C-shaped handles and a bubble or honeycomb texture on the body. Shown as a set of five with Jin Yue branded gift box packaging. Suitable for tea, coffee, or water. [to be added]',
    features: [
      'Clear glass with bubble/honeycomb texture',
      'C-shaped handles for easy grip',
      'Set of 5 mugs shown',
      'Gift box packaging included',
      '[to be added]',
    ],
    images: [
      {
        src: '/products/tea-glass.jpg',
        alt: 'Five clear glass mugs with handles and bubble texture, arranged with Jin Yue branded gift box on a wooden table',
        width: 1600,
        height: 1600,
      },
    ],
    featured: true,
    inStock: true,
    sortOrder: 4,
    placeholder: false,
  },
];

export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p.featured).sort((a, b) => a.sortOrder - b.sortOrder);

export const getProductsByCategory = (categorySlug: string): Product[] =>
  products
    .filter((p) => p.category === categorySlug)
    .sort((a, b) => a.sortOrder - b.sortOrder);

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);
