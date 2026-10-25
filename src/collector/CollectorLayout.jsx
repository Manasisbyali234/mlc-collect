import { NavLink, Outlet, useLocation } from 'react-router-dom';

const tabs = [
  { to: '/app', label: 'Home', end: true },
  { to: '/app/collect', label: 'Collect' },
  { to: '/app/customers', label: 'Customers' },
  { to: '/app/deposit', label: 'Deposit' },
  { to: '/app/targets', label: 'Targets' },
];

export default function CollectorLayout() {
  const { pathname } = useLocation();
  const wide = pathname === '/app' || pathname === '/app/collect';
  return (
    <div className="m-app">
      <header className="m-top">
        <div className="brand">
          <div className="logo-m sm">M</div>
          <div><b>Mahalaxmi Co-Operative Society Ltd</b><small>Collector portal</small></div>
        </div>
        <nav>
          {tabs.map((t) => (
            <NavLink key={t.to} to={t.to} end={t.end} className={({ isActive }) => (isActive ? 'active' : '')}>{t.label}</NavLink>
          ))}
        </nav>
        <div className="a-user"><span>Ravi Naik · Collector</span><div className="avatar">RN</div></div>
      </header>
      <main className={`m-page ${wide ? '' : 'narrow'}`}><Outlet /></main>
    </div>
  );
}
