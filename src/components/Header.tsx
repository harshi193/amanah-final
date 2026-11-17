import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, LogIn, LogOut, Menu, SlidersHorizontal, UserCheck, X } from "lucide-react";
import { useState } from "react";
import { AmanahLogo } from "@/components/BrandAndDove";
import { EducatorStudentManager } from "@/components/EducatorStudentManager";
import { useProfile } from "@/lib/profile-context";
import { ROLES } from "@/lib/profiles";
import { ConditionPicker, RolePicker } from "./Selector";

export function Header() {
  const {
    signedIn,
    userName,
    role,
    setRole,
    signOut,
    conditions,
    unreadAlertsCount,
    activeStudent,
    t,
  } = useProfile();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const canManageNeeds = signedIn && (role === "parent" || role === "educator");
  const roleShort = role ? t.roles[role].shortLabel : "";

  function handleLogout() {
    setDrawerOpen(false);
    setMobileMenuOpen(false);
    signOut();
    void navigate({ to: "/signin" });
  }

  const navItems = [
    { to: "/", label: t.nav.home },
    { to: "/about", label: t.nav.about },
    { to: "/studio", label: t.nav.studio },
    { to: "/partnership", label: t.nav.partnership },
    { to: "/chat", label: t.nav.chat },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3">
        {/* Zone 1: Brand mark & wordmark */}
        <Link
          to={signedIn ? "/" : "/signin"}
          className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 font-display text-2xl font-bold text-primary-strong"
        >
          <AmanahLogo className="h-9 w-9" />
          <span>{t.brand}</span>
        </Link>

        {/* Zone 2: Clean navigation links */}
        {signedIn && (
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            {navItems.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: to === "/" }}
                className="whitespace-nowrap shrink-0 border-b-2 border-transparent py-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{
                  className: "border-primary-strong text-foreground",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}

        {/* Zone 3: Auth + Primary action + Parent Alert / Active Student badge */}
        <div className="flex items-center gap-2 shrink-0">
          {signedIn && role === "educator" && (
            <button
              type="button"
              onClick={() => setDrawerOpen((o) => !o)}
              className="hidden items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xl border border-accent bg-accent/20 px-3 py-2 text-xs font-bold text-foreground lg:inline-flex"
            >
              <UserCheck className="h-3.5 w-3.5 text-accent-foreground" aria-hidden="true" />
              <span>
                {activeStudent
                  ? t.home.educatorRoster.sessionBanner(activeStudent.name)
                  : t.home.educatorRoster.noActiveTitle}
              </span>
            </button>
          )}

          {signedIn && role === "parent" && unreadAlertsCount > 0 && (
            <Link
              to="/"
              aria-label={`${unreadAlertsCount} ${t.nav.alertSingular}`}
              className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xl border border-gold bg-gold/25 px-3 py-2 text-xs font-bold text-foreground"
            >
              <Bell className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="tabular-nums">
                {unreadAlertsCount} {t.nav.alertSingular}
              </span>
            </Link>
          )}

          {canManageNeeds ? (
            <button
              type="button"
              onClick={() => setDrawerOpen((o) => !o)}
              aria-expanded={drawerOpen}
              className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-xl bg-primary-strong px-4 py-2 text-sm font-bold text-secondary-foreground transition-opacity hover:opacity-90"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              <span>
                {conditions.length ? t.nav.needsCount(conditions.length) : t.nav.rolesAndNeeds}
              </span>
            </button>
          ) : signedIn ? (
            <Link
              to="/studio"
              className="inline-flex items-center whitespace-nowrap shrink-0 rounded-xl bg-primary-strong px-4 py-2 text-sm font-bold text-secondary-foreground"
            >
              {t.nav.openStudio}
            </Link>
          ) : (
            <Link
              to="/signin"
              className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xl bg-primary-strong px-4 py-2 text-sm font-bold text-secondary-foreground transition-opacity hover:opacity-90"
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
              <span>{t.nav.logIn}</span>
            </Link>
          )}

          {signedIn && (
            <button
              type="button"
              onClick={handleLogout}
              title={userName && roleShort ? t.nav.signedInAs(userName, roleShort) : t.nav.logOut}
              aria-label={t.nav.logOut}
              className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xl border bg-card px-3 py-2 text-sm font-bold text-foreground transition-colors hover:border-primary-strong hover:bg-muted"
            >
              <LogOut className="h-4 w-4 text-primary-strong" aria-hidden="true" />
              <span className="hidden sm:inline">{t.nav.logOut}</span>
            </button>
          )}

          {signedIn && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen((m) => !m)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-card text-foreground md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {signedIn && mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="flex flex-wrap items-center justify-between gap-2 border-t bg-card px-5 py-3 md:hidden"
        >
          <div className="flex flex-wrap gap-2">
            {navItems.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                activeOptions={{ exact: to === "/" }}
                className="whitespace-nowrap shrink-0 rounded-lg px-3 py-1.5 text-sm font-semibold text-muted-foreground hover:bg-muted"
                activeProps={{ className: "bg-primary/35 text-foreground" }}
              >
                {label}
              </Link>
            ))}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xl border bg-background px-3 py-1.5 text-xs font-bold text-foreground hover:border-primary-strong"
          >
            <LogOut className="h-3.5 w-3.5 text-primary-strong" aria-hidden="true" />
            <span>{t.nav.logOut}</span>
          </button>
        </nav>
      )}

      {/* Role & Needs Drawer — Parent & Educator only */}
      {canManageNeeds && drawerOpen && (
        <div className="max-h-[75vh] overflow-y-auto border-t bg-card">
          <div className="mx-auto max-w-6xl space-y-5 px-5 py-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">{t.nav.studentNeedsRole}</h2>
                <p className="text-xs text-muted-foreground">{t.nav.parentEducatorOnly}</p>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="quick-role" className="text-xs font-bold text-muted-foreground">
                  {t.nav.roleLabel}
                </label>
                <select
                  id="quick-role"
                  value={role ?? ""}
                  onChange={(e) => setRole(e.target.value as never)}
                  className="rounded-xl border bg-background px-3 py-1.5 text-sm font-semibold text-foreground"
                >
                  {ROLES.map((r) => (
                    <option key={r.id} value={r.id}>
                      {t.roles[r.id].label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-xl border px-3 py-1.5 text-xs font-bold hover:bg-muted"
                >
                  {t.nav.done}
                </button>
              </div>
            </div>
            {role === "educator" && <EducatorStudentManager compact />}
            <RolePicker compact />
            <ConditionPicker compact />
          </div>
        </div>
      )}
    </header>
  );
}
