import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/customers', label: 'Customers (CIF)' },
  { to: '/admin/loans', label: 'Loan accounts' },
  { to: '/admin/loan-applications', label: 'Loan Applications' },
  { to: '/admin/collections', label: 'Collections' },
  { to: '/admin/deposits', label: 'Deposits' },
  { to: '/admin/targets', label: 'Targets' },
  { to: '/admin/alerts', label: 'Alerts' },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/sanction-letters', label: 'Sanction Letters' },
  { to: '/admin/settings', label: 'Settings' },
];

export default function AdminLayout() {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem('mlc_user') || '{"name":"Admin","role":"admin"}');
  const initials = user.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
  function logout() { localStorage.removeItem('mlc_user'); nav('/'); }
  const sub =
    pathname.startsWith('/admin/deposits') ? 'Accountable Officer'
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
          <span>{user.name} · {user.role}</span>
          <div className="avatar">{initials}</div>
          <button onClick={logout} style={{ marginLeft:10, background:'rgba(255,255,255,.12)', border:0, color:'inherit', borderRadius:8, padding:'6px 14px', fontSize:13, fontWeight:600, cursor:'pointer' }}>Logout</button>
        </div>
      </header>
      <main className="a-main"><Outlet /></main>
    </div>
  );
}
