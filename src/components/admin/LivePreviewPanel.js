"use client";

import { useState } from "react";
import styles from "./LivePreviewPanel.module.css";

export default function LivePreviewPanel({ route, refreshToken }) {
  const [nonce, setNonce] = useState(0);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span>
          <span className={styles.dot} aria-hidden="true" />
          Previzualizare live
        </span>
        <button type="button" className={styles.refreshBtn} onClick={() => setNonce((value) => value + 1)}>
          Actualizează
        </button>
      </div>
      <div className={styles.frameWrap}>
        <iframe key={`${refreshToken ?? ""}-${nonce}`} src={route} title="Previzualizare pagină" className={styles.frame} loading="lazy" />
      </div>
    </div>
  );
}
