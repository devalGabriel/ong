import Breadcrumb from "./Breadcrumb";
import StatusPill from "./StatusPill";
import UserMenu from "./UserMenu";
import { IconMagnifier } from "./icons";
import styles from "./Topbar.module.css";

export default function Topbar({ status, email, role }) {
  return (
    <div className={styles.topbar}>
      <div className={styles.breadcrumb}>
        <Breadcrumb />
      </div>

      <label className={styles.search}>
        <IconMagnifier width={16} height={16} />
        <input type="search" placeholder="Căutare — în curând" disabled title="Căutare — în curând" />
        <span className={styles.kbd}>⌘K</span>
      </label>

      <div className={styles.right}>
        <StatusPill status={status} />
        <UserMenu email={email} role={role} />
      </div>
    </div>
  );
}
