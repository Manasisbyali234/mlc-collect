import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { appStore } from '../collector/LoanCollectionScreens.jsx';

const STATUS_ORDER = ['Pending Admin Approval','Under Review','Approved','Rejected','Disbursed'];
const SC = { 'Pending Admin Approval':'yellow', 'Under Review':'yellow', Approved:'green', Rejected:'red', Disbursed:'green', Draft:'grey' };
const Pill = ({ c, children }) => <span className={'pill ' + c}>{children}</span>;

/* ===== Admin: Loan Applications List ===== */
export function LoanApplications() {
  const [search, setSearch] = useState('');
  const [sf, setSf] = useState('All');
  const apps = appStore.applications.filter(a => a.status !== 'Draft');
  const filtered = apps.filter(a => {
    const q = search.toLowerCase();
    const ms = !q || [a.memberName, a.memberId, a.appId, a.mobile, a.collectorName].some(v => v && v.toLowerCase().includes(q));
    return ms && (sf === 'All' || a.status === sf);
  });
  return (
    <>
      <div className='a-title'>
        <div><h1>Loan Applications</h1><p>All collector-submitted applications &middot; {apps.length} total</p></div>
      </div>
      <div style={{ display:'flex', gap:12, marginBottom:16, flexWrap:'wrap' }}>
        <input className='search' style={{ flex:1, minWidth:220, marginBottom:0 }} placeholder='Search name, ID, mobile, collector...' value={search} onChange={e => setSearch(e.target.value)} />
        <select className='sel' value={sf} onChange={e => setSf(e.target.value)}>
          <option>All</option>
          {STATUS_ORDER.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      {filtered.length === 0 ? (
        <div className='panel pad' style={{ textAlign:'center', padding:48 }}><p className='muted'>No applications found.</p></div>
      ) : (
        <div className='panel scroll-x'>
          <table className='dtable'>
            <thead><tr><th>App ID</th><th>Member</th><th>Mobile</th><th>Collector</th><th>Loan Type</th><th className='r'>Amount</th><th>Date</th><th>Status</th><th></th></tr></thead>
            <tbody>{filtered.map(a => (
              <tr key={a.appId}>
                <td className='mono' style={{ fontSize:13 }}>{a.appId}</td>
                <td><b>{a.memberName}</b><div className='muted' style={{ fontSize:12 }}>{a.memberId}</div></td>
                <td className='mono'>{a.mobile}</td>
                <td>{a.collectorName}</td>
                <td>{a.loanType}</td>
                <td className='r mono'>Rs.{a.loanAmount}</td>
                <td className='mono' style={{ fontSize:13 }}>{a.date}</td>
                <td><Pill c={SC[a.status] || 'grey'}>{a.status}</Pill></td>
                <td><Link to={'/admin/loan-applications/' + a.appId} className='btn sm'>View</Link></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </>
  );
}

/* ===== Admin: Application Detail ===== */
export function ApplicationDetail() {
  const { appId } = useParams();
  const [, forceUpdate] = useState(0);
  const app = appStore.applications.find(a => a.appId === appId);
  const [remark, setRemark] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [approvedAmount, setApprovedAmount] = useState('');
  const [approvedTenure, setApprovedTenure] = useState('');
  const [confirmedRate, setConfirmedRate] = useState('');
  const [disbursalRef, setDisbursalRef] = useState('');
  const [showReject, setShowReject] = useState(false);

  if (!app) return (
    <div><p className='muted'>Application not found.</p><Link to='/admin/loan-applications' className='btn outline sm'>Back</Link></div>
  );

  const member = appStore.members.find(m => m.memberId === app.memberId) || {};

  function updateStatus(newStatus, extra) {
    const idx = appStore.applications.findIndex(a => a.appId === appId);
    if (idx < 0) return;
    appStore.applications[idx] = { ...appStore.applications[idx], status: newStatus, ...extra, statusHistory: [...(appStore.applications[idx].statusHistory || []), { status: newStatus, date: new Date().toLocaleString(), by: 'Admin' }] };
    forceUpdate(n => n + 1);
  }

  function handleApprove() {
    if (!approvedAmount) { alert('Enter approved loan amount'); return; }
    const loanId = 'MCS-' + new Date().getFullYear().toString().slice(-2) + '-' + Math.random().toString(36).slice(2,8).toUpperCase();
    updateStatus('Approved', { approvedAmount, approvedTenure: approvedTenure || app.tenure, confirmedRate: confirmedRate || app.rate, adminRemark: remark, loanId });
  }

  function handleReject() {
    if (!rejectReason.trim()) { alert('Rejection reason is required'); return; }
    updateStatus('Rejected', { rejectReason, adminRemark: remark });
    setShowReject(false);
  }

  function handleDisburse() {
    if (!disbursalRef.trim()) { alert('Enter disbursal reference'); return; }
    updateStatus('Disbursed', { disbursalRef, disbursalDate: new Date().toLocaleDateString('en-IN') });
  }

  return (
    <>
      <div className='a-title'>
        <div>
          <div className='row' style={{ gap:12 }}>
            <h1>Application {app.appId}</h1>
            <Pill c={SC[app.status] || 'grey'}>{app.status}</Pill>
          </div>
          <p>{app.memberName} &middot; {app.memberId} &middot; Submitted {app.date}</p>
        </div>
        <Link to='/admin/loan-applications' className='btn outline sm'>Back</Link>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:18, alignItems:'start' }}>
        <div>
          <div className='panel pad' style={{ marginBottom:14 }}>
            <div className='eyebrow' style={{ fontSize:11, marginBottom:10 }}>1 &middot; Member Personal Information</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
              {[['Name',app.memberName],['Member ID',app.memberId],['Mobile',app.mobile],['Alt Mobile',member.altMobile],['DOB',member.dob],['Gender',member.gender],['Aadhaar','XXXX XXXX '+(member.aadhaar||'').slice(-4)],['PAN',member.pan],['Occupation',member.occupation],['Address',member.address],['Village',member.village],['District',member.district],['State',member.state],['PIN',member.pin]].filter(([,v])=>v).map(([k,v]) => (
                <div key={k} className='kv'><span className='sans'>{k}</span><span>{v}</span></div>
              ))}
            </div>
            {member.nomName && (
              <div style={{ marginTop:12, borderTop:'1px dashed var(--line)', paddingTop:10 }}>
                <div className='eyebrow' style={{ fontSize:11, marginBottom:8 }}>Nominee</div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                  {[['Name',member.nomName],['Relationship',member.nomRel],['Mobile',member.nomMobile],['Address',member.nomAddress]].filter(([,v])=>v).map(([k,v]) => (
                    <div key={k} className='kv'><span className='sans'>{k}</span><span>{v}</span></div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className='panel pad' style={{ marginBottom:14 }}>
            <div className='eyebrow' style={{ fontSize:11, marginBottom:10 }}>2 &middot; Loan Application Information</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
              {[['Loan Type',app.loanType],['Requested Amount','Rs.'+app.loanAmount],['Tenure',app.tenure+' days'],['Interest Rate',app.rate+'%'],['Interest','Rs.'+app.interest],['Total Repayable','Rs.'+app.total],['EMI','Rs.'+app.emi],['Purpose',app.purpose],['Application Date',app.date]].map(([k,v]) => (
                <div key={k} className='kv'><span className='sans'>{k}</span><span className='mono'>{v}</span></div>
              ))}
            </div>
            {app.approvedAmount && (
              <div style={{ background:'var(--green-bg)', borderRadius:10, padding:12, marginTop:12 }}>
                <div className='eyebrow' style={{ fontSize:11, marginBottom:6 }}>Approved Details</div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                  {[['Approved Amount','Rs.'+app.approvedAmount],['Approved Tenure',app.approvedTenure+' days'],['Confirmed Rate',app.confirmedRate+'%'],['Loan ID',app.loanId]].map(([k,v]) => (
                    <div key={k} className='kv'><span className='sans'>{k}</span><span className='mono'>{v}</span></div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className='panel pad' style={{ marginBottom:14 }}>
            <div className='eyebrow' style={{ fontSize:11, marginBottom:10 }}>3 &middot; Bank Details</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
              {[['Account Holder',app.bank?.holderName],['Bank',app.bank?.bankName],['Branch',app.bank?.branch],['Account No.','XXXX'+(app.bank?.accNo||'').slice(-4)],['IFSC',app.bank?.ifsc],['Account Type',app.bank?.accType],['UPI',app.bank?.upi]].filter(([,v])=>v).map(([k,v]) => (
                <div key={k} className='kv'><span className='sans'>{k}</span><span className='mono'>{v}</span></div>
              ))}
            </div>
          </div>

          <div className='panel pad' style={{ marginBottom:14 }}>
            <div className='eyebrow' style={{ fontSize:11, marginBottom:10 }}>4 &middot; Uploaded Documents</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
              {app.docs && Object.entries(app.docs).filter(([,v])=>v).map(([k,v]) => (
                <div key={k} style={{ border:'1px solid var(--line)', borderRadius:10, padding:12 }}>
                  <div style={{ fontSize:12, color:'var(--muted)', marginBottom:4 }}>{k}</div>
                  <div style={{ fontSize:13, fontWeight:600 }}>{v.name}</div>
                  <div style={{ fontSize:12, color:'var(--muted)' }}>{(v.size/1024).toFixed(1)} KB</div>
                </div>
              ))}
              {(!app.docs || Object.values(app.docs).every(v=>!v)) && <p className='muted'>No documents uploaded</p>}
            </div>
          </div>

          <div className='panel pad' style={{ marginBottom:14 }}>
            <div className='eyebrow' style={{ fontSize:11, marginBottom:10 }}>5 &middot; Collector Information</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
              {[['Collector Name',app.collectorName],['Collector ID',app.collectorId],['Submitted On',app.date]].map(([k,v]) => (
                <div key={k} className='kv'><span className='sans'>{k}</span><span>{v}</span></div>
              ))}
            </div>
          </div>

          <div className='panel pad' style={{ marginBottom:14 }}>
            <div className='eyebrow' style={{ fontSize:11, marginBottom:10 }}>6 &middot; Status History</div>
            {(app.statusHistory || []).map((h, i) => (
              <div key={i} style={{ display:'flex', gap:12, padding:'8px 0', borderBottom:'1px dashed var(--line)' }}>
                <Pill c={SC[h.status] || 'grey'}>{h.status}</Pill>
                <span className='muted' style={{ fontSize:13 }}>{h.date} &middot; {h.by}</span>
              </div>
            ))}
            {app.adminRemark && <p style={{ marginTop:10, fontSize:14 }}><b>Admin Remark:</b> {app.adminRemark}</p>}
            {app.rejectReason && <p style={{ marginTop:6, fontSize:14, color:'var(--red-tx)' }}><b>Rejection Reason:</b> {app.rejectReason}</p>}
            {app.disbursalRef && <p style={{ marginTop:6, fontSize:14, color:'var(--green-tx)' }}><b>Disbursal Ref:</b> {app.disbursalRef} &middot; {app.disbursalDate}</p>}
          </div>
        </div>

        <div>
          <div className='summary' style={{ position:'sticky', top:20 }}>
            <div className='t'>ACTIONS</div>
            <div style={{ marginTop:14 }}><Pill c={SC[app.status] || 'grey'}>{app.status}</Pill></div>
            {app.loanId && <div style={{ marginTop:10, fontSize:13, color:'#cfe3d9' }}>Loan ID: <b className='mono'>{app.loanId}</b></div>}
            <hr style={{ border:0, borderTop:'1px solid rgba(255,255,255,.15)', margin:'16px 0' }} />
            {app.status === 'Pending Admin Approval' && (
              <button className='btn block' style={{ marginBottom:10, background:'rgba(255,255,255,.15)' }} onClick={() => updateStatus('Under Review')}>Start Verification</button>
            )}
            {(app.status === 'Pending Admin Approval' || app.status === 'Under Review') && (
              <>
                <label style={{ color:'#cfe3d9', fontSize:12, display:'block', marginBottom:4 }}>Approved Amount (Rs.) *</label>
                <input className='input mono' style={{ padding:'8px 12px', fontSize:14, marginBottom:8 }} value={approvedAmount} onChange={e => setApprovedAmount(e.target.value)} placeholder='e.g. 10000' />
                <label style={{ color:'#cfe3d9', fontSize:12, display:'block', marginBottom:4 }}>Approved Tenure (days)</label>
                <input className='input mono' style={{ padding:'8px 12px', fontSize:14, marginBottom:8 }} value={approvedTenure} onChange={e => setApprovedTenure(e.target.value)} placeholder={app.tenure} />
                <label style={{ color:'#cfe3d9', fontSize:12, display:'block', marginBottom:4 }}>Confirm Interest Rate (%)</label>
                <input className='input mono' style={{ padding:'8px 12px', fontSize:14, marginBottom:8 }} value={confirmedRate} onChange={e => setConfirmedRate(e.target.value)} placeholder={app.rate} />
                <label style={{ color:'#cfe3d9', fontSize:12, display:'block', marginBottom:4 }}>Verification Remarks</label>
                <textarea className='input' style={{ padding:'8px 12px', fontSize:13, marginBottom:10, minHeight:60, resize:'vertical' }} value={remark} onChange={e => setRemark(e.target.value)} placeholder='Optional remarks' />
                <button className='btn gold block' style={{ marginBottom:8 }} onClick={handleApprove}>Approve and Create Loan</button>
                <button className='btn outline-red block' onClick={() => setShowReject(true)}>Reject Application</button>
              </>
            )}
            {app.status === 'Approved' && !app.disbursalRef && (
              <>
                <label style={{ color:'#cfe3d9', fontSize:12, display:'block', marginBottom:4 }}>Disbursal Reference</label>
                <input className='input mono' style={{ padding:'8px 12px', fontSize:14, marginBottom:10 }} value={disbursalRef} onChange={e => setDisbursalRef(e.target.value)} placeholder='UTR / cheque no.' />
                <button className='btn gold block' onClick={handleDisburse}>Record Disbursement</button>
              </>
            )}
          </div>
        </div>
      </div>

      {showReject && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', display:'grid', placeItems:'center', zIndex:100 }}>
          <div className='panel pad' style={{ maxWidth:440, width:'90%' }}>
            <h3 style={{ marginBottom:14 }}>Reject Application</h3>
            <label style={{ fontSize:13, fontWeight:600, color:'var(--muted)', display:'block', marginBottom:6 }}>Rejection Reason <span style={{ color:'var(--red-tx)' }}>*</span></label>
            <textarea className='input' style={{ minHeight:80, padding:'10px 12px', fontSize:14, marginBottom:14, resize:'vertical' }} value={rejectReason} onChange={e => setRejectReason(e.target.value)} placeholder='Mandatory: state reason for rejection' />
            <div className='row' style={{ gap:10, justifyContent:'flex-end' }}>
              <button className='btn outline' onClick={() => setShowReject(false)}>Cancel</button>
              <button className='btn outline-red' onClick={handleReject}>Confirm Rejection</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
