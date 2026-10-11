"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProcessInterestResponse {
  success: boolean;
  message?: string;
  credits_created?: number;
  total_interest?: number;
}

export function ProcessInterestButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProcessInterestResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleProcessInterest() {
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const response = await fetch("/api/admin/process-interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      setResult({
        success: true,
        message: data.message || "Monthly interest processed successfully.",
        credits_created: Number(data.credits_created ?? 0),
        total_interest: Number(data.total_interest ?? 0),
      });

      // Refresh the page data so server-rendered stats update with fresh database records
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to process monthly interest."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={handleProcessInterest}
          disabled={loading}
          className="btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 22px",
            fontSize: "15px",
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 4px 14px rgba(11, 66, 107, 0.22)",
          }}
        >
          {loading ? (
            <>
              <svg
                className="spin"
                style={{ width: "18px", height: "18px" }}
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="28"
                  strokeLinecap="round"
                />
              </svg>
              <span>Processing Interest...</span>
            </>
          ) : (
            <>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <span>Run Monthly Interest Processing</span>
            </>
          )}
        </button>

        <span className="muted small" style={{ maxWidth: "420px" }}>
          Triggers monthly interest calculation across eligible fixed deposits and credits interest to linked savings accounts.
        </span>
      </div>

      {result && (
        <div
          style={{
            padding: "18px 20px",
            borderRadius: "12px",
            backgroundColor: "#e7f6ef",
            border: "1px solid #b2e3cc",
            color: "#087c53",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            animation: "fadeIn 0.3s ease-out forwards",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "16px" }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#087c53"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Interest Processing Complete</span>
          </div>

          <p style={{ margin: 0, fontSize: "14px", color: "#102a43" }}>
            {result.message}
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "24px",
              marginTop: "4px",
              paddingTop: "12px",
              borderTop: "1px solid rgba(8, 124, 83, 0.2)",
            }}
          >
            <div>
              <div style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: 700, color: "#62738a" }}>
                Credits Created
              </div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "#102a43" }}>
                {result.credits_created?.toLocaleString()}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: 700, color: "#62738a" }}>
                Total Interest Distributed
              </div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "#087c53" }}>
                {result.total_interest?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div
          className="blocked"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            animation: "fadeIn 0.3s ease-out forwards",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
