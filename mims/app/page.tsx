import Link from "next/link";

export default function Home() {
  return (
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
    </div>
  );
}

