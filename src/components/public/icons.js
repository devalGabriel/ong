const common = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function IconBuilding(props) {
  return (
    <svg {...common} {...props}>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" />
    </svg>
  );
}

export function IconUsers(props) {
  return (
    <svg {...common} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15.5 13.5c2.4.3 4.5 2.6 4.5 6.5" />
    </svg>
  );
}

export function IconHeartHand(props) {
  return (
    <svg {...common} {...props}>
      <path d="M12 9c-1-2-4-2-4.6.3-.5 1.9 1.4 3.3 4.6 5.7 3.2-2.4 5.1-3.8 4.6-5.7C16 7 13 7 12 9Z" />
      <path d="M4 19c1.5-1.5 3-2 5-2h4.5c1 0 1.8-.6 2.4-1.3l3-3.4" />
    </svg>
  );
}

export function IconPerson(props) {
  return (
    <svg {...common} {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
    </svg>
  );
}

export function IconHeart(props) {
  return (
    <svg {...common} {...props}>
      <path d="M12 20s-7-4.4-9.3-8.8C1.4 8 3 5 6.2 5c2 0 3.4 1.1 4.3 2.3.4.5.7 1 .5 0 .9-1.2 2.3-2.3 4.3-2.3 3.2 0 4.8 3 3.5 6.2C19 15.6 12 20 12 20Z" />
    </svg>
  );
}

export function IconHandsRaised(props) {
  return (
    <svg {...common} {...props}>
      <path d="M7 21v-6c0-1.5-.5-2.5-2-4M17 21v-6c0-1.5.5-2.5 2-4M7 15c0-4 1-9 1-9M17 15c0-4-1-9-1-9M9 6c0-1.5 1-3 3-3s3 1.5 3 3" />
    </svg>
  );
}

export function IconMegaphone(props) {
  return (
    <svg {...common} {...props}>
      <path d="M3 11v2a1 1 0 0 0 1 1h1l2 6h2l-1-6h2l7 4V6l-7 4H4a1 1 0 0 0-1 1Z" />
      <path d="M19 9.5v5" />
    </svg>
  );
}

export function IconHandshake(props) {
  return (
    <svg {...common} {...props}>
      <path d="M2 12l5-4 3 2 3-2 2 2h4l3-2" />
      <path d="M6 10l5 6 2-1.5M18 10l-5 6" />
    </svg>
  );
}

export function IconLeaf(props) {
  return (
    <svg {...common} {...props}>
      <path d="M5 19c8-1 13-6 14-14-8 1-13 6-14 14Z" />
      <path d="M6 18c3-3 6-6 12-13" />
    </svg>
  );
}

export function IconShield(props) {
  return (
    <svg {...common} {...props}>
      <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function IconLock(props) {
  return (
    <svg {...common} {...props}>
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function IconLeafSprig(props) {
  return (
    <svg width={110} height={130} viewBox="0 0 110 130" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden {...props}>
      <path d="M55 125C50 90 50 55 60 10" />
      <path d="M58 95c8-6 18-8 26-6" />
      <path d="M56 75c-8-6-18-8-26-6" />
      <path d="M58 55c8-6 18-8 26-6" />
      <path d="M57 35c-6-5-14-7-21-5" />
    </svg>
  );
}

export function IconArrowRight(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
