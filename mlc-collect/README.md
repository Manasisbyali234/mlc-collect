# MLC – Maha Laxmi Collect · React front end (MERN "M-E-R-N" → the R + N part)

UI only, matching the Crinsun mockups (colours, fonts, tabs, layouts). Data is placeholder
text inside the screen files; replace it with your Express/MongoDB API calls.

## Run

```bash
cd client
npm install
npm run dev        # http://localhost:5173
```

## Routes

| URL | Screen |
|---|---|
| `/` | Launcher |
| `/login` | Sign in + Email OTP |
| `/app` | Collector Home |
| `/app/collect` | Today's collection list |
| `/app/customers` | Customer (CIF) profile |
| `/app/record` | Record collection |
| `/app/loan` | Loan account |
| `/app/deposit` | Deposit to society |
| `/app/targets` | My targets |
| `/admin` | Dashboard |
| `/admin/customers` | Customer profile (CIF) |
| `/admin/loans` | Open a loan account |
| `/admin/collections` | Collection grid |
| `/admin/deposits` | Deposit verification |
| `/admin/targets` | Collector targets |
| `/admin/alerts` | Red alert accounts |
| `/admin/settings` | Users, roles and settings |

## Files

- `src/styles.css` – all colours (CSS variables at the top), fonts, layout
- `src/collector/Screens.jsx` – the 7 phone screens
- `src/admin/Screens.jsx` – the 8 desktop screens
- `src/Login.jsx`, `src/App.jsx` – login and routing
