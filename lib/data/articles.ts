// Índice editorial. Los textos originales son extractos: no existe cuerpo
// completo para estos artículos, por lo que el blog se publica como índice
// de avances y no como artículos navegables.

export const ARTICLE_CATEGORIES = ["cuidados", "moda", "nutricion", "salud"] as const;
export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export type Article = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: ArticleCategory;
  /** Minutos de lectura estimados del artículo original. */
  readTime: number;
  date: string;
};

export const ARTICLE_CATEGORY_LABELS: Record<ArticleCategory, string> = {
  "cuidados": "Cuidados",
  "moda": "Moda",
  "nutricion": "Nutricion",
  "salud": "Salud",
};

export const ARTICLES: readonly Article[] = [
  {
    id: 1,
    slug: "alimentos-holisticos",
    title: "Alimentos holísticos",
    excerpt: "Las primeras investigaciones que se adentraron en la elaboración de alimentos de alta gama comenzaron en 1982, y en la actualidad, el mercado de alimentos para mascotas domesticas se ha...",
    image: "/assets/img/alimento-natural-para-perros-zanahoria.webp",
    category: "nutricion",
    readTime: 4,
    date: "15 Feb 2026",
  },
  {
    id: 2,
    slug: "dia-mundial-de-los-animales",
    title: "Dia mundial de los animales",
    excerpt: "El 4 de Octubre se celebra el dia internacional de los animales en conmemoración de San Francisco de Asís. Este santo que nació en 1182 en Italia y dejo...",
    image: "/assets/img/dia-mundial-mascotas.webp",
    category: "cuidados",
    readTime: 3,
    date: "12 Feb 2026",
  },
  {
    id: 3,
    slug: "se-aburren-de-su-alimento",
    title: "¿Se aburren de su alimento?",
    excerpt: "¿Se aburrirá nuestra mascota si lo alimentamos siempre con la misma dieta? La respuesta es no. El aburrimiento hacia los alimentos es una característica humana. Los perros y los...",
    image: "/assets/img/comida-sana-para-perro-indisposicion.webp",
    category: "nutricion",
    readTime: 5,
    date: "10 Feb 2026",
  },
  {
    id: 4,
    slug: "tu-perro-y-las-altas-temperaturas",
    title: "Tu perro y las altas temperaturas",
    excerpt: "El verano es una gran época para disfrutar de sol, el calor y refrescarse en las piletas y playas. Pero los perros, al igual que las personas, pueden sufrir con las altas temperaturas e...",
    image: "/assets/img/temperatura-mascotas.webp",
    category: "salud",
    readTime: 6,
    date: "8 Feb 2026",
  },
  {
    id: 5,
    slug: "el-universo-para-la-moda-de-las-mascotas",
    title: "El universo para la moda de las mascotas",
    excerpt: "Hoy las mascotas son un miembro mas de las familias en el mundo. Su fidelidad, sus expresiones de cariño y, por su puesto, la compañía que ofrecen, son suficientes para...",
    image: "/assets/img/moda-en-mascotas.webp",
    category: "moda",
    readTime: 4,
    date: "5 Feb 2026",
  },
  {
    id: 6,
    slug: "las-mascotas-y-el-invierno",
    title: "Las Mascotas y el Invierno",
    excerpt: "Durante el invierno es imprescindible que limites el tiempo que pasa tu mascota al ire libre. La mayoría de las mascotas que viven en el interior no están acostumbradas a las bajas...",
    image: "/assets/img/mascotas_cuidados_invierno.webp",
    category: "cuidados",
    readTime: 5,
    date: "3 Feb 2026",
  },
  {
    id: 7,
    slug: "cuidados-basicos-de-tu-mascota",
    title: "Cuidados básicos de tu mascota",
    excerpt: "¡Hola Adoptantes novatos! Vamos a dar un repaso por los puntos básicos a tener en cuenta para los cuidados de tu animal de compañía. Si quieres ser muy responsable, sigues estos consejos...",
    image: "/assets/img/Cuidados_para_mi_mascota_veterinario.webp",
    category: "cuidados",
    readTime: 7,
    date: "1 Feb 2026",
  },
  {
    id: 8,
    slug: "el-vinculo-afectivo-con-los-animales",
    title: "El Vinculo afectivo con los animales",
    excerpt: "Convivir con perros y gatos ayuda a disminuir el estrés, la tensión arterial y la frecuencia cardíaca. No sólo eso, los estudios constatan que esa compañía mejora...",
    image: "/assets/img/vinculo-mascotas.webp",
    category: "salud",
    readTime: 6,
    date: "28 Jan 2026",
  },
];
