import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './Login.jsx';
import CollectorLayout from './collector/CollectorLayout.jsx';
import {
  Home, Collect, Customer, Record, LoanAccount, Deposit, Targets,
  LoanCollection, NewMemberForm, LoanApplicationForm,
} from './collector/Screens.jsx';
import AdminLayout from './admin/AdminLayout.jsx';
import {
  Dashboard, Alerts, CustomerProfile, OpenLoan, CollectionGrid,
  DepositVerification, Settings, CollectorTargets,
  LoanApplications, ApplicationDetail,
} from './admin/Screens.jsx';

function Launcher() {
  return (
    <div className="launcher">
      <div className="box">
        <div className="logo-m">M</div>
        <h1>Mahalaxmi Co-Operative Society Ltd</h1>
        <p>MLC – Maha Laxmi Collect · UI preview</p>
        <Link className="btn gold" to="/login">Collector sign in</Link>
        <Link className="btn gold" to="/app">Collector app (phone)</Link>
        <Link className="btn outline" to="/admin">Admin portal (desktop)</Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Launcher />} />
      <Route path="/login" element={<Login />} />

      <Route path="/app" element={<CollectorLayout />}>
        <Route index element={<Home />} />
        <Route path="collect" element={<Collect />} />
        <Route path="customers" element={<Customer />} />
        <Route path="record" element={<Record />} />
        <Route path="loan" element={<LoanAccount />} />
        <Route path="deposit" element={<Deposit />} />
        <Route path="targets" element={<Targets />} />
        <Route path="loan-collection" element={<LoanCollection />} />
        <Route path="loan-collection/new-member" element={<NewMemberForm />} />
        <Route path="loan-collection/apply/:memberId" element={<LoanApplicationForm />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="customers" element={<CustomerProfile />} />
        <Route path="loans" element={<OpenLoan />} />
        <Route path="collections" element={<CollectionGrid />} />
        <Route path="deposits" element={<DepositVerification />} />
        <Route path="targets" element={<CollectorTargets />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="settings" element={<Settings />} />
        <Route path="loan-applications" element={<LoanApplications />} />
        <Route path="loan-applications/:appId" element={<ApplicationDetail />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
