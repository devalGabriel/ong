import styles from "./UserAvatar.module.css";

export default function UserAvatar({ email }) {
  const initial = email?.trim()?.[0]?.toUpperCase() ?? "?";

  return (
    <span className={styles.avatar} aria-hidden="true">
      {initial}
    </span>
  );
}
