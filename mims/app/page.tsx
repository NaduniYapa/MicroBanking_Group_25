import Link from "next/link";

export default function Home() {
  return (
<<<<<<< HEAD
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f8fafc",
        padding: "24px 16px",
      }}
    >
      <style>{`
        @keyframes splashFadeInUp {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .splash-card {
          animation: splashFadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          max-width: 540px;
          width: 100%;
          border-top: 4px solid #0056b3;
          background: #ffffff;
          text-align: center;
          padding: 44px 36px;
        }
        .splash-btn {
          display: inline-block;
          width: 100%;
          padding: 13px 24px;
          font-size: 15px;
          letter-spacing: 0.2px;
          text-decoration: none;
          transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .splash-btn:hover {
          background-color: #0f2c42;
          transform: scale(1.02);
          box-shadow: 0 6px 18px rgba(15, 44, 66, 0.22);
        }
      `}</style>

      {/* Spacer to balance vertical centering with footer */}
      <div style={{ flex: "0 0 auto", height: "1px" }} />

      {/* Central Focal Card */}
      <div className="card splash-card">
        <h1
          style={{
            margin: "0 0 14px",
            fontSize: "28px",
            fontWeight: 800,
            color: "#173f5f",
            letterSpacing: "-0.5px",
          }}
        >
          B-Trust Microfinance
        </h1>
        <p
          className="muted"
          style={{
            margin: "0 0 32px",
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          Core Banking &amp; Interest Management System. Secure internal portal for
          authorized banking agents and administrative personnel.
        </p>
        <div>
          <Link className="btn splash-btn" href="/login">
            Access Secure Workspace
          </Link>
        </div>
      </div>

      {/* System Footer */}
      <footer
        style={{
          textAlign: "center",
          fontSize: "12px",
          color: "#687386",
          padding: "16px 8px 8px",
          lineHeight: 1.5,
          userSelect: "none",
        }}
      >
        MIMS v1.0 | Authorized Access Only. All transactions are logged and audited.
      </footer>
=======
    <div className="container">
      <section className="hero">
        <div className="hero-eyebrow">SECURE BANKING OPERATIONS PLATFORM</div>
        <h1>B-Trust Microbanking & Interest Management System</h1>
        <p>
          A role-based banking workspace for customer management, savings accounts,
          transactions, fixed deposits, interest processing, and reporting.
        </p>
        <div className="hero-actions"><Link className="btn hero-btn" href="/login">Sign in to workspace</Link></div>
      </section>

      <div className="grid grid-3">
        <div className="card feature-card">
          <div className="feature-number">01</div>
          <h3>Customer & accounts</h3>
          <p className="muted">Register customers, open individual or joint savings accounts, and keep account holders connected to the correct records.</p>
        </div>
        <div className="card feature-card">
          <div className="feature-number">02</div>
          <h3>Controlled transactions</h3>
          <p className="muted">Deposits and withdrawals use database transactions, validation, and balance rules for reliable processing.</p>
        </div>
        <div className="card feature-card">
          <div className="feature-number">03</div>
          <h3>Fixed deposits & reports</h3>
          <p className="muted">Track fixed deposits, process monthly interest, and use live database reports for operational decisions.</p>
        </div>
      </div>

      <div className="card access-card">
        <div>
          <span className="access-label">ROLE-BASED ACCESS</span>
          <h2>One secure sign-in, the right workspace.</h2>
          <p className="muted">Agents manage customers and accounts. Customers can view only their own financial records. Administrators access oversight and reporting.</p>
        </div>
        <Link className="btn" href="/login">Continue to sign in</Link>
      </div>
>>>>>>> origin/develop
    </div>
  );
}

