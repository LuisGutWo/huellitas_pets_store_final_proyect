import styles from "./PressFoot.module.css";

/**
 * El cierre de la plancha: el borde inferior del saco, con sus marcas de
 * registro y el sello de lote. Cierra el campo de tinta en vez de dejarlo
 * morir en vacío, y es el único lugar donde el sistema firma la impresión.
 */
export default function PressFoot({ lot }: { lot: string }) {
  return (
    <div className={styles.foot} aria-hidden="true">
      <span className={styles.marks}>
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path
            d="M12 2v20M2 12h20"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            cx="12"
            cy="12"
            r="5.5"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
        <i className={styles.bar} />
      </span>

      <span className={styles.lockup}>
        Huellitas Pet Store — San Pablo 3610, Quinta Normal
      </span>

      <span className={styles.lot} data-numeral>
        {lot}
      </span>
    </div>
  );
}
