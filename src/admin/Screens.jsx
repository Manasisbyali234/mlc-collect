import { useState } from 'react';
import { Link } from 'react-router-dom';
export { LoanApplications, ApplicationDetail } from './LoanApplicationScreens.jsx';

const Pill = ({ c, children }) => <span className={`pill ${c}`}>{children}</span>;
const Switch = ({ on: initial = false }) => {
  const [on, setOn] = useState(initial);
  return <button className={`switch ${on ? 'on' : ''}`} onClick={() => setOn(!on)} aria-pressed={on} />;
};

/* =============== Dashboard =============== */
export function Dashboard() {
  const kpis = [
    ['Customers (CIF)', '1,684', '1,962 open loan accounts'],
    ['Amount invested (open)', '₹1.12 Cr', 'principal disbursed'],
    ['Received from customers', '₹58.4 L', 'on open accounts'],
    ['Pending to receive', '₹64.8 L', 'incl. interest'],
    ['Collectors', '24', '22 active · 2 on leave'],
    ['Collection efficiency', '91.4%', 'month to date'],
    ['Cash with collectors', '₹1.06 L', 'not yet deposited'],
    ['Deposits to verify', '11', '2 mismatches'],
  ];
  const status = [
    ['green', 'Open · on time', '1,668', '₹52.1 L'],
    ['yellow', 'Open · missing dates', '257', '₹10.3 L'],
    ['red', 'Open · red', '37', '₹2.4 L'],
    ['red', 'Past end date', '12', '₹0.9 L'],
    ['grey', 'Closed', '6,410', '–'],
  ];
  const coll = [
    ['Mahesh Angadi', 'Hubballi East', 118, '74%', '7 / 15', '4 / 10', 9, '₹11,200', 'red', 'Red'],
    ['Rekha Patil', 'Dharwad', 76, '64%', '3 / 12', '2 / 8', 6, '₹4,300', 'red', 'Red'],
    ['Ravi Naik', 'Hubballi East', 94, '82%', '9 / 15', '6 / 10', 8, '₹4,950', 'yellow', 'Yellow'],
    ['Imtiyaz Kittur', 'Old Hubballi', 102, '88%', '10 / 15', '7 / 10', 4, '₹18,400', 'yellow', 'Yellow', true],
    ['Prakash Kulkarni', 'Hubballi East', 61, '96%', '8 / 12', '6 / 8', 1, '₹3,900', 'green', 'Green'],
  ];
  const pts = [1.6, 1.72, 1.67, 1.78, 1.75, 1.83, 1.72, 1.87, 1.82, 1.9, 1.86, 1.95, 1.9, 2.0, 1.96, 2.08];
  const W = 380, H = 150, min = 1.4, max = 2.6;
  const xy = pts.map((v, i) => [10 + (i * (W - 20)) / (pts.length - 1), H - ((v - min) / (max - min)) * H]);
  const line = xy.map((p) => p.join(',')).join(' ');
  return (
    <>
      <div className="a-title">
        <div><h1>Organisation dashboard</h1><p>Thu 08-Oct-2026 · all branches · updated 13:05</p></div>
        <div>
          <select className="sel"><option>All branches</option></select>
          <select className="sel"><option>October 2026</option></select>
          <select className="sel"><option>All products</option></select>
        </div>
      </div>

      <div className="red-banner">
        <div><div className="eb">RED ALERT ACCOUNTS</div><div className="n">37</div></div>
        <div>
          <b>₹41,600 in arrears across 9 collectors</b>
          <p>5 turned red today · 12 past end date · 3 promises to pay broken</p>
        </div>
        <Link to="/admin/alerts" className="go">Review &amp; assign collectors →</Link>
      </div>

      <div className="kpis">
        {kpis.map(([a, b, c]) => (
          <div className="kpi" key={a}><div className="eb">{a}</div><div className="v">{b}</div><small>{c}</small></div>
        ))}
      </div>

      <div className="two-col" style={{ marginTop: 18 }}>
        <div className="panel">
          <div className="panel-head"><h3>Loan accounts by status</h3><span>Open first</span></div>
          <table className="dtable">
            <thead><tr><th>Status</th><th className="r">Accounts</th><th className="r">Outstanding</th></tr></thead>
            <tbody>
              {status.map(([c, n, a, o]) => (
                <tr key={n}>
                  <td><Pill c={c}>{n}</Pill> {n === 'Closed' && <a className="link" style={{ fontSize: 12, marginLeft: 6 }} href="#">View closed</a>}</td>
                  <td className="r mono">{a}</td><td className="r mono">{o}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel">
          <div className="panel-head"><h3>Daily collections · last 30 days</h3><span className="mono">today ₹2.31 L</span></div>
          <div style={{ padding: '0 20px 20px' }}>
            <svg viewBox={`0 0 ${W} ${H + 24}`} width="100%" style={{ display: 'block' }}>
              {[0, 1, 2].map((i) => (
                <g key={i}>
                  <line x1="0" x2={W} y1={10 + i * 55} y2={10 + i * 55} stroke="#e3e8e4" />
                  <text x="0" y={6 + i * 55} fontSize="9" fill="#5f6f66" fontFamily="JetBrains Mono">{['2.5L', '2.0L', '1.5L'][i]}</text>
                </g>
              ))}
              <polygon points={`${xy[0][0]},${H} ${line} ${xy[xy.length - 1][0]},${H}`} fill="#e1ede5" />
              <polyline points={line} fill="none" stroke="#114f3b" strokeWidth="2" />
              <circle cx={xy[xy.length - 1][0]} cy={xy[xy.length - 1][1]} r="4" fill="#c9962e" />
              <text x="10" y={H + 18} fontSize="9" fill="#5f6f66" fontFamily="JetBrains Mono">09-Sep</text>
              <text x={W - 45} y={H + 18} fontSize="9" fill="#5f6f66" fontFamily="JetBrains Mono">08-Oct</text>
            </svg>
          </div>
        </div>
      </div>

      <div className="panel scroll-x">
        <div className="panel-head"><h3>Collectors · target vs actual</h3><span>Red first</span></div>
        <table className="dtable">
          <thead>
            <tr><th>Collector</th><th>Branch</th><th className="r">Accounts</th><th className="r">Collection eff.</th><th className="r">New applicants</th><th className="r">Approved</th><th className="r">Red accts</th><th className="r">Cash in hand</th><th>Status</th></tr>
          </thead>
          <tbody>
            {coll.map((r) => (
              <tr key={r[0]}>
                <td><b>{r[0]}</b></td><td>{r[1]}</td>
                <td className="r mono">{r[2]}</td><td className="r mono">{r[3]}</td>
                <td className="r mono">{r[4]}</td><td className="r mono">{r[5]}</td>
                <td className="r mono">{r[6]}</td>
                <td className="r mono" style={r[10] ? { color: 'var(--red-tx)' } : null}>{r[7]}</td>
                <td><Pill c={r[8]}>{r[9]}</Pill></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* =============== Alerts =============== */
export function Alerts() {
  const [sel, setSel] = useState({ 0: true, 1: true });
  const side = [
    ['RN', 'Ravi Naik', '8 red · ₹9,400', 'yellow', 'Yellow', true],
    ['MA', 'Mahesh Angadi', '9 red · ₹11,200', 'red', 'Red'],
    ['RP', 'Rekha Patil', '6 red · ₹7,900', 'red', 'Red'],
    ['IK', 'Imtiyaz Kittur', '4 red · ₹4,600', 'yellow', 'Yellow'],
    ['+5', '5 more collectors', '10 red · ₹8,500'],
  ];
  const rows = [
    ['Mahantesh Angadi', '100097', '', 'MCS-26-000097', '₹1,400', 7, '01-Oct', 'Broken · ₹500 on 07-Oct'],
    ['Suresh Gouda', '100141', '', 'MCS-26-000141', '₹1,200', 6, '02-Oct', '–'],
    ['Kavita Shetty', '100152', ' · 2 loans', 'MCS-26-000152', '₹1,000', 10, '28-Sep', '₹300 on 09-Oct'],
    ['Imran Mulla', '100176', '', 'MCS-26-000176', '₹800', 4, '04-Oct', '–'],
    ['Ravi Kambli', '100160', '', 'MCS-26-000160', '₹1,200', 6, '02-Oct', '–'],
  ];
  const [chan, setChan] = useState('Field visit');
  return (
    <>
      <div className="a-title">
        <div>
          <h1>Red alert accounts <span style={{ color: 'var(--red-tx)' }}>37</span></h1>
          <p>Pick a collector, select accounts, assign a recovery collector and channel</p>
        </div>
        <div className="chips">
          <button className="chip active">By collector</button>
          <button className="chip">All 37</button>
          <button className="chip">Arrears &gt; 7 days</button>
          <button className="chip">Past end date 12</button>
        </div>
      </div>

      <div className="alerts">
        <div className="panel">
          <div className="eyebrow" style={{ padding: 16, fontSize: 12 }}>Collectors with red accounts</div>
          {side.map(([i, n, s, c, l, on]) => (
            <div key={n} className={`collector-item ${on ? 'on' : ''}`}>
              <div className="avatar">{i}</div>
              <div><b>{n}</b><small>{s}</small></div>
              {c && <Pill c={c}>{l}</Pill>}
            </div>
          ))}
        </div>

        <div className="panel scroll-x">
          <div className="panel-head"><h3>Ravi Naik · 8 red accounts</h3><span>{Object.values(sel).filter(Boolean).length} selected</span></div>
          <table className="dtable">
            <thead><tr><th></th><th>Customer · CIF</th><th>Loan account</th><th className="r">Arrears</th><th className="r">Missed</th><th>Last paid</th><th>Promise</th></tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r[3]}>
                  <td><input type="checkbox" checked={!!sel[i]} onChange={() => setSel({ ...sel, [i]: !sel[i] })} /></td>
                  <td><a className="link" href="#" style={{ fontWeight: 700 }}>{r[0]}</a><div className="mono muted" style={{ fontSize: 12 }}>CIF {r[1]}{r[2]}</div></td>
                  <td className="mono">{r[3]}</td>
                  <td className="r mono" style={{ color: 'var(--red-tx)' }}>{r[4]}</td>
                  <td className="r mono">{r[5]}</td>
                  <td className="mono">{r[6]}</td>
                  <td style={{ color: r[7].startsWith('Broken') ? 'var(--red-tx)' : undefined, fontSize: 13 }}>{r[7]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel pad a-form">
          <h3 style={{ fontSize: 19 }}>Assign recovery collector</h3>
          <p className="muted" style={{ margin: '4px 0 0', fontSize: 13 }}>2 accounts · ₹2,600 arrears</p>
          <label>Additional collector</label>
          <input className="input" defaultValue="Prakash Kulkarni · 61 accts" />
          <div className="two">
            <div><label>From</label><input className="input mono" defaultValue="09-Oct-2026" /></div>
            <div><label>To</label><input className="input mono" defaultValue="23-Oct-2026" /></div>
          </div>
          <label>Recovery channel</label>
          <div className="chips">
            {['Field visit', 'Phone call', 'Referrer', 'Guarantor'].map((c) => (
              <button key={c} className={`chip ${chan === c ? 'active' : ''}`} style={{ fontSize: 13, padding: '7px 13px' }} onClick={() => setChan(c)}>{c}</button>
            ))}
          </div>
          <label>Reason</label>
          <input className="input" defaultValue="7+ days missed, not reachable" />
          <button className="btn block" style={{ marginTop: 18 }}>Assign and email collector</button>
          <button className="btn outline-red block" style={{ marginTop: 10 }}>Escalate to management</button>
          <hr style={{ border: 0, borderTop: '1px solid var(--line)', margin: '18px 0 10px' }} />
          <div className="eyebrow" style={{ fontSize: 11 }}>Follow-up log · Mahantesh</div>
          <p className="mono" style={{ fontSize: 12, margin: '8px 0 2px' }}>05-Oct · visit · shop closed · promised ₹500</p>
          <p className="mono" style={{ fontSize: 12, margin: 0 }}>03-Oct · call · not reachable</p>
        </div>
      </div>
    </>
  );
}

/* =============== Customer profile =============== */
export function CustomerProfile() {
  const days = [['01', '300', 'p'], ['02', '300', 'p'], ['03', '200', 'h'], ['04', '300', 'p'], ['05', '200', 'h'], ['06', '0', 'm'], ['07', '300', 'p'], ['08', '–', 't']];
  return (
    <>
      <div className="row between" style={{ marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div className="row" style={{ gap: 18 }}>
          <div className="avatar light lg" style={{ width: 66, height: 66 }}>LH</div>
          <div>
            <div className="row" style={{ gap: 10 }}>
              <h1 style={{ margin: 0, fontSize: 28 }}>Lakshmi Hiremath</h1>
              <span className="mono" style={{ background: 'var(--gold)', color: 'var(--g900)', padding: '5px 12px', borderRadius: 8, fontWeight: 700 }}>CIF 100245</span>
              <Pill c="green">KYC verified</Pill>
            </div>
            <p className="muted" style={{ margin: '6px 0 0' }}>Kirana shop · Gokul Road, Hubballi · member since 12-Mar-2025 · collector Ravi Naik</p>
          </div>
        </div>
        <div className="row" style={{ gap: 12 }}>
          <button className="btn outline sm">Edit profile</button>
          <Link to="/admin/loans" className="btn sm">+ New loan account under this CIF</Link>
        </div>
      </div>

      <div className="panel" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', padding: 22, gap: 12, marginBottom: 18 }}>
        {[
          ['Loan accounts', '3', '2 active · 1 closed'],
          ['Total exposure', '₹15,000', 'limit ₹25,000 per CIF'],
          ['Balance (all loans)', '₹12,600', 'incl. interest'],
          ['Arrears', '₹300', 'on 1 account', 'var(--yellow-tx)'],
          ['Repayment record', '92%', 'days paid, lifetime'],
        ].map(([a, b, c, col]) => (
          <div key={a}>
            <div className="eyebrow" style={{ fontSize: 11 }}>{a}</div>
            <div className="mono" style={{ fontSize: 28, fontWeight: 700, color: col }}>{b}</div>
            <small className="muted">{c}</small>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 18, alignItems: 'start' }}>
        <div className="panel pad kv-list">
          <div className="eyebrow" style={{ fontSize: 11, marginBottom: 6 }}>Customer identity · one per person</div>
          {[
            ['CIF number', '100245 (auto)'], ['Mobile', '98861 40021'], ['Email', 'lakshmi.h@gmail.com'],
            ['Aadhaar', 'XXXX XXXX 4417'], ['PAN', 'BQRPH4421K'], ['Date of birth', '14-Jun-1984'],
            ['Address', '#14, 2nd Cross, Gokul Rd, Hubballi 580030'], ['Documents', 'Aadhaar · PAN · Photo'],
          ].map(([k, v]) => <div className="kv" key={k}><span className="sans">{k}</span><span>{v}</span></div>)}
          <div style={{ background: 'var(--green-bg)', color: 'var(--green-tx)', padding: 14, borderRadius: 12, fontSize: 13, marginTop: 10 }}>
            Duplicate check passed: no other CIF uses this Aadhaar, PAN or mobile.
          </div>
        </div>

        <div>
          <div className="panel scroll-x" style={{ marginBottom: 18 }}>
            <div className="panel-head"><h3>Loan accounts under CIF 100245</h3><span>Each account has its own schedule, balance and status</span></div>
            <table className="dtable">
              <thead><tr><th>Loan account</th><th className="r">Loan</th><th className="r">Daily due</th><th>Start → end</th><th className="r">Paid</th><th className="r">Balance</th><th>Status</th></tr></thead>
              <tbody>
                {[
                  ['MCS-26-000123', 'Day 22 of 55 · ref. Geeta Desai', '₹5,000', '₹100', '17-Sep → 10-Nov', '₹1,900', '₹3,600', 'yellow', 'Yellow · 3 days'],
                  ['MCS-26-000188', 'Day 10 of 55 · guarantor Shivanand H.', '₹10,000', '₹200', '29-Sep → 22-Nov', '₹2,000', '₹9,000', 'green', 'Green'],
                  ['MCS-25-000041', 'Closed on time', '₹5,000', '₹100', '09-Jun → 02-Aug', '₹5,500', '₹0', 'grey', 'Closed'],
                ].map((r) => (
                  <tr key={r[0]} style={r[7] === 'grey' ? { color: 'var(--muted)' } : null}>
                    <td><Link to="/admin/collections" className="link mono" style={{ fontWeight: 700 }}>{r[0]}</Link><div className="muted" style={{ fontSize: 12 }}>{r[1]}</div></td>
                    <td className="r mono">{r[2]}</td><td className="r mono">{r[3]}</td><td className="mono">{r[4]}</td>
                    <td className="r mono">{r[5]}</td><td className="r mono">{r[6]}</td><td><Pill c={r[7]}>{r[8]}</Pill></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="panel pad">
            <div className="row between" style={{ marginBottom: 14 }}>
              <h3>October collections · both active loans</h3>
              <Link to="/admin/collections" className="link" style={{ fontSize: 13 }}>Open month grid</Link>
            </div>
            <div className="mgrid">
              {days.map(([d, v, c]) => <div key={d} className={c}>{d}<b>{v}</b></div>)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* =============== Open a loan account =============== */
export function OpenLoan() {
  const Fld = ({ l, v, ro, mono = true }) => (
    <div><label className="lbl" style={{ fontSize: 12, marginBottom: 5 }}>{l}</label>
      <input className={`input ${mono ? 'mono' : ''} ${ro ? 'ro' : ''}`} style={{ padding: '10px 12px', fontSize: 14 }} defaultValue={v} readOnly={ro} /></div>
  );
  return (
    <>
      <div className="a-title"><div><h1>Open a loan account</h1><p>Every loan belongs to one customer (CIF). Find the customer first, or create a new CIF.</p></div></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: 16 }}>
          <div className="panel pad">
            <h3><span className="num-circle">1</span>Customer (CIF)</h3>
            <label className="lbl" style={{ fontSize: 12, margin: '14px 0 5px' }}>Search by Aadhaar, mobile, PAN, name or CIF</label>
            <input className="input" style={{ padding: '10px 12px', fontSize: 14 }} defaultValue="98861 40021" />
            <div className="cust-hit">
              <div className="avatar">LH</div>
              <div style={{ flex: 1 }}>
                <b className="mono">Lakshmi Hiremath · CIF 100245</b>
                <div className="muted" style={{ fontSize: 12 }}>Aadhaar XXXX 4417 · 2 active loans · exposure ₹15,000 of ₹25,000</div>
              </div>
              <Pill c="yellow">Has 1 account in Yellow</Pill>
              <a className="link" href="#" style={{ fontSize: 13 }}>View profile</a>
            </div>
            <p className="muted" style={{ fontSize: 12, margin: '12px 0 0' }}>Not found? <a className="link" href="#"><b>Create new CIF</b></a> with name, mobile, Aadhaar, PAN, address and KYC documents.</p>
          </div>

          <div className="panel pad">
            <h3><span className="num-circle">2</span>Loan details</h3>
            <div className="form-grid fg3" style={{ marginTop: 14 }}>
              <Fld l="Account number (auto, admin can edit)" v="MCS-26-000214" />
              <Fld l="Loan product" v="Daily 55 · 10% flat" mono={false} />
              <Fld l="Primary collector" v="Ravi Naik" mono={false} />
            </div>
            <div className="form-grid fg4" style={{ marginTop: 14 }}>
              <Fld l="Approved amount ₹" v="5,000" /><Fld l="Interest ₹" v="500" ro />
              <Fld l="Tenure (days)" v="55" /><Fld l="Daily due ₹" v="100" ro />
            </div>
            <div className="form-grid fg3" style={{ marginTop: 14 }}>
              <Fld l="Start date" v="09-Oct-2026" /><Fld l="End date (auto)" v="02-Dec-2026" ro /><Fld l="Origination ref." v="APP-26-10-0418" />
            </div>
          </div>

          <div className="panel pad">
            <h3><span className="num-circle">3</span>Referrer and security (optional)</h3>
            <div className="form-grid fg3" style={{ marginTop: 14 }}>
              <Fld l="Referred by" v="Geeta Desai · CIF 100134" mono={false} />
              <Fld l="Security authorizer / guarantor" v="Shivanand Hiremath" mono={false} />
              <Fld l="Relation · mobile" v="Husband · 94481 22093" mono={false} />
            </div>
          </div>
        </div>

        <div className="summary">
          <div className="t">SUMMARY</div>
          <div className="big2">₹5,500</div>
          <div style={{ fontSize: 12, color: '#cfe3d9' }}>₹5,000 + ₹500 interest, repaid as 55 × ₹100</div>
          <hr />
          <div className="kv"><span className="sans">Customer</span><span>CIF 100245</span></div>
          <div className="kv"><span className="sans">Loan account</span><span>MCS-26-000214</span></div>
          <div className="kv"><span className="sans">Runs</span><span>09-Oct → 02-Dec</span></div>
          <div className="kv"><span className="sans">CIF exposure after</span><span>₹20,000</span></div>
          <div className="kv"><span className="sans">Active loans after</span><span>3 (max 3)</span></div>
          <button className="btn gold block" style={{ marginTop: 18 }}>Activate loan account</button>
          <button className="btn block" style={{ marginTop: 10, background: 'transparent', border: '1px solid rgba(255,255,255,.2)' }}>Save as draft</button>
          <p style={{ fontSize: 12, color: '#cfe3d9', marginBottom: 0 }}>Collector and customer get an email with account number, daily due and dates.</p>
        </div>
      </div>
    </>
  );
}

/* =============== Collection grid =============== */
export function CollectionGrid() {
  const dates = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '…31'];
  const sundays = ['4', '11'];
  const rows = [
    ['Lakshmi Hiremath', 'CIF 100245 · …000123 · ₹100', ['100', '100', '0', '100', '0', '0', '100', '–'], '400'],
    ['Lakshmi Hiremath', 'CIF 100245 · …000188 · ₹200', ['200', '200', '200', '200', '200', '0', '200', '–'], '1,200'],
    ['Basavaraj Patil', 'CIF 100118 · …000101 · ₹100', ['100', '100', '100', '100', '100', '100', '100', '100'], '800'],
    ['Shobha Kulkarni', 'CIF 100130 · …000130 · ₹200', ['200', '100', '200', '200', '200', '200', '300', '–'], '1,400'],
    ['Geeta Desai', 'CIF 100134 · …000134 · ₹150', ['150', '75', '150', 'H', '75', '150', '0', '–'], '600'],
    ['Mahantesh Angadi', 'CIF 100097 · …000097 · ₹100', ['100', '0', '0', '0', '0', '0', '0', '–'], '100'],
    ['Suresh Gouda', 'CIF 100141 · …000141 · ₹100', ['100', '100', '0', '0', '0', '0', '0', '0'], '200'],
  ];
  const cls = (v, i) => {
    if (i === 7) return v === '0' ? 'm t' : v === '–' ? 't' : 'p t';
    if (v === 'H') return 'hol';
    if (v === '0') return 'm';
    if (v === '–') return '';
    return 'p';
  };
  const partRow = (r, v, i) => (r[0] === 'Geeta Desai' && v === '75') || (r[0] === 'Shobha Kulkarni' && v === '100' && i === 1);
  const totals = ['9,350', '8,900', '8,650', '8,400', '8,700', '8,150', '9,100', '6,850'];
  return (
    <>
      <div className="a-title">
        <div><h1>Collection grid · October 2026</h1><p>Ravi Naik · 94 loan accounts · the Excel register, live</p></div>
        <div className="row" style={{ gap: 10 }}>
          <select className="sel"><option>Collector: Ravi Naik</option></select>
          <button className="chip">‹ Sep</button>
          <button className="chip active">Oct 2026</button>
          <button className="chip">Nov ›</button>
          <button className="btn sm">Export to Excel</button>
        </div>
      </div>
      <div className="legend">
        <span><i style={{ background: 'var(--green-bg)', borderColor: '#9fd0ae' }} />Paid in full</span>
        <span><i style={{ background: 'var(--yellow-bg)', borderColor: '#e6c98a' }} />Part paid</span>
        <span><i style={{ background: 'var(--red-bg)', borderColor: '#e9a8a2' }} />Not paid</span>
        <span><i style={{ background: '#f2f4f1', borderColor: '#cfd6d1' }} />Upcoming</span>
        <span><i style={{ background: '#fff', borderColor: 'var(--g800)', borderWidth: 2 }} />Today</span>
      </div>
      <div className="panel grid-wrap">
        <table className="reg">
          <thead>
            <tr>
              <th>Customer · loan account</th>
              {dates.map((d) => <th key={d} className={sundays.includes(d) ? 'sun' : ''}>{d}</th>)}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri}>
                <td><b>{r[0]}</b><small>{r[1]}</small></td>
                {dates.map((d, i) => {
                  const v = r[2][i];
                  return v === undefined
                    ? <td key={d}></td>
                    : <td key={d} className={partRow(r, v, i) ? 'h2' : cls(v, i)}>{v}</td>;
                })}
                <td className="tot">{r[3]}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Daily total (94 accounts)</td>
              {dates.map((d, i) => <td key={d}>{totals[i] || ''}</td>)}
              <td>68,100</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="muted" style={{ fontSize: 14 }}>The first column stays put while the dates scroll. Click a row to open that loan account. H = holiday. Sundays are in red.</p>
    </>
  );
}

/* =============== Deposit verification =============== */
export function DepositVerification() {
  const subs = [
    ['Ravi Naik', '08-Oct', '4,950', '4,950', '0', 'yellow', 'To verify', true],
    ['Mahesh Angadi', '08-Oct', '6,200', '6,000', '−200', 'yellow', 'To verify'],
    ['Prakash Kulkarni', '07-Oct', '3,900', '3,900', '0', 'green', 'Verified'],
    ['Ravi Naik', '06-Oct', '4,800', '4,700', '−100', 'red', 'Mismatch'],
    ['Savita Hosamani', '05-Oct', '3,100', '–', '–', 'red', 'Not deposited'],
  ];
  const lines = [
    ['Basavaraj Patil', '100118', '…000101', '100', '–', '', true],
    ['Lakshmi Hiremath', '100245', '…000123', '–', '400', 'T26100818423399', true],
    ['Lakshmi Hiremath', '100245', '…000188', '–', '200', 'T26100818423399', true],
    ['Shobha Kulkarni', '100130', '…000130', '200', '–', '', true],
    ['Geeta Desai', '100134', '…000134', '150', '–', '', false],
  ];
  return (
    <>
      <div className="a-title"><div><h1>Deposit verification</h1><p>Match each collector's deposit to the customer-wise collections for that day</p></div></div>
      <div className="panel" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: 22, marginBottom: 18 }}>
        {[['Waiting to verify', '11', '₹58,300'], ['Mismatches', '2', '−₹300 total', 'var(--red-tx)'], ['Cash with collectors', '₹1.06 L', 'not yet deposited'], ['Overdue deposits', '3', 'older than 2 days', 'var(--yellow-tx)']].map(([a, b, c, col]) => (
          <div key={a}><div className="eyebrow" style={{ fontSize: 11 }}>{a}</div><div className="mono" style={{ fontSize: 28, fontWeight: 700, color: col }}>{b}</div><small className="muted">{c}</small></div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 18, alignItems: 'start' }}>
        <div className="panel scroll-x">
          <div className="panel-head"><h3>Submitted deposits</h3></div>
          <table className="dtable">
            <thead><tr><th>Collector</th><th>Date</th><th className="r">Expected</th><th className="r">Deposited</th><th className="r">Diff.</th><th>Status</th></tr></thead>
            <tbody>
              {subs.map((r, i) => (
                <tr key={i} className={r[7] ? 'sel-row' : ''}>
                  <td><b>{r[0]}</b></td><td className="mono">{r[1]}</td><td className="r mono">{r[2]}</td><td className="r mono">{r[3]}</td>
                  <td className="r mono" style={{ color: r[4].startsWith('−') ? 'var(--red-tx)' : undefined }}>{r[4]}</td>
                  <td><Pill c={r[5]}>{r[6]}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel">
          <div className="panel-head"><h3 style={{ fontSize: 18 }}>Ravi Naik · 08-Oct · customer-wise</h3><Pill c="green">Customers add up to ₹4,950 cash</Pill></div>
          <table className="dtable">
            <thead><tr><th></th><th>Customer · CIF</th><th>Loan account</th><th className="r">Cash</th><th className="r">PhonePe</th><th>UTR</th></tr></thead>
            <tbody>
              {lines.map((r, i) => (
                <tr key={i}>
                  <td><input type="checkbox" defaultChecked={r[6]} /></td>
                  <td>{r[0]} <span className="mono muted" style={{ fontSize: 12 }}>{r[1]}</span></td>
                  <td className="mono">{r[2]}</td><td className="r mono">{r[3]}</td><td className="r mono">{r[4]}</td><td className="mono" style={{ fontSize: 12 }}>{r[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="muted" style={{ padding: '14px 20px', fontSize: 13, borderTop: '1px solid var(--line)' }}>+ 65 more entries · cash ₹4,950 · PhonePe ₹1,900</div>
          <div style={{ padding: 20, borderTop: '1px solid var(--line)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 14 }}>
              <div className="input dashed" style={{ display: 'grid', placeItems: 'center', fontSize: 13, lineHeight: 1.4, padding: 10 }}>Slip photo<br />No. 458812</div>
              <div><label className="lbl" style={{ fontSize: 13 }}>Officer remarks</label><input className="input" placeholder="Optional" style={{ padding: '12px 14px', fontSize: 15 }} /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr', gap: 10, marginTop: 16 }}>
              <button className="btn" style={{ padding: 14 }}>Verify deposit</button>
              <button className="btn outline-gold" style={{ padding: 14 }}>Flag mismatch</button>
              <button className="btn outline-red" style={{ padding: 14 }}>Reject</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* =============== Settings =============== */
export function Settings() {
  const side = ['Users & roles', 'Loan products', 'Numbering (CIF, account)', 'Status rules & alerts', 'Targets', 'Holidays', 'Email & OTP', 'Branches & areas', 'Reports', 'Audit log'];
  const users = [
    ['Manjunath P', 'Super Admin', 'All', '98450 12345', 'On', 'green', 'Active', 'Edit'],
    ['Anand Hegde', 'Management', 'All', '94480 33011', 'On', 'green', 'Active', 'Edit'],
    ['Priya Joshi', 'Accountable Officer', 'Head office', '97412 55621', 'On', 'green', 'Active', 'Edit'],
    ['Ravi Naik', 'Collector', 'Hubballi East · Gokul Rd', '99001 23456', 'Off', 'green', 'Active', 'Edit'],
    ['Savita Hosamani', 'Collector', 'Dharwad', '90080 77120', 'Off', 'grey', 'On leave', 'Reassign'],
    ['Rekha Patil', 'Collector', 'Dharwad', '96320 44190', 'Off', 'red', 'Locked', 'Unlock'],
  ];
  const Card = ({ t, children }) => (
    <div className="panel pad kv-list"><h3 style={{ fontSize: 18, marginBottom: 6 }}>{t}</h3>{children}</div>
  );
  const KV = ({ k, v }) => <div className="kv"><span className="sans">{k}</span><span className="sans" style={{ fontFamily: v && /^[\d≥<>]/.test(v) ? 'var(--mono)' : undefined }}>{v}</span></div>;
  const SW = ({ k, on }) => <div className="kv" style={{ alignItems: 'center' }}><span className="sans">{k}</span><Switch on={on} /></div>;
  return (
    <div className="settings">
      <aside className="side">
        <div className="eyebrow" style={{ fontSize: 11, padding: '0 14px 10px' }}>Settings</div>
        {side.map((s, i) => <a key={s} href="#" className={i === 0 ? 'active' : ''}>{s}</a>)}
      </aside>
      <div>
        <div className="a-title">
          <div><h1>Users &amp; roles</h1><p>31 users · 5 roles</p></div>
          <button className="btn sm">+ Add user</button>
        </div>
        <div className="panel scroll-x">
          <table className="dtable">
            <thead><tr><th>Name</th><th>Role</th><th>Branch / Area</th><th>Mobile</th><th>Email OTP</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u[0]}>
                  <td><b>{u[0]}</b></td><td>{u[1]}</td><td>{u[2]}</td><td className="mono">{u[3]}</td><td>{u[4]}</td>
                  <td><Pill c={u[5]}>{u[6]}</Pill></td><td><a className="link" href="#">{u[7]}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cards2">
          <Card t="Loan product · Daily 55">
            <KV k="Interest" v="10% flat" /><KV k="Default tenure" v="55 days" /><KV k="Daily due rounding" v="Up to ₹1, last day adjusts" />
            <KV k="Max active loans per CIF" v="3" /><KV k="Max exposure per CIF" v="₹25,000" /><SW k="Late fee" />
          </Card>
          <Card t="Numbering">
            <KV k="CIF number" v="6 digits · next 100246" /><KV k="Loan account pattern" v="MCS-{YY}-{SEQ:6}" />
            <KV k="Next loan account" v="MCS-26-000214" /><SW k="Admin can edit numbers" on />
          </Card>
          <Card t="Status rules">
            <KV k="Collector Green" v="≥ 90% of target" /><KV k="Collector Red" v="< 70%" /><KV k="Account Yellow" v="2–5 days behind" />
            <KV k="Account Red" v="> 5 days or 4 missed in a row" /><KV k="Deposit due within" v="2 days" />
          </Card>
          <Card t="Email & security">
            <SW k="Email OTP for admin roles" on /><SW k="Email OTP for collectors" />
            <KV k="Daily summary to management" v="20:00" /><KV k="Session timeout (desktop)" v="30 min" />
          </Card>
        </div>
      </div>
    </div>
  );
}

/* =============== Collector targets (Nov) =============== */
export function CollectorTargets() {
  const rows = [
    ['Ravi Naik', 'Hubballi East · 94 accts', ['15', '10', '75,000', '2,70,000', '95'], ['9', '6', '35,000', '2,60,000', '94'], true],
    ['Mahesh Angadi', 'Hubballi East · 118 accts', ['15', '10', '75,000', '3,20,000', '95'], ['7', '4', '25,000', '2,90,000', '74'], true],
    ['Prakash Kulkarni', 'Hubballi East · 61 accts', ['12', '8', '60,000', '1,90,000', '95'], ['8', '6', '40,000', '1,90,000', '96']],
    ['Imtiyaz Kittur', 'Old Hubballi · 102 accts', ['15', '10', '75,000', '2,50,000', '95'], ['10', '7', '45,000', '2,40,000', '88']],
    ['Rekha Patil', 'Dharwad · 76 accts', ['12', '8', '60,000', '1,80,000', '90'], ['3', '2', '10,000', '1,70,000', '64']],
  ];
  const head = ['New applicants', 'Approvals', 'Approved value ₹', 'Collection ₹', 'Efficiency %'];
  return (
    <>
      <div className="a-title">
        <div>
          <div className="row" style={{ gap: 12 }}><h1>Collector targets · November 2026</h1><Pill c="yellow">Draft</Pill></div>
          <p>Set monthly targets for new applicants, approvals and collection. Small grey figures show September actuals.</p>
        </div>
        <div className="row" style={{ gap: 10 }}>
          <button className="chip">Oct 2026</button><button className="chip active">Nov 2026</button>
          <button className="chip">Copy from October</button><button className="chip">Apply row to selected</button>
        </div>
      </div>
      <div className="tgt-layout">
        <div className="panel" style={{ overflow: 'hidden' }}>
          <div className="scroll-x">
            <table className="tgt-table">
              <thead><tr><th><input type="checkbox" /></th><th>COLLECTOR</th>{head.map((h) => <th key={h}>{h.toUpperCase()}</th>)}</tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r[0]}>
                    <td><input type="checkbox" defaultChecked={!!r[4]} /></td>
                    <td><b>{r[0]}</b><div className="muted" style={{ fontSize: 13 }}>{r[1]}</div></td>
                    {r[2].map((v, i) => (
                      <td key={i}><input defaultValue={v} /><small>Sep {r[3][i]}</small></td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr><td></td><td>All 24 collectors</td><td>318</td><td>212</td><td>15,90,000</td><td>52,40,000</td><td>94 avg</td></tr>
              </tfoot>
            </table>
          </div>
          <div className="row between" style={{ padding: 18, borderTop: '1px solid var(--line)' }}>
            <span className="muted" style={{ fontSize: 14 }}>Showing 5 of 24 collectors · 2 selected</span>
            <div className="row" style={{ gap: 12 }}>
              <button className="btn outline sm">Save draft</button>
              <button className="btn sm">Publish and email collectors</button>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          <div className="panel pad kv-list">
            <h3 style={{ fontSize: 18 }}>How actuals are counted</h3>
            <div className="kv"><span className="sans">New applicants</span><span className="sans" style={{ maxWidth: 190 }}>Applications in origination app tagged to the collector, by month submitted</span></div>
            <div className="kv"><span className="sans">Approvals</span><span className="sans" style={{ maxWidth: 190 }}>Same applications, by month approved</span></div>
            <div className="kv"><span className="sans">Approved value</span><span className="sans">Sum of approved amounts</span></div>
            <div className="kv"><span className="sans">Collection</span><span className="sans">Daily entries in this app</span></div>
          </div>
          <div className="panel pad">
            <h3 style={{ fontSize: 18 }}>Status during the month</h3>
            <p className="muted" style={{ fontSize: 14 }}>Each actual is compared with the target for the days passed so far.</p>
            <div className="chips"><Pill c="green">Green ≥ 90%</Pill><Pill c="yellow">Yellow 70–89%</Pill><Pill c="red">Red &lt; 70%</Pill></div>
            <p><Link className="link" to="/admin/settings">Change thresholds in Settings</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}
