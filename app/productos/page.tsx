import type { Metadata } from "next";
import PageHeader from "@/components/chrome/PageHeader";
import CatalogBrowser from "@/components/catalog/CatalogBrowser";
import {
  CATEGORIES,
  PRICE_CEILING,
  TYPES,
  getAllProducts,
  type CatalogFilters,
  type Category,
  type ProductType,
} from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "57 productos para perros y gatos: alimento, accesorios y salud, con filtros por marca, pasillo y precio.",
};

type Search = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const params = await searchParams;
  const products = [...getAllProducts()];

  const rawType = first(params.tipo);
  const rawCategory = first(params.para);
  const rawMax = Number(first(params.hasta));

  const initial: Partial<CatalogFilters> = {
    search: first(params.q) ?? "",
    types: TYPES.includes(rawType as ProductType) ? [rawType as ProductType] : [],
    categories: CATEGORIES.includes(rawCategory as Category)
      ? [rawCategory as Category]
      : [],
    maxPrice:
      Number.isFinite(rawMax) && rawMax > 0
        ? Math.min(rawMax, PRICE_CEILING)
        : PRICE_CEILING,
    onlyDiscounted: first(params.oferta) === "1",
    onlyNew: first(params.nuevo) === "1",
  };

  return (
    <>
      <PageHeader
        title="Catálogo"
        crumbs={[{ href: "/productos", label: "Catálogo" }]}
        tally={`${products.length} productos`}
        lede="Todo lo que hay en la tienda, con marca y precio a la vista. Los filtros te dicen cuántos productos quedarán antes de que los apliques."
      />
      <CatalogBrowser products={products} initial={initial} />
    </>
  );
}
