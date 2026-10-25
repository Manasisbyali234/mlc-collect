import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const nav = useNavigate();
  const [otp, setOtp] = useState(['4', '8', '2', '9', '1', '']);

  const setDigit = (i, v) => {
    const next = [...otp];
    next[i] = v.replace(/\D/g, '').slice(-1);
    setOtp(next);
  };

  return (
    <div className="login-wrap">
      <div className="login-top">
        <div className="logo-m" style={{ width: 104, height: 104, borderRadius: 30, fontSize: 52 }}>M</div>
        <h1>Mahalaxmi Co-Operative Society Ltd</h1>
        <p>Daily loan collection · Field app</p>
      </div>

      <div className="login-right">
      <form
        className="login-card"
        onSubmit={(e) => { e.preventDefault(); nav('/app'); }}
      >
        <h2>Sign in</h2>
        <div className="field">
          <label>Mobile number or user ID</label>
          <input className="input mono" defaultValue="98450 12345" />
        </div>
        <div className="field">
          <label>Password</label>
          <input className="input" type="password" defaultValue="password1" />
        </div>
        <button className="btn block" style={{ padding: 22, fontSize: 18 }}>Sign in</button>
        <div className="row between" style={{ marginTop: 22 }}>
          <a className="link" href="#">Forgot password?</a>
          <span className="muted">Locks after 5 tries</span>
        </div>
      </form>

      <div className="otp-card">
        <div className="row between">
          <b style={{ fontSize: 20 }}>Email OTP</b>
          <span className="pill grey nodot">Optional · set by admin</span>
        </div>
        <p className="muted" style={{ margin: '12px 0 0', fontSize: 17 }}>
          6-digit code sent to ra****@mahalaxmicoop.in · valid 5 minutes
        </p>
        <div className="otp-boxes">
          {otp.map((d, i) => (
            <input key={i} value={d} inputMode="numeric" onChange={(e) => setDigit(i, e.target.value)} />
          ))}
        </div>
        <div className="row between muted">
          <span>Resend in 0:24</span>
          <span>3 attempts left</span>
        </div>
      </div>
      <div className="powered">Powered by Crinsun Technologies</div>
      </div>
    </div>
  );
}
