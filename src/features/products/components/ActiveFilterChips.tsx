import CloseIcon from '@mui/icons-material/Close';
import type { FilterState } from './FilterPanel';
import './ActiveFilterChips.scss';

interface ActiveFilterChipsProps {
  filters: FilterState;
  onRemoveCategory: (category: string) => void;
  onRemoveRating: () => void;
  onRemoveStock: () => void;
  onRemovePriceRange: () => void;
  onRemoveDiscount: () => void;
  onClearAll: () => void;
}

const ActiveFilterChips: React.FC<ActiveFilterChipsProps> = ({
  filters,
  onRemoveCategory,
  onRemoveRating,
  onRemoveStock,
  onRemovePriceRange,
  onRemoveDiscount,
  onClearAll,
}) => {
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.rating > 0 ||
    filters.inStock ||
    filters.hasDiscount ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 100000;

  if (!hasActiveFilters) {
    return null;
  }

  const isPriceRangeActive = filters.priceRange[0] > 0 || filters.priceRange[1] < 100000;

  return (
    <div className="active-filters">
      <div className="active-filters__header">
        <span className="active-filters__title">Filtros activos:</span>
        <button
          className="active-filters__clear-all"
          onClick={onClearAll}
        >
          Limpiar todos
        </button>
      </div>
      <div className="active-filters__chips">
        {/* Categories Chips */}
        {filters.categories.map((category) => (
          <div key={category} className="chip">
            <span className="chip__label">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
            <button
              className="chip__remove"
              onClick={() => onRemoveCategory(category)}
              aria-label={`Eliminar filtro ${category}`}
            >
              <CloseIcon />
            </button>
          </div>
        ))}

        {/* Rating Chip */}
        {filters.rating > 0 && (
          <div className="chip">
            <span className="chip__label">
              {filters.rating}+ estrellas
            </span>
            <button
              className="chip__remove"
              onClick={onRemoveRating}
              aria-label="Eliminar filtro de calificación"
            >
              <CloseIcon />
            </button>
          </div>
        )}

        {/* Stock Chip */}
        {filters.inStock && (
          <div className="chip">
            <span className="chip__label">Con stock</span>
            <button
              className="chip__remove"
              onClick={onRemoveStock}
              aria-label="Eliminar filtro de stock"
            >
              <CloseIcon />
            </button>
          </div>
        )}

        {/* Price Range Chip */}
        {isPriceRangeActive && (
          <div className="chip">
            <span className="chip__label">
              ${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}
            </span>
            <button
              className="chip__remove"
              onClick={onRemovePriceRange}
              aria-label="Eliminar filtro de precio"
            >
              <CloseIcon />
            </button>
          </div>
        )}

        {/* Discount Chip */}
        {filters.hasDiscount && (
          <div className="chip">
            <span className="chip__label">Con descuento</span>
            <button
              className="chip__remove"
              onClick={onRemoveDiscount}
              aria-label="Eliminar filtro de descuento"
            >
              <CloseIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveFilterChips;
