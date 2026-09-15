"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import styles from "./StoreMap.module.css";

const LAT = -33.4372;
const LNG = -70.6944;

/**
 * Mapa del local. Leaflet se carga solo en el cliente y solo cuando el mapa
 * entra en pantalla: no cuesta nada a quien nunca baja hasta aquí.
 */
export default function StoreMap() {
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = holder.current;
    if (!node) return;

    let map: import("leaflet").Map | null = null;
    let cancelled = false;

    const mount = async () => {
      const L = (await import("leaflet")).default;

      if (cancelled || !holder.current) return;

      map = L.map(holder.current, {
        center: [LAT, LNG],
        zoom: 16,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Marcador troquelado, en la segunda tinta del sistema.
      const marker = L.divIcon({
        className: styles.pinWrap,
        html: `<span class="${styles.pin}">Huellitas</span>`,
        iconSize: [96, 34],
        iconAnchor: [48, 34],
      });

      L.marker([LAT, LNG], { icon: marker, title: "Huellitas Pet Store" })
        .addTo(map)
        .bindPopup("San Pablo 3610, local 2<br>Quinta Normal, Santiago");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          void mount();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
      map?.remove();
    };
  }, []);

  return (
    <div className={styles.frame}>
      <p className={styles.caption}>
        <span>Local</span>
        San Pablo 3610, local 2 · Quinta Normal
      </p>
      <div ref={holder} className={styles.map} role="img" aria-label="Mapa con la ubicación del local en San Pablo 3610, Quinta Normal, Santiago" />
      <a
        className={styles.directions}
        href={`https://www.openstreetmap.org/?mlat=${LAT}&mlon=${LNG}#map=17/${LAT}/${LNG}`}
        target="_blank"
        rel="noreferrer"
      >
        Abrir en el mapa
      </a>
    </div>
  );
}
