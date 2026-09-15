"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import Icon from "@/components/ui/Icon";
import ProductCard from "@/components/product/ProductCard";
import StampedNumber from "@/components/ui/StampedNumber";
import {
  CATEGORIES,
  EMPTY_FILTERS,
  PRICE_CEILING,
  PRICE_FLOOR,
  TYPES,
  countActiveFilters,
  filterProducts,
  getBrandsInUse,
  sortProducts,
  type Brand,
  type CatalogFilters,
  type Category,
  type Product,
  type ProductType,
  type SortKey,
} from "@/lib/catalog";
import styles from "./CatalogBrowser.module.css";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "relevancia", label: "Destacados" },
  { key: "precio-asc", label: "Menor precio" },
  { key: "precio-desc", label: "Mayor precio" },
  { key: "nombre", label: "A–Z" },
];

const STEP = 500;

type Chip = { label: string; clear: () => void };

export default function CatalogBrowser({
  products,
  initial,
}: {
  products: Product[];
  initial: Partial<CatalogFilters>;
}) {
  const [filters, setFilters] = useState<CatalogFilters>({
    ...EMPTY_FILTERS,
    ...initial,
  });
  const [sort, setSort] = useState<SortKey>("relevancia");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const gridRef = useRef<HTMLUListElement>(null);

  const brands = useMemo(() => getBrandsInUse(), []);

  const results = useMemo(
    () => sortProducts(filterProducts(products, filters), sort),
    [products, filters, sort]
  );

  const activeCount = countActiveFilters(filters);

  // La repisa se recompone con el mismo ritmo en cada cambio de filtro.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        `.${styles.slot}`,
        { y: 14 },
        {
          y: 0,
          duration: 0.4,
          ease: "power3.out",
          stagger: { each: 0.025, from: "start" },
          overwrite: "auto",
        }
      );
    }, grid);

    return () => context.revert();
  }, [results.length, sort]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  const toggle = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

  const patch = (next: Partial<CatalogFilters>) =>
    setFilters((current) => ({ ...current, ...next }));

  const chips: Chip[] = [
    ...(filters.search.trim()
      ? [
          {
            label: `"${filters.search.trim()}"`,
            clear: () => patch({ search: "" }),
          },
        ]
      : []),
    ...filters.categories.map((category) => ({
      label: category,
      clear: () =>
        patch({ categories: filters.categories.filter((c) => c !== category) }),
    })),
    ...filters.types.map((type) => ({
      label: type,
      clear: () => patch({ types: filters.types.filter((t) => t !== type) }),
    })),
    ...filters.brands.map((brand) => ({
      label: brands.find((entry) => entry.brand === brand)?.label ?? brand,
      clear: () => patch({ brands: filters.brands.filter((b) => b !== brand) }),
    })),
    ...(filters.maxPrice < PRICE_CEILING
      ? [
          {
            label: `Hasta $${filters.maxPrice.toLocaleString("es-CL")}`,
            clear: () => patch({ maxPrice: PRICE_CEILING }),
          },
        ]
      : []),
    ...(filters.onlyDiscounted
      ? [{ label: "En oferta", clear: () => patch({ onlyDiscounted: false }) }]
      : []),
    ...(filters.onlyNew
      ? [{ label: "Novedades", clear: () => patch({ onlyNew: false }) }]
      : []),
  ];

  // El conteo se adelanta al clic: cuántos quedarían si aplicas este filtro.
  const previewCount = (patchPart: Partial<CatalogFilters>) =>
    filterProducts(products, { ...filters, ...patchPart }).length;

  const panel = (
    <div className={styles.panel}>
      <div className={styles.field}>
        <label htmlFor="buscar" className={styles.legend}>
          Buscar
        </label>
        <div className={styles.search}>
          <Icon name="buscar" size={18} />
          <input
            id="buscar"
            type="search"
            value={filters.search}
            placeholder="Nombre o marca"
            onChange={(event) => patch({ search: event.target.value })}
          />
        </div>
      </div>

      {activeCount > 0 && (
        <button
          type="button"
          className={styles.reset}
          onClick={() => setFilters(EMPTY_FILTERS)}
        >
          <Icon name="cerrar" size={16} />
          Quitar los {activeCount} filtros
        </button>
      )}

      <fieldset className={styles.field}>
        <legend className={styles.legend}>Para</legend>
        <div className={styles.options}>
          {CATEGORIES.map((category) => {
            const on = filters.categories.includes(category);
            return (
              <label key={category} className={styles.option} data-on={on}>
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() =>
                    patch({
                      categories: toggle<Category>(filters.categories, category),
                    })
                  }
                />
                <span>{category}</span>
                <b data-numeral>
                  {previewCount({
                    categories: toggle<Category>(filters.categories, category),
                  })}
                </b>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className={styles.field}>
        <legend className={styles.legend}>Pasillo</legend>
        <div className={styles.options}>
          {TYPES.map((type) => {
            const on = filters.types.includes(type);
            return (
              <label key={type} className={styles.option} data-on={on}>
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() =>
                    patch({ types: toggle<ProductType>(filters.types, type) })
                  }
                />
                <span>{type}</span>
                <b data-numeral>
                  {previewCount({ types: toggle<ProductType>(filters.types, type) })}
                </b>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className={styles.field}>
        <label htmlFor="hasta" className={styles.legend}>
          Precio hasta
        </label>
        <output className={styles.priceOut} htmlFor="hasta">
          <StampedNumber value={filters.maxPrice} className={styles.priceNum} />
        </output>
        <input
          id="hasta"
          type="range"
          className={styles.range}
          min={Math.floor(PRICE_FLOOR / STEP) * STEP}
          max={Math.ceil(PRICE_CEILING / STEP) * STEP}
          step={STEP}
          value={filters.maxPrice}
          onChange={(event) => patch({ maxPrice: Number(event.target.value) })}
          aria-valuetext={`${filters.maxPrice.toLocaleString("es-CL")} pesos`}
        />
      </div>

      <fieldset className={styles.field}>
        <legend className={styles.legend}>Solo mostrar</legend>
        <div className={styles.options}>
          <label className={styles.option} data-on={filters.onlyDiscounted}>
            <input
              type="checkbox"
              checked={filters.onlyDiscounted}
              onChange={() => patch({ onlyDiscounted: !filters.onlyDiscounted })}
            />
            <span>En oferta</span>
            <b data-numeral>
              {previewCount({ onlyDiscounted: !filters.onlyDiscounted })}
            </b>
          </label>
          <label className={styles.option} data-on={filters.onlyNew}>
            <input
              type="checkbox"
              checked={filters.onlyNew}
              onChange={() => patch({ onlyNew: !filters.onlyNew })}
            />
            <span>Novedades</span>
            <b data-numeral>{previewCount({ onlyNew: !filters.onlyNew })}</b>
          </label>
        </div>
      </fieldset>

      <fieldset className={styles.field}>
        <legend className={styles.legend}>Marcas ({brands.length})</legend>
        <div className={styles.brands}>
          {brands.map((entry) => {
            const on = filters.brands.includes(entry.brand);
            return (
              <label key={entry.brand} className={styles.option} data-on={on}>
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() =>
                    patch({ brands: toggle<Brand>(filters.brands, entry.brand) })
                  }
                />
                <span>{entry.label}</span>
                <b data-numeral>{entry.count}</b>
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar} aria-label="Filtros del catálogo">
        {panel}
      </aside>

      <div className={styles.results}>
        <div className={styles.toolbar}>
          <p className={styles.tally} role="status">
            <b data-numeral>{results.length}</b>
            {results.length === 1 ? " producto" : " productos"}
            {activeCount > 0 && (
              <span> · {activeCount === 1 ? "1 filtro" : `${activeCount} filtros`}</span>
            )}
          </p>

          <div className={styles.toolbarRight}>
            <button
              type="button"
              className={styles.filtersButton}
              onClick={() => setDrawerOpen(true)}
              aria-expanded={drawerOpen}
            >
              <Icon name="filtros" size={18} />
              Filtros
              {activeCount > 0 && <b data-numeral>{activeCount}</b>}
            </button>

            <label className={styles.sort}>
              <span className="visuallyHidden">Ordenar por</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
              >
                {SORTS.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {chips.length > 0 && (
          <ul className={styles.chips}>
            {chips.map((chip) => (
              <li key={chip.label}>
                <button type="button" onClick={chip.clear}>
                  {chip.label}
                  <Icon name="cerrar" size={14} />
                  <span className="visuallyHidden">Quitar filtro</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {results.length === 0 ? (
          <div className={styles.empty}>
            <Icon name="alerta" size={26} />
            <h2>Ningún producto cumple estos filtros</h2>
            <p>
              La combinación es demasiado estrecha. Sube el precio máximo, o quita
              una marca, y vuelven a aparecer productos.
            </p>
            <button type="button" onClick={() => setFilters(EMPTY_FILTERS)}>
              Empezar de nuevo
            </button>
          </div>
        ) : (
          <ul className={styles.grid} ref={gridRef}>
            {results.map((product, index) => (
              <li key={product.id} className={styles.slot}>
                <ProductCard product={product} priority={index < 4} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {drawerOpen && (
        <div className={styles.drawer} role="dialog" aria-label="Filtros">
          <div className={styles.drawerHead}>
            <h2>Filtros</h2>
            <button type="button" onClick={() => setDrawerOpen(false)}>
              <Icon name="cerrar" size={22} />
              <span className="visuallyHidden">Cerrar filtros</span>
            </button>
          </div>
          <div className={styles.drawerBody}>{panel}</div>
          <button
            type="button"
            className={styles.drawerApply}
            onClick={() => setDrawerOpen(false)}
          >
            Ver {results.length} {results.length === 1 ? "producto" : "productos"}
          </button>
        </div>
      )}
    </div>
  );
}
