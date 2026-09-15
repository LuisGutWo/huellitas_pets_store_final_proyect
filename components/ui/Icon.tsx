import type { ReactElement, SVGProps } from "react";

/**
 * Iconos autorados: un solo trazo de 2px sobre caja de 24, esquinas rectas.
 * El sistema no usa emoji ni glifos unicode como iconos.
 */
export type IconName =
  | "carrito"
  | "guardado"
  | "guardado-lleno"
  | "buscar"
  | "cuenta"
  | "cerrar"
  | "flecha"
  | "filtros"
  | "menos"
  | "mas"
  | "quitar"
  | "whatsapp"
  | "instagram"
  | "facebook"
  | "telefono"
  | "correo"
  | "lugar"
  | "listo"
  | "alerta"
  | "arriba";

const paths: Record<IconName, ReactElement> = {
  carrito: (
    <>
      <path d="M2 4h3.2l2.4 11.2h10.1L20 7.2H6.1" />
      <path d="M9 20.5h.01M17 20.5h.01" />
    </>
  ),
  guardado: (
    <path d="M12 20.2 4.3 12.6a4.6 4.6 0 0 1 0-6.5 4.6 4.6 0 0 1 6.5 0l1.2 1.2 1.2-1.2a4.6 4.6 0 0 1 6.5 0 4.6 4.6 0 0 1 0 6.5Z" />
  ),
  "guardado-lleno": (
    <path
      d="M12 20.2 4.3 12.6a4.6 4.6 0 0 1 0-6.5 4.6 4.6 0 0 1 6.5 0l1.2 1.2 1.2-1.2a4.6 4.6 0 0 1 6.5 0 4.6 4.6 0 0 1 0 6.5Z"
      fill="currentColor"
    />
  ),
  buscar: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </>
  ),
  cuenta: (
    <>
      <circle cx="12" cy="8" r="3.8" />
      <path d="M4.5 20.5c0-3.9 3.4-6.3 7.5-6.3s7.5 2.4 7.5 6.3" />
    </>
  ),
  cerrar: <path d="M5 5l14 14M19 5 5 19" />,
  flecha: <path d="M4 12h15m-6-6 6 6-6 6" />,
  filtros: (
    <>
      <path d="M3 6h18M6 12h12M10 18h4" />
    </>
  ),
  menos: <path d="M5 12h14" />,
  mas: <path d="M12 5v14M5 12h14" />,
  quitar: (
    <>
      <path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3.8 20.2 5 16.4a8 8 0 1 1 3 2.9l-4.2 1z" />
      <path d="M9 9.2c.3 2.4 3.4 5.4 5.8 5.7l1-1.5 2 1-1 1.8c-2.9.5-7.7-4-7.7-6.8l1.8-1z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17 7h.01" />
    </>
  ),
  facebook: (
    <path d="M14.5 21v-8h2.7l.5-3.3h-3.2V7.6c0-1 .3-1.6 1.7-1.6h1.6V3.1A22 22 0 0 0 15.3 3c-2.5 0-4.2 1.5-4.2 4.3v2.4H8.3V13h2.8v8z" />
  ),
  telefono: (
    <path d="M6.5 3.5 9 8l-2 1.8a12 12 0 0 0 5.2 5.2L14 13l4.5 2.5-1.2 3.4c-6.3 1.2-13.4-5.9-12.2-12.2z" />
  ),
  correo: (
    <>
      <rect x="2.5" y="5" width="19" height="14" />
      <path d="m2.5 6.5 9.5 7 9.5-7" />
    </>
  ),
  lugar: (
    <>
      <path d="M12 21.5S5 15.4 5 10.3a7 7 0 0 1 14 0c0 5.1-7 11.2-7 11.2Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  listo: <path d="m4 12.5 5 5L20 6.5" />,
  alerta: (
    <>
      <path d="M12 3.5 22 20H2z" />
      <path d="M12 10v4.5M12 17.4h.01" />
    </>
  ),
  arriba: <path d="M12 20V5m-6 6 6-6 6 6" />,
};

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export default function Icon({ name, size = 20, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
