const common = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function IconDashboard(props) {
  return (
    <svg {...common} {...props}>
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="5" rx="1.5" />
      <rect x="13" y="10" width="8" height="11" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
    </svg>
  );
}

export function IconPages(props) {
  return (
    <svg {...common} {...props}>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

export function IconGear(props) {
  return (
    <svg {...common} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  );
}

export function IconMagnifier(props) {
  return (
    <svg {...common} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}

export function IconNewspaper(props) {
  return (
    <svg {...common} {...props}>
      <rect x="3" y="5" width="14" height="15" rx="1.5" />
      <path d="M7 9h6M7 13h6M7 16.5h4" />
      <path d="M17 8h2.5A1.5 1.5 0 0 1 21 9.5V18a2 2 0 0 1-2 2" />
    </svg>
  );
}

export function IconFolder(props) {
  return (
    <svg {...common} {...props}>
      <path d="M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6Z" />
    </svg>
  );
}

export function IconImage(props) {
  return (
    <svg {...common} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <circle cx="9" cy="10" r="1.75" />
      <path d="m4 18 5.5-5.5a1.5 1.5 0 0 1 2.1 0L15 16l1.6-1.6a1.5 1.5 0 0 1 2.1 0L21 16.5" />
    </svg>
  );
}

export function IconCalendar(props) {
  return (
    <svg {...common} {...props}>
      <rect x="3" y="5" width="18" height="16" rx="1.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function IconCheck(props) {
  return (
    <svg {...common} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.5 2.5L16 9.5" />
    </svg>
  );
}

export function IconChevronDown(props) {
  return (
    <svg {...common} {...props} strokeWidth={2}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function IconHelpCircle(props) {
  return (
    <svg {...common} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.2a2.5 2.5 0 0 1 4.8 1c0 1.6-2.3 1.8-2.3 3.3" />
      <path d="M12 17.2h.01" />
    </svg>
  );
}
