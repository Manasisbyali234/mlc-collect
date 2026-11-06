import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { to: '/app', label: 'Home', end: true },
  { to: '/app/collect', label: 'Collect' },
  { to: '/app/customers', label: 'Customers' },
  { to: '/app/deposit', label: 'Deposit' },
  { to: '/app/targets', label: 'Targets' },
  { to: '/app/loan-collection', label: 'Loan Collection' },
];

export default function CollectorLayout() {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const wide = pathname === '/app' || pathname === '/app/collect';
  const user = JSON.parse(localStorage.getItem('mlc_user') || '{"name":"Collector","role":"collector"}');
  const initials = user.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
  function logout() { localStorage.removeItem('mlc_user'); nav('/'); }
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
        <div className="a-user"><span>{user.name} · Collector</span><div className="avatar">{initials}</div><button onClick={logout} style={{ marginLeft:10, background:'rgba(255,255,255,.12)', border:0, color:'inherit', borderRadius:8, padding:'6px 14px', fontSize:13, fontWeight:600, cursor:'pointer' }}>Logout</button></div>
      </header>
      <main className={`m-page ${wide ? '' : 'narrow'}`}><Outlet /></main>
    </div>
  );
}
