import {
  BRAND_LABELS,
  BRANDS,
  CATEGORIES,
  PRODUCTS,
  TYPES,
  type Brand,
  type Category,
  type Product,
  type ProductType,
} from "./data/products";

export {
  BRAND_LABELS,
  BRANDS,
  CATEGORIES,
  TYPES,
  type Brand,
  type Category,
  type Product,
  type ProductType,
};

export const PRICE_FLOOR = PRODUCTS.reduce(
  (low, product) => Math.min(low, product.price),
  Infinity
);

export const PRICE_CEILING = PRODUCTS.reduce(
  (high, product) => Math.max(high, product.price),
  0
);

export type CatalogFilters = {
  search: string;
  categories: Category[];
  types: ProductType[];
  brands: Brand[];
  maxPrice: number;
  onlyDiscounted: boolean;
  onlyNew: boolean;
};

export const EMPTY_FILTERS: CatalogFilters = {
  search: "",
  categories: [],
  types: [],
  brands: [],
  maxPrice: PRICE_CEILING,
  onlyDiscounted: false,
  onlyNew: false,
};

export type SortKey = "relevancia" | "precio-asc" | "precio-desc" | "nombre";

/** Normaliza para que "champú" encuentre "champu" y viceversa. */
const fold = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

export const getAllProducts = (): readonly Product[] => PRODUCTS;

export const getProductBySlug = (slug: string): Product | undefined =>
  PRODUCTS.find((product) => product.slug === slug);

export const getFeaturedProducts = (limit: number): Product[] =>
  PRODUCTS.filter((product) => product.isFeatured).slice(0, limit);

export const getNewProducts = (limit: number): Product[] =>
  PRODUCTS.filter((product) => product.isNew).slice(0, limit);

export const getDiscountedProducts = (limit: number): Product[] =>
  PRODUCTS.filter((product) => product.originalPrice !== null).slice(0, limit);

/** Productos del mismo tipo y categoría, excluyendo el actual. */
export const getRelatedProducts = (product: Product, limit: number): Product[] => {
  const sameNiche = PRODUCTS.filter(
    (candidate) =>
      candidate.id !== product.id &&
      candidate.category === product.category &&
      candidate.type === product.type
  );

  if (sameNiche.length >= limit) {
    return sameNiche.slice(0, limit);
  }

  const sameCategory = PRODUCTS.filter(
    (candidate) =>
      candidate.id !== product.id &&
      candidate.category === product.category &&
      !sameNiche.includes(candidate)
  );

  return [...sameNiche, ...sameCategory].slice(0, limit);
};

export const discountPercent = (product: Product): number | null => {
  if (product.originalPrice === null || product.originalPrice <= product.price) {
    return null;
  }

  return Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
};

export const filterProducts = (
  products: readonly Product[],
  filters: CatalogFilters
): Product[] => {
  const needle = fold(filters.search.trim());

  return products.filter((product) => {
    if (needle) {
      const haystack = fold(
        `${product.name} ${product.description} ${BRAND_LABELS[product.brand]}`
      );
      if (!haystack.includes(needle)) return false;
    }

    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.category)
    ) {
      return false;
    }

    if (filters.types.length > 0 && !filters.types.includes(product.type)) {
      return false;
    }

    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false;
    }

    if (product.price > filters.maxPrice) return false;

    if (filters.onlyDiscounted && discountPercent(product) === null) return false;

    if (filters.onlyNew && !product.isNew) return false;

    return true;
  });
};

export const sortProducts = (products: Product[], sort: SortKey): Product[] => {
  const ordered = [...products];

  switch (sort) {
    case "precio-asc":
      return ordered.sort((a, b) => a.price - b.price);
    case "precio-desc":
      return ordered.sort((a, b) => b.price - a.price);
    case "nombre":
      return ordered.sort((a, b) => a.name.localeCompare(b.name, "es"));
    case "relevancia":
    default:
      return ordered.sort((a, b) => {
        if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
        if (a.isNew !== b.isNew) return a.isNew ? -1 : 1;
        return a.name.localeCompare(b.name, "es");
      });
  }
};

/** Marcas presentes en el catálogo, ordenadas por cantidad de productos. */
export const getBrandsInUse = (): { brand: Brand; label: string; count: number }[] =>
  BRANDS.map((brand) => ({
    brand,
    label: BRAND_LABELS[brand],
    count: PRODUCTS.filter((product) => product.brand === brand).length,
  }))
    .filter((entry) => entry.count > 0)
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "es"));

export const countActiveFilters = (filters: CatalogFilters): number =>
  filters.categories.length +
  filters.types.length +
  filters.brands.length +
  (filters.search.trim() ? 1 : 0) +
  (filters.maxPrice < PRICE_CEILING ? 1 : 0) +
  (filters.onlyDiscounted ? 1 : 0) +
  (filters.onlyNew ? 1 : 0);
