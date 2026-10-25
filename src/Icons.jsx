const base = {
  width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round',
};

export const IconHome = (p) => (
  <svg {...base} {...p}><path d="M3 11l9-8 9 8" /><path d="M5 10v10h5v-6h4v6h5V10" /></svg>
);
export const IconWallet = (p) => (
  <svg {...base} {...p}><rect x="3" y="6" width="18" height="13" rx="2.5" /><path d="M3 10h18" /><path d="M16 14.5h2" /></svg>
);
export const IconUsers = (p) => (
  <svg {...base} {...p}><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17" cy="9" r="2.5" /><path d="M16.5 14.2c2.7.2 4.5 2.4 4.5 5.3" /></svg>
);
export const IconBank = (p) => (
  <svg {...base} {...p}><path d="M3 9l9-5 9 5" /><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8" /><path d="M3 20h18" /></svg>
);
export const IconTarget = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.6" /></svg>
);
export const IconBell = (p) => (
  <svg {...base} {...p}><path d="M6 16V11a6 6 0 1112 0v5l1.5 2h-15L6 16z" /><path d="M10 21h4" /></svg>
);
export const IconBack = (p) => (
  <svg {...base} {...p}><path d="M15 5l-7 7 7 7" /></svg>
);
