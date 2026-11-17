import { CheckCircle2, Mail, Pencil, ShieldCheck, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";
import { useProfile } from "@/lib/profile-context";

function normalizePairKey(v: string): string {
  return v.trim().toLowerCase().replace(/\s+/g, " ");
}

export function ParentNotificationSetup() {
  const { userName, parentRegistrations, registerParentChildEmail, removeParentRegistration, t } =
    useProfile();

  const copy = t.home.parentEmail;
  const activeParentName = userName.trim() || "Parent";

  const [childName, setChildName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const matchingPair = childName.trim()
    ? parentRegistrations.find(
        (r) =>
          normalizePairKey(r.parentName) === normalizePairKey(activeParentName) &&
          normalizePairKey(r.childName) === normalizePairKey(childName),
      )
    : undefined;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = registerParentChildEmail(childName, email, activeParentName);
    if (!res.ok || !res.registration) {
      setFeedback({ type: "err", text: copy.invalidEmail });
      return;
    }
    setFeedback({
      type: "ok",
      text:
        res.mode === "updated"
          ? copy.updatedNotice(res.registration.childName, res.registration.email)
          : copy.savedNotice(res.registration.childName, res.registration.email),
    });
    setChildName("");
    setEmail("");
  }

  function handleEdit(child: string, currentEmail: string) {
    setChildName(child);
    setEmail(currentEmail);
    setFeedback(null);
  }

  return (
    <section
      aria-label={copy.title}
      className="rounded-[2rem] border bg-card p-6 shadow-[var(--shadow-soft)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/30 text-primary-strong">
            <Mail className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{copy.title}</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">{copy.subtitle}</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-xl border border-accent-foreground/25 bg-accent/25 px-3 py-1.5 text-xs font-bold text-accent-foreground">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{copy.ruleBadge}</span>
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-5 grid gap-3 sm:grid-cols-[1fr_1.2fr_auto] sm:items-end"
      >
        <div>
          <label
            htmlFor="parent-child-name"
            className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
          >
            {copy.childNameLabel}
          </label>
          <input
            id="parent-child-name"
            type="text"
            required
            value={childName}
            onChange={(e) => {
              setChildName(e.target.value);
              setFeedback(null);
            }}
            placeholder={copy.childNamePlaceholder}
            className="mt-1.5 w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm text-foreground"
          />
        </div>

        <div>
          <label
            htmlFor="parent-notify-email"
            className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
          >
            {copy.emailLabel}
          </label>
          <input
            id="parent-notify-email"
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFeedback(null);
            }}
            placeholder={copy.emailPlaceholder}
            className="mt-1.5 w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm text-foreground"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 rounded-xl bg-primary-strong px-5 py-2.5 text-sm font-bold text-secondary-foreground transition-opacity hover:opacity-90"
        >
          <UserPlus className="h-4 w-4" aria-hidden="true" />
          <span>{matchingPair ? copy.updateBtn : copy.registerBtn}</span>
        </button>
      </form>

      {matchingPair && (
        <p className="mt-2.5 text-xs font-semibold text-secondary">
          {copy.pairExistsHint(matchingPair.childName, matchingPair.email)}
        </p>
      )}

      {feedback && (
        <div
          role="status"
          className={
            feedback.type === "ok"
              ? "mt-3 flex items-center gap-2 rounded-xl border border-accent-foreground/30 bg-accent/25 px-3.5 py-2.5 text-xs font-bold text-foreground"
              : "mt-3 rounded-xl border border-destructive/40 bg-destructive/15 px-3.5 py-2.5 text-xs font-bold text-destructive"
          }
        >
          {feedback.type === "ok" && (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-foreground" aria-hidden="true" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Registered Parent–Child Pairs */}
      <div className="mt-4">
        {parentRegistrations.length === 0 ? (
          <p className="rounded-2xl border border-dashed bg-background px-4 py-3 text-xs text-muted-foreground">
            {copy.noPairsYet}
          </p>
        ) : (
          <div className="grid gap-2.5 sm:grid-cols-2">
            {parentRegistrations.map((reg) => (
              <div
                key={reg.id}
                className="flex items-center justify-between gap-3 rounded-2xl border bg-background px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-foreground">
                    {reg.childName}{" "}
                    <span className="font-normal text-muted-foreground">↔ {reg.parentName}</span>
                  </p>
                  <p className="truncate text-xs font-semibold text-primary-strong">{reg.email}</p>
                  <p className="mt-0.5 text-[11px] font-semibold text-accent-foreground">
                    {copy.activeNoVerify} · {reg.registeredAt}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleEdit(reg.childName, reg.email)}
                    aria-label={`${copy.editBtn} ${reg.childName}`}
                    className="rounded-lg border bg-card p-2 text-muted-foreground hover:border-primary-strong hover:text-foreground"
                  >
                    <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeParentRegistration(reg.id)}
                    aria-label={`${copy.removeBtn} ${reg.childName}`}
                    className="rounded-lg border bg-card p-2 text-muted-foreground hover:border-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
