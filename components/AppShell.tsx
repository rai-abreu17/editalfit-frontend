"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "./Brand";
import { NAV } from "@/lib/nav";
import { CURRENT_USER } from "@/lib/data";
import { IconBell, IconMenu, IconPlus, IconSearch } from "./icons";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <div className={`shell ${open ? "drawer-open" : ""}`}>
      <div className="scrim" onClick={() => setOpen(false)} aria-hidden="true" />

      <aside className="sidebar">
        <Link href="/inicio" className="sidebar__brand" aria-label="EditalFit — início">
          <span className="brandmark" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/editalfit-logo.png" alt="" />
          </span>
          EditalFit
        </Link>

        <Link
          href="/novo-projeto"
          className="btn btn--primary"
          style={{ justifyContent: "flex-start", gap: 10, paddingRight: 18 }}
          onClick={() => setOpen(false)}
        >
          <IconPlus width={16} height={16} />
          Novo projeto
        </Link>

        <nav className="sidebar__nav" aria-label="Navegação principal">
          <div className="sidebar__label">Menu</div>
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${isActive(item.href) ? "active" : ""}`}
                onClick={() => setOpen(false)}
              >
                <Icon width={18} height={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar__foot">
          <Link href="/configuracoes" className="nav-item" onClick={() => setOpen(false)}>
            <span className="avatar" style={{ width: 32, height: 32, fontSize: 12 }}>
              {CURRENT_USER.initials}
            </span>
            <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <span style={{ fontWeight: 700, color: "var(--ink-900)", fontSize: 13.5 }}>{CURRENT_USER.name}</span>
              <span style={{ fontSize: 11.5, color: "var(--ink-500)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {CURRENT_USER.email}
              </span>
            </span>
          </Link>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <button className="topbar__menu" type="button" aria-label="Abrir menu" onClick={() => setOpen(true)}>
            <IconMenu />
          </button>
          <div className="topbar__search">
            <IconSearch />
            <input type="search" placeholder="Buscar editais, projetos…" aria-label="Buscar" />
          </div>
          <div className="topbar__spacer" />
          <button className="icon-btn" type="button" aria-label="Notificações">
            <IconBell />
            <span className="dot" aria-hidden="true" />
          </button>
          <Link href="/configuracoes" className="avatar" aria-label="Sua conta">
            {CURRENT_USER.initials}
          </Link>
        </header>

        <main className="content">{children}</main>

        <nav className="bottom-nav" aria-label="Navegação">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className={`bottom-nav__item ${isActive(item.href) ? "active" : ""}`}>
                <Icon width={20} height={20} />
                {item.short}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
