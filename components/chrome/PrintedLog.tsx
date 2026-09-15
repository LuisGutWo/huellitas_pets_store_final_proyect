"use client";

import { useStore } from "@/components/providers/StoreProvider";
import styles from "./PrintedLog.module.css";

/**
 * El registro impreso. Sustituye al toast flotante: el estado del sistema se
 * escribe en el documento, queda a la vista, y deja rastro de las últimas
 * acciones en vez de desaparecer a los tres segundos.
 */
export default function PrintedLog() {
  const { log } = useStore();

  return (
    <div
      className={styles.strip}
      data-empty={log.length === 0 ? "true" : "false"}
      aria-live="polite"
      aria-atomic="false"
    >
      {log.length === 0 ? null : (
        <>
          <span className={styles.label} aria-hidden="true">
            Registro
          </span>
          <ol className={styles.entries}>
            {log.map((entry, index) => (
              <li key={entry.id} data-age={index === 0 ? "fresh" : "older"}>
                <b>{entry.verb}</b>
                {entry.subject && <span>{entry.subject}</span>}
                {entry.detail && (
                  <i data-numeral aria-hidden="true">
                    {entry.detail}
                  </i>
                )}
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
