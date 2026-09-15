import Link from "next/link";
import Icon from "@/components/ui/Icon";
import styles from "./PageHeader.module.css";

export type Crumb = { href: string; label: string };

export default function PageHeader({
  title,
  lede,
  crumbs = [],
  tally,
}: {
  title: string;
  lede?: string;
  crumbs?: Crumb[];
  tally?: string;
}) {
  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        {crumbs.length > 0 && (
          <nav aria-label="Ruta" className={styles.crumbs}>
            <ol>
              <li>
                <Link href="/">Inicio</Link>
              </li>
              {crumbs.map((crumb, index) => (
                <li key={crumb.href}>
                  <Icon name="flecha" size={13} />
                  {index === crumbs.length - 1 ? (
                    <span aria-current="page">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href}>{crumb.label}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className={styles.row}>
          <h1 className={styles.title}>{title}</h1>
          {tally && (
            <p className={styles.tally} data-numeral>
              {tally}
            </p>
          )}
        </div>

        {lede && <p className={styles.lede}>{lede}</p>}
      </div>
    </div>
  );
}
