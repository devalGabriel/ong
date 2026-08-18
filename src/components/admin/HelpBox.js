import Link from "next/link";
import { IconHelpCircle } from "./icons";
import styles from "./HelpBox.module.css";

export default function HelpBox() {
  return (
    <div className={styles.box}>
      <p>
        <IconHelpCircle width={18} height={18} /> Ai nevoie de ajutor?
      </p>
      <Link href="/admin/ghid">Consultă ghidul de utilizare →</Link>
    </div>
  );
}
