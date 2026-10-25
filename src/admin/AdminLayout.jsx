import { NavLink, Outlet, useLocation } from 'react-router-dom';

const tabs = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/customers', label: 'Customers (CIF)' },
  { to: '/admin/loans', label: 'Loan accounts' },
  { to: '/admin/collections', label: 'Collections' },
  { to: '/admin/deposits', label: 'Deposits' },
  { to: '/admin/targets', label: 'Targets' },
  { to: '/admin/alerts', label: 'Alerts' },
  { to: '/admin/settings', label: 'Settings' },
];

export default function AdminLayout() {
  const { pathname } = useLocation();
  const sub =
    pathname.startsWith('/admin/deposits') ? 'Accountable Officer · Priya Joshi'
    : pathname.startsWith('/admin/settings') ? 'Super Admin'
    : 'Loan collection · Head office';
  return (
    <div className="a-app">
      <header className="a-top">
        <div className="brand">
          <div className="logo-m sm">M</div>
          <div><b>Mahalaxmi Co-Operative Society Ltd</b><small>{sub}</small></div>
        </div>
        <nav className="a-nav">
          {tabs.map((t) => (
            <NavLink key={t.to} to={t.to} end={t.end} className={({ isActive }) => (isActive ? 'active' : '')}>
              {t.label}
            </NavLink>
          ))}
        </nav>
        <div className="a-user">
          <span>Manjunath · Admin</span>
          <div className="avatar">MP</div>
        </div>
      </header>
      <main className="a-main"><Outlet /></main>
    </div>
  );
}
