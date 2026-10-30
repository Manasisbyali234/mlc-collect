import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
export { LoanCollection, NewMemberForm, LoanApplicationForm } from './LoanCollectionScreens.jsx';

function Bar({ pct, green, tick }) {
  return (
    <div className="bar">
      <i className={green ? 'green' : ''} style={{ width: `${pct}%` }} />
      {tick != null && <b style={{ left: `${tick}%` }} />}
    </div>
  );
}

function PageHeader({ title, sub, children }) {
  return (
    <div className="page-header">
      <div><h1>{title}</h1>{sub && <p>{sub}</p>}</div>
      {children && <div className="right">{children}</div>}
    </div>
  );
}

/* ---------- 1. Home ---------- */
export function Home() {
  return (
    <>
      <PageHeader title="Namaskara, Ravi" sub="Collector · Hubballi East · Thu 08-Oct-2026">
        <span className="pill yellow">Yellow · today</span>
        <Link to="/app/collect" className="btn gold" style={{ padding: '14px 28px', fontSize: 17 }}>Collect →</Link>
      </PageHeader>

      <div className="cols">
        <div className="panel pad span2" style={{ marginBottom: 18 }}>
          <div className="row between" style={{ marginBottom: 14 }}>
            <div>
              <div className="eyebrow">Today's collection</div>
              <div className="big" style={{ fontSize: 44, margin: '6px 0 2px' }}>₹6,850</div>
              <div className="muted">of ₹9,400 due · 73% · Cash ₹4,950 · PhonePe ₹1,900</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="muted" style={{ fontSize: 14 }}>In hand</div>
              <div className="mono" style={{ fontSize: 32, fontWeight: 700 }}>₹4,950</div>
            </div>
          </div>
          <Bar pct={73} />
        </div>

        <div className="panel pad">
          <div className="eyebrow">Active loan accounts</div>
          <div className="stat-num">94</div>
          <div className="muted">81 customers (CIF)</div>
        </div>
        <div className="panel pad">
          <div className="eyebrow">Pending today</div>
          <div className="stat-num">26</div>
          <div className="muted">68 accounts paid</div>
        </div>

        <div className="panel pad">
          <div className="row between" style={{ marginBottom: 14 }}>
            <b style={{ fontSize: 18 }}>Payment behaviour</b>
            <span className="muted">October</span>
          </div>
          <div className="beh">
            <div className="g">On time<b>71</b></div>
            <div className="y">Missing dates<b>15</b></div>
            <div className="r">Not paying<b>8</b></div>
          </div>
        </div>

        <div className="panel pad span2">
          <div className="row between" style={{ marginBottom: 14 }}>
            <b style={{ fontSize: 18 }}>October targets</b>
            <span className="muted">Day 8 of 31</span>
          </div>
          <div className="trow">
            <div className="row between"><span>New applicants</span><span>9 / 15</span></div>
            <Bar pct={60} green />
          </div>
          <div className="trow">
            <div className="row between"><span>Approved loans</span><span>6 / 10</span></div>
            <Bar pct={60} green />
          </div>
          <div className="trow">
            <div className="row between"><span>Collection</span><span>₹62.4k / ₹2.6L</span></div>
            <Bar pct={24} />
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- 2. Today's collection list ---------- */
const rows = [
  { ini: 'LH', name: 'Lakshmi Hiremath', cif: '100245', loans: '2 loans', due: '₹600', action: 'collect' },
  { ini: 'BP', name: 'Basavaraj Patil', cif: '100118', loans: '1 loan', due: '₹100', action: 'paid', amt: '₹100' },
  { ini: 'MA', name: 'Mahantesh Angadi', cif: '100097', loans: '1 loan', due: '₹800', tag: 'red', arrears: true, action: 'collect' },
  { ini: 'SK', name: 'Shobha Kulkarni', cif: '100130', loans: '1 loan', due: '₹200', action: 'collect' },
  { ini: 'GD', name: 'Geeta Desai', cif: '100134', loans: '1 loan', due: '₹300', tag: 'late', action: 'collect' },
  { ini: 'SG', name: 'Suresh Gouda', cif: '100141', loans: '1 loan', reason: 'shop closed', action: 'notpaid' },
];

export function Collect() {
  const nav = useNavigate();
  const [filter, setFilter] = useState('Pending 26');
  const filters = ['Pending 26', 'Paid 68', 'Red 8', 'Gokul Rd'];
  return (
    <>
      <PageHeader title="Today's collection" sub="08-Oct · 81 customers · 94 loan accounts">
        <div className="chips">
          {filters.map((f) => (
            <button key={f} className={`chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </PageHeader>

      <input className="search" placeholder="Search name, mobile, CIF or account no." style={{ marginBottom: 14 }} />

      <div className="panel scroll-x" style={{ marginBottom: 18 }}>
        <table className="dtable">
          <thead>
            <tr><th>Customer</th><th>CIF</th><th>Loans</th><th className="r">Due</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.cif}>
                <td>
                  <div className="row" style={{ gap: 10 }}>
                    <div className="avatar" style={{ width: 36, height: 36, fontSize: 13 }}>{r.ini}</div>
                    <Link to="/app/customers" style={{ fontWeight: 700 }}>{r.name}</Link>
                    {r.tag === 'red' && <span className="pill red">Red</span>}
                    {r.tag === 'late' && <span className="pill yellow">Late</span>}
                  </div>
                </td>
                <td className="mono muted">{r.cif}</td>
                <td>{r.loans}{r.arrears && <span className="muted" style={{ fontSize: 13 }}> · incl. arrears</span>}</td>
                <td className="r mono">{r.due || <span className="muted">{r.reason}</span>}</td>
                <td>
                  {r.action === 'paid' && <span className="pill green">Paid {r.amt}</span>}
                  {r.action === 'notpaid' && <span className="pill grey">Not paid</span>}
                </td>
                <td>
                  {r.action === 'collect' && <button className="btn sm" onClick={() => nav('/app/record')}>Collect</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="panel pad">
        <div className="row between">
          <div>
            <div className="eyebrow">Day-end total</div>
            <div className="mono" style={{ fontSize: 32, fontWeight: 700, margin: '4px 0 2px' }}>₹6,850</div>
            <div className="muted">Cash ₹4,950 · PhonePe ₹1,900</div>
          </div>
          <Link to="/app/deposit" className="btn gold" style={{ padding: '16px 32px', fontSize: 18 }}>Deposit →</Link>
        </div>
      </div>
    </>
  );
}

/* ---------- 4. Customer profile ---------- */
export function Customer() {
  const nav = useNavigate();
  return (
    <>
      <PageHeader title="Lakshmi Hiremath" sub="Kirana shop · Gokul Road · member since Mar 2025">
        <span className="mono" style={{ background: 'var(--gold)', color: 'var(--g900)', borderRadius: 10, padding: '8px 14px', fontWeight: 700 }}>CIF 100245</span>
        <button className="btn sm" onClick={() => nav('/app/record')}>Collect ₹600</button>
      </PageHeader>

      <div className="panel pad" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginBottom: 18 }}>
        <div><div className="eyebrow">Active loans</div><div className="stat-num">2</div></div>
        <div><div className="eyebrow">Balance</div><div className="stat-num">₹12.6k</div></div>
        <div><div className="eyebrow">Due today</div><div className="stat-num">₹600</div></div>
      </div>

      <div className="cols">
        <div>
          <div className="panel pad" style={{ marginBottom: 18 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>KYC · Unique identity</div>
            <div className="kv"><span className="sans">Mobile</span><span>98861 40021</span></div>
            <div className="kv"><span className="sans">Aadhaar</span><span>XXXX XXXX 4417</span></div>
            <div className="kv"><span className="sans">PAN</span><span>BQRPH4421K</span></div>
            <div className="kv"><span className="sans">Address</span><span className="sans">#14, 2nd Cross, Gokul Rd, Hubballi</span></div>
          </div>
        </div>

        <div>
          <div className="panel-head" style={{ padding: '0 0 12px' }}><h3>Loan accounts under this CIF</h3><span className="muted">3 total</span></div>
          <Link to="/app/loan" className="loan-card">
            <div className="row between"><span className="acc">MCS-26-000123</span><span className="pill yellow">Yellow · 3 days behind</span></div>
            <div className="sub"><span>₹5,000 · ₹100/day · day 22 of 55</span><span>Bal <b>₹3,600</b></span></div>
            <Bar pct={40} />
          </Link>
          <Link to="/app/loan" className="loan-card">
            <div className="row between"><span className="acc">MCS-26-000188</span><span className="pill green">Green · on time</span></div>
            <div className="sub"><span>₹10,000 · ₹200/day · day 10 of 55</span><span>Bal <b>₹9,000</b></span></div>
            <Bar pct={18} green />
          </Link>
          <div className="loan-card closed">
            <div className="row between">
              <span className="muted"><b className="mono" style={{ color: 'var(--ink)' }}>MCS-25-000041</b> · ₹5,000 · closed 02-Aug-2026</span>
              <span className="pill grey">Closed</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- 3. Record collection ---------- */
export function Record() {
  const [mode, setMode] = useState('PhonePe');
  const [amount, setAmount] = useState('600');
  const [chip, setChip] = useState('dues+arrears');
  const nav = useNavigate();
  return (
    <>
      <PageHeader title="Record collection" sub="Lakshmi Hiremath · CIF 100245" />

      <div className="cols">
        <div>
          <div className="panel pad" style={{ marginBottom: 18 }}>
            <div className="lbl">Amount received</div>
            <div className="amt-input"><span>₹</span><input value={amount} onChange={(e) => setAmount(e.target.value)} /></div>
            <div className="chips">
              <button className={`chip ${chip === 'dues' ? 'sel' : ''}`} onClick={() => { setChip('dues'); setAmount('300'); }}>₹300 dues only</button>
              <button className={`chip ${chip === 'dues+arrears' ? 'sel' : ''}`} onClick={() => { setChip('dues+arrears'); setAmount('600'); }}>₹600 dues + arrears</button>
              <button className={`chip ${chip === 'close' ? 'sel' : ''}`} onClick={() => setChip('close')}>Close a loan</button>
            </div>
          </div>

          <div className="panel" style={{ marginBottom: 18 }}>
            <div className="split-head"><span>SPLIT ACROSS LOAN ACCOUNTS</span><b>₹600 OF ₹600</b></div>
            <div className="split-row">
              <div><span className="acc">MCS-26-000123</span><small>₹100 due + ₹300 arrears</small></div>
              <input defaultValue="400" />
            </div>
            <div className="split-row">
              <div><span className="acc">MCS-26-000188</span><small>₹200 due · on time</small></div>
              <input defaultValue="200" />
            </div>
          </div>

          <div className="panel pad" style={{ marginBottom: 18 }}>
            <div className="lbl">Not paid?</div>
            <div className="chips">
              {['Absent', 'Refused', 'Pay tomorrow', 'Shop closed'].map((r) => (
                <button key={r} className="chip">{r}</button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="panel pad" style={{ marginBottom: 18 }}>
            <div className="lbl">Payment mode</div>
            <div className="toggle2">
              {['Cash', 'PhonePe'].map((m) => (
                <button key={m} className={mode === m ? 'on' : ''} onClick={() => setMode(m)}>{m}</button>
              ))}
            </div>
            {mode === 'PhonePe' && (
              <>
                <div className="lbl">PhonePe UTR / transaction ID (required)</div>
                <input className="input mono" defaultValue="T2610081842 3399" />
                <div className="two" style={{ marginTop: 12 }}>
                  <button className="input dashed" style={{ cursor: 'pointer' }}>+ Payment screenshot</button>
                  <input className="input mono" style={{ textAlign: 'center' }} defaultValue="08-Oct-2026" />
                </div>
              </>
            )}
          </div>

          <div className="panel pad">
            <div className="row between" style={{ marginBottom: 16 }}>
              <span className="muted">Balance after save (both loans)</span>
              <b className="mono" style={{ color: 'var(--ink)', fontSize: 20 }}>₹12,000</b>
            </div>
            <button className="btn block" style={{ padding: 18, fontSize: 18 }} onClick={() => nav('/app/collect')}>
              Save ₹{amount || 0} · {mode}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- 5. Loan account ---------- */
export function LoanAccount() {
  const nav = useNavigate();
  const days = [
    ['Fri', '100', 'p'], ['Sat', '0', 'm'], ['Sun', '100', 'p'], ['Mon', '0', 'm'],
    ['Tue', '0', 'm'], ['Wed', '100', 'p'], ['Today', '–', 't'],
  ];
  const hist = [
    ['07-Oct', '100', 'Cash', '3,600'],
    ['06-Oct', '0', 'Absent', '3,700'],
    ['05-Oct', '0', 'Shop closed', '3,700'],
    ['04-Oct', '100', 'PhonePe', '3,700'],
    ['03-Oct', '0', 'Pay tomorrow', '3,800'],
  ];
  return (
    <>
      <PageHeader title="MCS-26-000123" sub="Lakshmi Hiremath · CIF 100245">
        <span className="pill yellow">Yellow</span>
        <button className="btn outline sm" onClick={() => nav(-1)}>← Back</button>
        <Link to="/app/record" className="btn sm">Collect ₹400</Link>
      </PageHeader>

      <div className="cols">
        <div>
          <div className="panel pad" style={{ marginBottom: 18 }}>
            <div className="row between" style={{ marginBottom: 14 }}>
              <div>
                <div className="eyebrow">Balance to pay</div>
                <div className="big" style={{ fontSize: 44, margin: '6px 0 4px' }}>₹3,600</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="eyebrow">Day</div>
                <div className="mono" style={{ fontSize: 32, fontWeight: 700, marginTop: 6 }}>22 / 55</div>
              </div>
            </div>
            <Bar pct={40} />
          </div>

          <div className="panel pad" style={{ marginBottom: 18 }}>
            <div className="kv"><span className="sans">Loan + interest (flat)</span><span>₹5,000 + ₹500</span></div>
            <div className="kv"><span className="sans">Total repayable</span><span>₹5,500</span></div>
            <div className="kv"><span className="sans">Collected · expected to date</span><span>₹1,900 · ₹2,200</span></div>
            <div className="kv"><span className="sans">Arrears</span><span style={{ color: 'var(--yellow-tx)', fontWeight: 700 }}>₹300 · 3 days</span></div>
            <div className="kv"><span className="sans">Start → end</span><span>17-Sep → 10-Nov-2026</span></div>
            <div className="kv"><span className="sans">Referrer · guarantor</span><span className="sans">Geeta Desai · Shivanand H.</span></div>
          </div>
        </div>

        <div>
          <div className="panel pad" style={{ marginBottom: 18 }}>
            <div className="row between" style={{ marginBottom: 12 }}>
              <b style={{ fontSize: 17 }}>Last 7 days</b>
              <span className="muted">₹100 due daily</span>
            </div>
            <div className="days7">
              {days.map(([d, v, c]) => (<div key={d} className={c}>{d}<b>{v}</b></div>))}
            </div>
          </div>

          <div className="panel scroll-x">
            <table className="dtable">
              <thead><tr><th>Date</th><th className="r">Paid</th><th>Mode</th><th className="r">Balance</th></tr></thead>
              <tbody>
                {hist.map(([d, p, m, b]) => (
                  <tr key={d}>
                    <td className="mono">{d}</td>
                    <td className={`r mono ${p === '0' ? 'red' : ''}`}>{p}</td>
                    <td className={p === '0' ? 'muted' : ''}>{m}</td>
                    <td className="r mono">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- 6. Deposit ---------- */
export function Deposit() {
  const [how, setHow] = useState('Bank counter');
  const [amount, setAmount] = useState('4,950');
  const matches = amount.replace(/,/g, '') === '4950';
  return (
    <>
      <PageHeader title="Deposit to society" sub="Collection date 08-Oct-2026" />

      <div className="cols">
        <div>
          <div className="panel pad" style={{ marginBottom: 18, background: 'var(--g900)', color: '#fff', borderColor: 'transparent' }}>
            <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 13, letterSpacing: '.08em' }}>MAHALAXMI CO-OPERATIVE SOCIETY LTD</div>
            <div style={{ margin: '6px 0', color: '#cfe3d9' }}>Society current account (shown for reference)</div>
            <div className="mono" style={{ fontSize: 16 }}>A/c XXXXXX7731 · IFSC KVGB0001234</div>
          </div>

          <div className="panel pad" style={{ marginBottom: 18 }}>
            <div className="kv"><span className="sans">Collected today</span><span style={{ fontSize: 18 }}>₹6,850</span></div>
            <div className="kv"><span className="sans">PhonePe (already in society a/c)</span><span style={{ fontSize: 18 }}>− ₹1,900</span></div>
            <hr style={{ border: 0, borderTop: '1px solid var(--line)' }} />
            <div className="kv bold"><span className="sans">Cash to deposit</span><span style={{ fontSize: 20 }}>₹4,950</span></div>
            <div className="kv"><span className="sans">Customers · entries</span><span>68 · 70</span></div>
            <a className="link" href="#">View customer-wise breakup</a>
          </div>

          <div className="panel pad">
            <div className="eyebrow" style={{ marginBottom: 10 }}>Earlier deposits</div>
            <div className="row between" style={{ padding: '8px 0' }}>
              <span className="mono">07-Oct · ₹5,300</span><span className="pill green">Verified</span>
            </div>
            <div className="row between" style={{ padding: '8px 0' }}>
              <span className="mono">06-Oct · ₹4,700</span><span className="pill red">Mismatch −₹100</span>
            </div>
          </div>
        </div>

        <div>
          <div className="panel pad">
            <div className="lbl">Amount deposited</div>
            <div className="amt-input"><span>₹</span><input value={amount} onChange={(e) => setAmount(e.target.value)} /></div>
            <div className="row between" style={{ marginBottom: 14 }}>
              <span className="muted">Variance</span>
              {matches ? <span className="pill green">₹0 · matches</span> : <span className="pill red">Mismatch</span>}
            </div>
            <div className="chips" style={{ marginBottom: 18 }}>
              {['Bank counter', 'CDM', 'UPI to society', 'Handed to office'].map((h) => (
                <button key={h} className={`chip ${how === h ? 'active' : ''}`} onClick={() => setHow(h)}>{h}</button>
              ))}
            </div>
            <div className="lbl">Bank reference / slip number</div>
            <input className="input mono" defaultValue="KVGB/HBL/081026/0087" style={{ marginBottom: 14 }} />
            <button className="input dashed" style={{ cursor: 'pointer', marginBottom: 18 }}>+ Upload deposit slip photo</button>
            <button className="btn block" style={{ padding: 18, fontSize: 18 }}>Submit for verification</button>
            <p className="muted" style={{ textAlign: 'center', fontSize: 14, margin: '10px 0 0' }}>
              Accountable Officer is emailed · today's entries lock
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- 7. Targets ---------- */
export function Targets() {
  const items = [
    { t: 'New applicants', tag: 'green', pct: 60, tick: 26, l: '9 of 15', r: '231% of expected', green: true },
    { t: 'Approved loans', tag: 'green', pct: 60, tick: 26, l: '6 of 10', r: '231% of expected', green: true },
    { t: 'Approved value', tag: 'green', pct: 47, tick: 26, l: '₹35,000 of ₹75,000', r: '181% of expected', green: true },
    { t: 'Collection amount', tag: 'yellow', pct: 24, tick: 26, l: '₹62,400 of ₹2,60,000', r: '92% of expected' },
    { t: 'Collection efficiency', tag: 'yellow', pct: 82, tick: 95, l: '82% vs 95% target', r: '86% of target' },
  ];
  const months = [
    ['Sep', '94%', 'g'], ['Aug', '88%', 'y'], ['Jul', '96%', 'g'], ['Jun', '67%', 'r'],
  ];
  return (
    <>
      <PageHeader title="My targets · October" sub="Day 8 of 31 · expected so far 26%">
        <span className="pill yellow">Overall: Yellow</span>
      </PageHeader>

      <div className="cols">
        <div className="panel pad span2">
          <div className="score" style={{ marginBottom: 18 }}>
            <div className="circ">82%</div>
            <div>
              <b style={{ fontSize: 22 }}>Overall: Yellow</b>
              <p className="muted" style={{ margin: '6px 0 0', fontSize: 16 }}>
                Collection efficiency is between 70% and 90% of target.
              </p>
            </div>
          </div>
          {items.map((it) => (
            <div className="tg" key={it.t}>
              <div className="row between">
                <h4>{it.t}</h4>
                <span className={`pill ${it.tag}`}>{it.tag === 'green' ? 'Green' : 'Yellow'}</span>
              </div>
              <Bar pct={it.pct} green={it.green} tick={it.tick} />
              <div className="foot"><span>{it.l}</span><span>{it.r}</span></div>
            </div>
          ))}
        </div>

        <div className="panel pad span2">
          <div className="eyebrow" style={{ marginBottom: 14 }}>Last 4 months</div>
          <div className="months" style={{ padding: 0 }}>
            {months.map(([m, v, c]) => (
              <div key={m} style={{
                background: c === 'g' ? 'var(--green-bg)' : c === 'y' ? 'var(--yellow-bg)' : 'var(--red-bg)',
                color: c === 'g' ? 'var(--green-tx)' : c === 'y' ? 'var(--yellow-tx)' : 'var(--red-tx)',
                borderRadius: 18, padding: 14, fontWeight: 600, fontSize: 16,
              }}>
                {m}<b style={{ display: 'block', fontSize: 28, marginTop: 2 }}>{v}</b>
              </div>
            ))}
          </div>
          <p className="muted" style={{ fontSize: 14, marginTop: 14, marginBottom: 0 }}>Black tick on each bar = where you should be today.</p>
        </div>
      </div>
    </>
  );
}
