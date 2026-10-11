"use client";

import Link from "next/link";
<<<<<<< HEAD
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
=======
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
>>>>>>> origin/develop

type Role = "ADMIN" | "AGENT" | "CUSTOMER";

export function Nav() {
  const router = useRouter();
  const pathname = usePathname();
<<<<<<< HEAD
=======

>>>>>>> origin/develop
  const [role, setRole] = useState<Role | null>(null);
  const [checked, setChecked] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) return null;

        const data = await response.json();
        return data.session?.role as Role | undefined;
      })
      .then((value) => setRole(value ?? null))
      .catch(() => setRole(null))
      .finally(() => setChecked(true));
  }, [pathname]);
<<<<<<< HEAD

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
=======
>>>>>>> origin/develop

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });

    setRole(null);
    setOpenDropdown(null);
    router.push("/login");
    router.refresh();
  }

<<<<<<< HEAD
  function toggleDropdown(name: string) {
    setOpenDropdown(prev => (prev === name ? null : name));
  }

  const isPublicPage = pathname === "/" || pathname === "/login";
  const brandHref = role === "ADMIN" ? "/admin" : role === "AGENT" ? "/agent" : role === "CUSTOMER" ? "/customer" : "/login";

  return (
    <header className="nav" ref={navRef}>
      <div className="nav-inner">
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link href={brandHref} className="brand" onClick={() => setOpenDropdown(null)}>
            B-Trust MIMS
          </Link>

          {role && !isPublicPage && (
            <nav className="nav-links">

              {/* Admin & Agent Grouped Menus */}
              {(role === "ADMIN" || role === "AGENT") && (
                <>
                  {/* Directory Dropdown */}
                  <div className="nav-dropdown">
                    <button
                      type="button"
                      className="nav-dropdown-btn"
                      onClick={() => toggleDropdown("directory")}
                      aria-expanded={openDropdown === "directory"}
                    >
                      Directory ▾
                    </button>
                    {openDropdown === "directory" && (
                      <div className="nav-dropdown-menu">
                        <Link href="/customers" onClick={() => setOpenDropdown(null)}>
                          Customers
                        </Link>
                        <Link href="/accounts" onClick={() => setOpenDropdown(null)}>
                          Accounts
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Operations Dropdown */}
                  <div className="nav-dropdown">
                    <button
                      type="button"
                      className="nav-dropdown-btn"
                      onClick={() => toggleDropdown("operations")}
                      aria-expanded={openDropdown === "operations"}
                    >
                      Operations ▾
                    </button>
                    {openDropdown === "operations" && (
                      <div className="nav-dropdown-menu">
                        <Link href="/transactions" onClick={() => setOpenDropdown(null)}>
                          Transactions
                        </Link>
                        <Link href="/fixed-deposits" onClick={() => setOpenDropdown(null)}>
                          Fixed Deposits
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Standalone Reports Link */}
                  <Link href="/reports" onClick={() => setOpenDropdown(null)}>
                    Reports
                  </Link>
                </>
              )}

              {/* Customer Links */}
              {role === "CUSTOMER" && (
                <>
                  <Link href="/accounts" onClick={() => setOpenDropdown(null)}>
                    My accounts
                  </Link>
                  <Link href="/transactions" onClick={() => setOpenDropdown(null)}>
                    My transactions
                  </Link>
                </>
              )}
            </nav>
          )}
        </div>

        {/* Right-Aligned Profile / Logout or Login */}
        <div className="nav-profile">
          {checked && !role && (
            <Link href="/login" className="btn">
              Login
            </Link>
          )}
          {role && (
            <>
              <span className="nav-role-badge">{role}</span>
              <button className="btn secondary" type="button" onClick={signOut}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

=======
  const links =
    role === "ADMIN"
      ? [
          ["Admin", "/admin"],
          ["Customers", "/customers"],
          ["Accounts", "/accounts"],
          ["Transactions", "/transactions"],
          ["Reports", "/reports"],
        ]
      : role === "AGENT"
        ? [
            ["Agent", "/agent"],
            ["Customers", "/customers"],
            ["Accounts", "/accounts"],
            ["Transactions", "/transactions"],
            ["Fixed Deposits", "/fixed-deposits"],
            ["Reports", "/reports"],
          ]
        : role === "CUSTOMER"
          ? [
              ["My dashboard", "/customer"],
              ["My accounts", "/accounts"],
              ["My transactions", "/transactions"],
            ]
          : [];

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" className="brand">
          B-Trust MIMS
        </Link>

        <nav className="nav-links">
          {checked && !role && <Link href="/login">Login</Link>}

          {links.map(([label, href]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}

          {role && (
            <button
              className="btn secondary"
              type="button"
              onClick={signOut}
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
>>>>>>> origin/develop
