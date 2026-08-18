"use client";

import { useState } from "react";
import { IconChevronDown } from "./icons";
import styles from "./SectionCard.module.css";

export default function SectionCard({ section, pageKey, content, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={styles.card}>
      <button type="button" className={styles.header} onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span className={styles.index}>{section.index}.</span>
        <span className={styles.title}>{section.label}</span>
        <span className={styles.fieldCount}>
          {section.fields.length} {section.fields.length === 1 ? "câmp" : "câmpuri"}
        </span>
        <IconChevronDown width={18} height={18} className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`} />
      </button>

      {open && (
        <div className={styles.body}>
          {section.fields.map((field) => {
            const key = `${field.sectionKey}.${field.contentKey}`;
            const inputId = `field-${pageKey}-${field.sectionKey}-${field.contentKey}`;

            return (
              <div className={styles.field} key={key}>
                <label htmlFor={inputId}>{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea id={inputId} name={key} rows={4} maxLength={field.maxLength} defaultValue={content[key]} />
                ) : (
                  <input id={inputId} name={key} type="text" maxLength={field.maxLength} defaultValue={content[key]} />
                )}
                <span className={styles.hint}>Maximum {field.maxLength} de caractere. Lasă gol pentru a reveni la textul implicit.</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
