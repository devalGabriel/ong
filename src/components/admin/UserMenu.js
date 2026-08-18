"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { IconChevronDown } from "./icons";
import styles from "./UserMenu.module.css";

const ROLE_LABELS = {
  ADMIN: "Administrator",
};

export default function UserMenu({ email, role }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button type="button" className={styles.trigger} aria-expanded={open} aria-haspopup="menu" onClick={() => setOpen((value) => !value)}>
        <UserAvatar email={email} />
        <span className={styles.userText}>
          <span className={styles.userEmail}>{email}</span>
          <span className={styles.userRole}>{ROLE_LABELS[role] ?? role}</span>
        </span>
        <IconChevronDown width={16} height={16} className={styles.chevron} />
      </button>

      {open && (
        <div className={styles.menu} role="menu">
          <Link href="/" target="_blank" rel="noreferrer" role="menuitem">
            Vezi site ↗
          </Link>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" role="menuitem">
              Deconectare
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
