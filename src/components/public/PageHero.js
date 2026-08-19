import Image from "next/image";
import Link from "next/link";
import styles from "./PageHero.module.css";

export default function PageHero({
  breadcrumb,
  eyebrow,
  title,
  lead,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
  badgeText,
}) {
  return (
    <section className={`container ${styles.hero}`}>
      <div className={styles.grid}>
        <div>
          {breadcrumb && <p className={styles.breadcrumb}>{breadcrumb}</p>}
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          <div className="divider" aria-hidden="true" />
          {lead && <p className={styles.lead}>{lead}</p>}
          {(primaryCta || secondaryCta) && (
            <div className={styles.actions}>
              {primaryCta && (
                <Link href={primaryCta.href} className="btn-primary">
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href} className="btn-secondary">
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
        <div className={styles.imageOuter}>
          <Image src="/icons/leaf.png" alt="" width={90} height={180} className={styles.leafSprig} />
          <Image src="/icons/dots.png" alt="" width={64} height={64} className={styles.dotGrid} />
          <div className={styles.imageWrap}>
            <Image src={imageSrc} alt={imageAlt} fill sizes="(min-width: 1024px) 40vw, 90vw" priority />
            {badgeText && (
              <div className={styles.badge}>
                <Image src="/assets/9-badge-inima.png" alt="" fill sizes="140px" />
                <span className={styles.badgeText}>{badgeText}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
