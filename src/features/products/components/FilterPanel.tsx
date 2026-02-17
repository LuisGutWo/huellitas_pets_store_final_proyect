import { useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import StarIcon from '@mui/icons-material/Star';
import './FilterPanel.scss';

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
  hasDiscount: boolean;
}

interface FilterPanelProps {
  categories: string[];
  types: string[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  types,
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    types: true,
    price: true,
    rating: true,
    discount: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
    const newPriceRange: [number, number] = [...filters.priceRange];
    newPriceRange[index] = Number(e.target.value);
    onFilterChange({ ...filters, priceRange: newPriceRange });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({ ...filters, rating: filters.rating === rating ? 0 : rating });
  };

  const handleStockToggle = () => {
    onFilterChange({ ...filters, inStock: !filters.inStock });
  };

  const handleDiscountToggle = () => {
    onFilterChange({ ...filters, hasDiscount: !filters.hasDiscount });
  };

  const hasActiveFilters = 
    filters.categories.length > 0 ||
    filters.rating > 0 ||
    filters.inStock ||
    filters.hasDiscount ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 100000;

  // Combinar categorías y tipos únicos
  const allCategories = Array.from(new Set([...categories.filter(c => c !== 'all'), ...types]));

  return (
    <aside className="filter-panel">
      <div className="filter-panel__header">
        <div className="filter-panel__title">
          <TuneIcon />
          <h3>Filtros</h3>
        </div>
        {hasActiveFilters && (
          <button
            className="filter-panel__clear"
            onClick={onClearFilters}
            type="button"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Categorías y Tipos */}
      <div className="filter-panel__section">
        <button
          className="filter-panel__section-header"
          onClick={() => toggleSection('categories')}
          type="button"
          aria-controls="filter-categories"
        >
          <span>Categorías</span>
          {expandedSections.categories ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </button>
        {expandedSections.categories && (
          <div className="filter-panel__section-content" id="filter-categories">
            {allCategories.map((category) => (
              <label key={category} className="filter-panel__checkbox">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                />
                <span className="filter-panel__checkbox-label">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
                <span className="filter-panel__checkbox-checkmark"></span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rango de Precio */}
      <div className="filter-panel__section">
        <button
          className="filter-panel__section-header"
          onClick={() => toggleSection('price')}
          type="button"
          aria-controls="filter-price"
        >
          <span>Precio</span>
          {expandedSections.price ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </button>
        {expandedSections.price && (
          <div className="filter-panel__section-content" id="filter-price">
            <div className="filter-panel__price-inputs">
              <div className="filter-panel__price-input">
                <label htmlFor="price-min">Mínimo</label>
                <input
                  id="price-min"
                  type="number"
                  min="0"
                  max={filters.priceRange[1]}
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                />
              </div>
              <span className="filter-panel__price-separator">-</span>
              <div className="filter-panel__price-input">
                <label htmlFor="price-max">Máximo</label>
                <input
                  id="price-max"
                  type="number"
                  min={filters.priceRange[0]}
                  max="100000"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                />
              </div>
            </div>
            <div className="filter-panel__price-slider">
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                className="filter-panel__slider"
                aria-label="Precio mínimo"
              />
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                className="filter-panel__slider"
                aria-label="Precio máximo"
              />
            </div>
            <div className="filter-panel__price-display">
              ${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}
            </div>
          </div>
        )}
      </div>

      {/* Calificación */}
      <div className="filter-panel__section">
        <button
          className="filter-panel__section-header"
          onClick={() => toggleSection('rating')}
          type="button"
          aria-controls="filter-rating"
        >
          <span>Calificación</span>
          {expandedSections.rating ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </button>
        {expandedSections.rating && (
          <div className="filter-panel__section-content" id="filter-rating">
            {[4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                className={`filter-panel__rating-btn ${filters.rating === rating ? 'active' : ''}`}
                onClick={() => handleRatingChange(rating)}
                type="button"
              >
                {[...Array(rating)].map((_, i) => (
                  <StarIcon key={i} className="filter-panel__star" />
                ))}
                <span>y más</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Stock Disponible */}
      <div className="filter-panel__section">
        <label className="filter-panel__switch">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={handleStockToggle}
          />
          <span className="filter-panel__switch-slider"></span>
          <span className="filter-panel__switch-label">Solo con stock</span>
        </label>
      </div>

      {/* Productos con Descuento */}
      <div className="filter-panel__section">
        <label className="filter-panel__switch">
          <input
            type="checkbox"
            checked={filters.hasDiscount}
            onChange={handleDiscountToggle}
          />
          <span className="filter-panel__switch-slider"></span>
          <span className="filter-panel__switch-label">Solo con descuento</span>
        </label>
      </div>
    </aside>
  );
};

export default FilterPanel;
