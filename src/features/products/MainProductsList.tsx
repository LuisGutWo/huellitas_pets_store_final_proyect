import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import MainProductCard from "./components/MainProductCard";
import FilterPanel, { FilterState } from "./components/FilterPanel";
import ActiveFilterChips from "./components/ActiveFilterChips";
import MobileFilterDrawer from "./components/MobileFilterDrawer";
import SearchBar from "./components/SearchBar";
import { ProductListSkeleton, Skeleton } from "../../shared/components/SkeletonLoader";
import BackToTopButton from "../../shared/components/BackToTopButton";
import Breadcrumbs from "../../shared/components/Breadcrumbs";
import type { Product } from "../../services/productsApi";

const MainProductsList: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  
  // Estado de filtros avanzados
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 100000],
    rating: 0,
    inStock: false,
    hasDiscount: false,
  });

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await fetch(import.meta.env.VITE_URL);
      const data = await res.json();

      setData(data);
      setCategories(["all", ...new Set(data.map((item: Product) => (item as any).category))]);
      setTypes([...new Set(data.map((item: Product) => (item as any).type))]);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchData = (item: Product, search: string): boolean => {
    return (item as any).name.toLowerCase().includes(search.toLowerCase());
  };

  const filteredData = () => {
    return data.filter((item) => {
      // Filtro de búsqueda
      if (search && !searchData(item, search)) {
        return false;
      }

      // Filtro de categorías
      if (filters.categories.length > 0) {
        const itemCategory = (item as any).category || '';
        const itemType = (item as any).type || '';
        const hasMatch = filters.categories.some(
          (cat) => cat === itemCategory || cat === itemType
        );
        if (!hasMatch) return false;
      }

      // Filtro de precio
      const itemPrice = (item as any).price || 0;
      if (itemPrice < filters.priceRange[0] || itemPrice > filters.priceRange[1]) {
        return false;
      }

      // Filtro de calificación
      if (filters.rating > 0) {
        const itemRating = (item as any).rating || 0;
        if (itemRating < filters.rating) {
          return false;
        }
      }

      // Filtro de stock
      if (filters.inStock) {
        const itemStock = (item as any).stock || 0;
        if (itemStock <= 0) {
          return false;
        }
      }

      // Filtro de descuento
      if (filters.hasDiscount) {
        const itemOriginalPrice = (item as any).originalPrice;
        const itemPrice = (item as any).price || 0;
        if (!itemOriginalPrice || itemOriginalPrice <= itemPrice) {
          return false;
        }
      }

      return true;
    });
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 100000],
      rating: 0,
      inStock: false,
      hasDiscount: false,
    });
  };

  const handleRemoveCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== category),
    }));
  };

  const handleRemoveRating = () => {
    setFilters((prev) => ({ ...prev, rating: 0 }));
  };

  const handleRemoveStock = () => {
    setFilters((prev) => ({ ...prev, inStock: false }));
  };

  const handleRemovePriceRange = () => {
    setFilters((prev) => ({ ...prev, priceRange: [0, 100000] }));
  };

  const handleRemoveDiscount = () => {
    setFilters((prev) => ({ ...prev, hasDiscount: false }));
  };

  if (loading) {
    return (
      <div className="container">
        <Breadcrumbs />
        <section className="products-list-header">
          <div className="products-list-container__text">
            <div className="products-list__text">
              <Skeleton variant="text" width="60%" height="28px" />
              <Skeleton variant="text" width="80%" height="20px" />
            </div>
            <Skeleton variant="rectangular" width="100%" height="48px" />
          </div>
        </section>

        <div className="products-with-filters">
          <div className="desktop-filter-panel">
            <div className="skeleton-panel">
              <Skeleton variant="text" width="70%" height="18px" />
              <Skeleton variant="text" width="90%" height="16px" />
              <Skeleton variant="text" width="85%" height="16px" />
              <Skeleton variant="text" width="60%" height="16px" />
              <Skeleton variant="rectangular" width="100%" height="36px" />
            </div>
          </div>

          <div className="products-list-content">
            <div className="products-list-results">
              <Skeleton variant="text" width="40%" height="16px" />
            </div>
            <ProductListSkeleton count={9} />
          </div>
        </div>
      </div>
    );
  }
  if (error) return <div>Error: {String(error)}</div>;

  const products = filteredData();
  const activeFiltersCount = 
    filters.categories.length +
    (filters.rating > 0 ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (filters.hasDiscount ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 100000 ? 1 : 0);

  return (
    <div className="container">
      <Breadcrumbs />
      {/* Products list section */}
      <section className="products-list-header">
        <div className="products-list-container__text">
          <div className="products-list__text">
            <h1>NUESTRA TIENDA ONLINE</h1>
            <h3>Selecciona tu producto favorito de nuestra tienda online</h3>
          </div>
          <SearchBar
            products={data}
            value={search}
            onChange={setSearch}
            placeholder="Buscar producto por nombre, categoría o tipo..."
          />
        </div>
      </section>

      {/* Active Filter Chips */}
      <ActiveFilterChips
        filters={filters}
        onRemoveCategory={handleRemoveCategory}
        onRemoveRating={handleRemoveRating}
        onRemoveStock={handleRemoveStock}
        onRemovePriceRange={handleRemovePriceRange}
        onRemoveDiscount={handleRemoveDiscount}
        onClearAll={handleClearFilters}
      />

      {/* Main content with sidebar and products */}
      <div className="products-with-filters">
        {/* Desktop Filter Panel */}
        <div className="desktop-filter-panel">
          <FilterPanel
            categories={categories}
            types={types}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        <div className="products-list-content">
          <div className="products-list-results">
            <p className="products-list-count">
              {products.length} {products.length === 1 ? 'producto encontrado' : 'productos encontrados'}
            </p>
          </div>

          <Row xs={1} sm={2} lg={3} className="products-list-container">
            {products.map((item) => (
              <Col key={item.id}>
                <MainProductCard item={item} />
              </Col>
            ))}
          </Row>

          {products.length === 0 && (
            <div className="products-empty-state">
              <h3>No se encontraron productos</h3>
              <p>Intenta ajustar los filtros o buscar otro término</p>
              <button
                className="products-empty-btn"
                onClick={handleClearFilters}
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        categories={categories}
        types={types}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        activeFiltersCount={activeFiltersCount}
      />

      <BackToTopButton />
    </div>
  );
};

export default MainProductsList;
