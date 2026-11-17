import { useNavigate } from "@tanstack/react-router";
import { Laptop, Lock, LogOut, ShieldCheck, Smartphone, Tablet, Unlock, X } from "lucide-react";
import { useState } from "react";
import { useProfile, type DeviceMode } from "@/lib/profile-context";
import { cn } from "@/lib/utils";

export function GuardianDrawer() {
  const {
    guardianDrawerOpen,
    setGuardianDrawerOpen,
    guardianUnlocked,
    unlockGuardian,
    lockGuardian,
    deviceMode,
    setDeviceMode,
    signedIn,
    userName,
    role,
    signOut,
    t,
  } = useProfile();

  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  if (!guardianDrawerOpen) return null;

  const devices: { id: DeviceMode; label: string; Icon: typeof Laptop }[] = [
    { id: "laptop", label: t.guardian.laptop, Icon: Laptop },
    { id: "tablet", label: t.guardian.tablet, Icon: Tablet },
    { id: "mobile", label: t.guardian.mobile, Icon: Smartphone },
  ];

  const roleText =
    role === "child"
      ? t.roles.child.shortLabel
      : role === "parent"
        ? t.roles.parent.shortLabel
        : role === "educator"
          ? t.roles.educator.shortLabel
          : "";

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    const ok = unlockGuardian(pin);
    if (ok) {
      setPin("");
      setPinError(false);
    } else {
      setPinError(true);
    }
  }

  function handlePinDigit(digit: string) {
    const next = (pin + digit).slice(0, 4);
    setPin(next);
    setPinError(false);
    if (next.length === 4 && unlockGuardian(next)) {
      setPin("");
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.guardian.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
    >
      <div className="w-full max-w-md rounded-[2rem] border bg-card p-6 text-card-foreground shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {guardianUnlocked ? (
              <Unlock className="h-5 w-5 text-accent-foreground" aria-hidden="true" />
            ) : (
              <Lock className="h-5 w-5 text-primary-strong" aria-hidden="true" />
            )}
            <h2 className="text-xl font-bold">{t.guardian.title}</h2>
          </div>
          <button
            type="button"
            onClick={() => setGuardianDrawerOpen(false)}
            aria-label="Close"
            className="rounded-xl p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {!guardianUnlocked ? (
          <form onSubmit={handleUnlock} className="mt-5 space-y-4">
            <p className="text-sm text-muted-foreground">{t.guardian.prompt}</p>

            <div>
              <label htmlFor="guardian-pin" className="sr-only">
                PIN
              </label>
              <input
                id="guardian-pin"
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={pin}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                  setPin(val);
                  setPinError(false);
                }}
                placeholder="••••"
                className="w-full rounded-2xl border bg-background px-4 py-3 text-center font-display text-2xl font-bold tracking-[0.5em] text-foreground"
              />
              {pinError && (
                <p className="mt-1.5 text-center text-xs font-bold text-destructive">
                  {t.guardian.wrongPin}
                </p>
              )}
              <p className="mt-1.5 text-center text-xs text-muted-foreground">
                {t.guardian.demoPin}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "Clear", "0", "Unlock"].map((key) => (
                <button
                  key={key}
                  type={key === "Unlock" ? "submit" : "button"}
                  onClick={() => {
                    if (key === "Clear") {
                      setPin("");
                      setPinError(false);
                    } else if (key !== "Unlock") {
                      handlePinDigit(key);
                    }
                  }}
                  className={cn(
                    "rounded-xl py-2.5 text-sm font-bold transition-colors",
                    key === "Unlock"
                      ? "bg-primary-strong text-secondary-foreground"
                      : "border bg-background text-foreground hover:bg-muted",
                  )}
                >
                  {key === "Clear" ? t.guardian.clear : key === "Unlock" ? t.guardian.unlock : key}
                </button>
              ))}
            </div>
          </form>
        ) : (
          <div className="mt-5 space-y-5">
            {/* Screen Layout Mode: Laptop / Tablet / Mobile */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t.guardian.screenLayout}
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {devices.map(({ id, label, Icon }) => {
                  const active = deviceMode === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setDeviceMode(id)}
                      className={cn(
                        "flex items-center justify-center gap-1.5 rounded-xl border-2 px-3 py-2.5 text-xs font-bold transition-colors",
                        active
                          ? "border-primary-strong bg-primary/25 text-foreground"
                          : "border-border bg-background text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Account Switch */}
            <div className="space-y-2 border-t pt-4">
              {signedIn && (
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    void navigate({ to: "/signin" });
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border bg-background px-4 py-2.5 text-sm font-bold text-foreground hover:border-primary-strong"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  <span>
                    {userName ? `${userName} (${roleText})` : roleText} · {t.nav.logOut}
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  lockGuardian();
                  setGuardianDrawerOpen(false);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground"
              >
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                <span>{t.guardian.lockReturn}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
