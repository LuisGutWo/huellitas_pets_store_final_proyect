import { useState, useEffect, useRef, useCallback } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import HistoryIcon from '@mui/icons-material/History';
import type { Product } from '../../../services/productsApi';
import './SearchBar.scss';

interface SearchBarProps {
  products: Product[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

interface Suggestion {
  id: string;
  name: string;
  category: string;
  type: 'product' | 'category' | 'recent';
}

const SearchBar: React.FC<SearchBarProps> = ({
  products,
  value,
  onChange,
  placeholder = 'Buscar producto...'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cargar búsquedas recientes del localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generar sugerencias basadas en el input
  const generateSuggestions = useCallback((query: string) => {
    if (!query.trim()) {
      // Mostrar búsquedas recientes si no hay query
      const recents: Suggestion[] = recentSearches.slice(0, 5).map((search, idx) => ({
        id: `recent-${idx}`,
        name: search,
        category: 'Búsqueda reciente',
        type: 'recent'
      }));
      setSuggestions(recents);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const matchedProducts: Suggestion[] = [];
    const matchedCategories = new Set<string>();

    // Buscar productos que coincidan
    products.forEach((product) => {
      const name = (product as any).name?.toLowerCase() || '';
      const category = (product as any).category?.toLowerCase() || '';
      const type = (product as any).type?.toLowerCase() || '';

      if (name.includes(lowerQuery)) {
        matchedProducts.push({
          id: String(product.id),
          name: (product as any).name,
          category: (product as any).category || '',
          type: 'product'
        });
      }

      // Agregar categorías únicas
      if (category.includes(lowerQuery) || type.includes(lowerQuery)) {
        matchedCategories.add((product as any).category || (product as any).type);
      }
    });

    // Combinar productos y categorías (máximo 8 resultados)
    const categorySuggestions: Suggestion[] = Array.from(matchedCategories)
      .slice(0, 2)
      .map((cat, idx) => ({
        id: `category-${idx}`,
        name: cat,
        category: 'Categoría',
        type: 'category'
      }));

    const allSuggestions = [
      ...categorySuggestions,
      ...matchedProducts.slice(0, 6)
    ];

    setSuggestions(allSuggestions);
  }, [products, recentSearches]);

  // Debouncing para las sugerencias
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOpen) {
        generateSuggestions(value);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [value, isOpen, generateSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    generateSuggestions(value);
  };

  const handleClear = () => {
    onChange('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleSelectSuggestion = (suggestion: Suggestion) => {
    const searchValue = suggestion.type === 'category' ? suggestion.name : suggestion.name;
    onChange(searchValue);
    setIsOpen(false);

    // Guardar en búsquedas recientes
    if (suggestion.type !== 'recent') {
      const updated = [searchValue, ...recentSearches.filter(s => s !== searchValue)].slice(0, 10);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }

    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        } else {
          setIsOpen(false);
          inputRef.current?.blur();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  // Resaltar texto que coincide con la búsqueda
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="search-bar__highlight">{part}</mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div className="search-bar" ref={searchRef}>
      <div className="search-bar__input-wrapper">
        <SearchIcon className="search-bar__icon search-bar__icon--search" />
        <input
          ref={inputRef}
          type="text"
          className="search-bar__input"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          aria-label="Buscar productos"
        />
        {value && (
          <button
            className="search-bar__clear"
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
            type="button"
          >
            <ClearIcon />
          </button>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul
          className="search-bar__suggestions"
          id="search-suggestions"
          role="listbox"
          aria-label="Sugerencias de búsqueda"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              className={`search-bar__suggestion ${
                index === selectedIndex ? 'search-bar__suggestion--active' : ''
              }`}
              onClick={() => handleSelectSuggestion(suggestion)}
              onMouseEnter={() => setSelectedIndex(index)}
              role="option"
            >
              <div className="search-bar__suggestion-icon">
                {suggestion.type === 'recent' ? (
                  <HistoryIcon fontSize="small" />
                ) : suggestion.type === 'category' ? (
                  <span className="search-bar__category-badge">Cat</span>
                ) : (
                  <SearchIcon fontSize="small" />
                )}
              </div>
              <div className="search-bar__suggestion-content">
                <div className="search-bar__suggestion-name">
                  {highlightMatch(suggestion.name, value)}
                </div>
                <div className="search-bar__suggestion-category">
                  {suggestion.category}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isOpen && suggestions.length === 0 && value.trim() && (
        <div className="search-bar__no-results">
          <SearchIcon />
          <p>No se encontraron resultados para "{value}"</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
