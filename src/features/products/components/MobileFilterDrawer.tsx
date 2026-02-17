import { useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import FilterPanel, { FilterState } from './FilterPanel';
import './MobileFilterDrawer.scss';

interface MobileFilterDrawerProps {
  categories: string[];
  types: string[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  categories,
  types,
  filters,
  onFilterChange,
  onClearFilters,
  activeFiltersCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    onFilterChange(newFilters);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="mobile-filter-btn"
        onClick={toggleDrawer}
        aria-label="Abrir filtros"
      >
        <TuneIcon />
        <span>Filtros</span>
        {activeFiltersCount > 0 && (
          <span className="mobile-filter-btn__badge">{activeFiltersCount}</span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="mobile-filter-overlay"
          onClick={toggleDrawer}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div className={`mobile-filter-drawer ${isOpen ? 'open' : ''}`}>
        <div className="mobile-filter-drawer__header">
          <div className="mobile-filter-drawer__title">
            <TuneIcon />
            <h2>Filtros</h2>
          </div>
          <button
            className="mobile-filter-drawer__close"
            onClick={toggleDrawer}
            aria-label="Cerrar filtros"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="mobile-filter-drawer__content">
          <FilterPanel
            categories={categories}
            types={types}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={onClearFilters}
          />
        </div>

        <div className="mobile-filter-drawer__footer">
          <button
            className="mobile-filter-drawer__apply"
            onClick={toggleDrawer}
          >
            Ver Resultados
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileFilterDrawer;
