import type { Metadata, Viewport } from "next";
import { Archivo, Chivo_Mono } from "next/font/google";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { StoreProvider } from "@/components/providers/StoreProvider";
import SiteHeader from "@/components/chrome/SiteHeader";
import SiteFooter from "@/components/chrome/SiteFooter";
import PrintedLog from "@/components/chrome/PrintedLog";
import FloatingActions from "@/components/chrome/FloatingActions";
import PressFoot from "@/components/chrome/PressFoot";
import { getAllProducts } from "@/lib/catalog";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

const chivoMono = Chivo_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-chivo-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://huellitas-pet-store.vercel.app"),
  title: {
    default: "Huellitas Pet Store — Alimento y accesorios para mascotas",
    template: "%s · Huellitas Pet Store",
  },
  description:
    "Catálogo de alimento, accesorios y salud para perros y gatos. Tienda en Quinta Normal, Santiago, con despacho a todo Chile.",
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "Huellitas Pet Store",
    title: "Huellitas Pet Store — Alimento y accesorios para mascotas",
    description:
      "57 productos para perros y gatos: alimento, accesorios y salud. Quinta Normal, Santiago.",
    images: ["/assets/img/hero_mascotas.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Huellitas Pet Store",
    description: "Alimento, accesorios y salud para perros y gatos.",
    images: ["/assets/img/hero_mascotas.webp"],
  },
  icons: { icon: "/assets/img/huellitas_2.webp" },
};

export const viewport: Viewport = {
  themeColor: "#c8321e",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CL" className={`${archivo.variable} ${chivoMono.variable}`}>
      <body>
        <AuthProvider>
          <StoreProvider>
            <a className="skipLink" href="#contenido">
              Saltar al contenido
            </a>
            <SiteHeader />
            <PrintedLog />
            <main id="contenido">{children}</main>
            <PressFoot lot={`Lote ${getAllProducts().length} · CLP · es-CL`} />
            <SiteFooter />
            <FloatingActions />
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
