import HeroSack from "@/components/home/HeroSack";
import BudgetShelf from "@/components/home/BudgetShelf";
import Departments from "@/components/home/Departments";
import CareIndex from "@/components/home/CareIndex";
import LocalCard from "@/components/home/LocalCard";
import {
  PRICE_CEILING,
  PRICE_FLOOR,
  getAllProducts,
  getProductBySlug,
  sortProducts,
} from "@/lib/catalog";
import { ARTICLES } from "@/lib/data/articles";

const HERO_SLUG = "prestige-adulto-mini";

export default function HomePage() {
  const all = getAllProducts();
  const hero = getProductBySlug(HERO_SLUG) ?? all[0];

  const shelf = sortProducts(
    all.filter((product) => product.id !== hero.id),
    "relevancia"
  );

  const countBy = (predicate: (type: string) => boolean) =>
    all.filter((product) => predicate(product.type)).length;

  const departments = [
    {
      href: "/productos?tipo=Alimentos",
      title: "Alimentos",
      copy: "Seco, húmedo y snacks para cachorros, adultos y seniors. Marcas que sí se venden en Chile.",
      count: countBy((type) => type === "Alimentos"),
      image: "/assets/img/comida-sana-para-perro-indisposicion.webp",
    },
    {
      href: "/productos?tipo=Accesorios",
      title: "Accesorios",
      copy: "Transporte, descanso, higiene y juguetes. Lo que hace falta el primer día y lo que se repone siempre.",
      count: countBy((type) => type === "Accesorios"),
      image: "/assets/img/juguetes_gatos.webp",
    },
    {
      href: "/productos?tipo=Salud",
      title: "Salud",
      copy: "Antiparasitarios, shampoo y alimento clínico. Para lo que el veterinario ya te indicó.",
      count: countBy((type) => type === "Salud"),
      image: "/assets/img/Cuidados_para_mi_mascota_veterinario.webp",
    },
  ];

  return (
    <>
      <HeroSack product={hero} catalogSize={all.length} />

      <BudgetShelf
        products={shelf}
        floor={PRICE_FLOOR}
        ceiling={PRICE_CEILING}
        catalogSize={all.length}
      />

      <Departments items={departments} />

      <CareIndex articles={[...ARTICLES].slice(0, 4)} />

      <LocalCard />
    </>
  );
}
