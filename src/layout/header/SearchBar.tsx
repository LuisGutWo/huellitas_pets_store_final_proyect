import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import "./searchBar.scss";

interface SearchBarProps {
  onSearchComplete?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchComplete }) => {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search)}`);
      setSearch("");
      onSearchComplete?.();
    }
  };

  return (
    <form className="header-search" onSubmit={handleSubmit} role="search">
      <label htmlFor="header-search-input" className="sr-only">
        Buscar productos
      </label>

      <input
        id="header-search-input"
        type="search"
        className="form-control header-search__input"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Buscar productos"
      />

      <button
        type="submit"
        className="header-search__button"
        aria-label="Buscar"
      >
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
