import { useState } from "react";
import { useProfile } from "@/lib/profile-context";
import { CONDITIONS, GROUPS, ROLES } from "@/lib/profiles";
import { cn } from "@/lib/utils";

export function RolePicker({
  compact = false,
  adultOnly = false,
}: {
  compact?: boolean;
  adultOnly?: boolean;
}) {
  const { role, setRole, t } = useProfile();
  const visibleRoles = adultOnly
    ? ROLES.filter((r) => r.id === "parent" || r.id === "educator")
    : ROLES;

  return (
    <div
      className={cn("grid gap-3", compact ? "grid-cols-2 sm:grid-cols-3" : "sm:grid-cols-2")}
      role="radiogroup"
      aria-label={t.signin.who}
    >
      {visibleRoles.map((r) => {
        const copy = t.roles[r.id];
        return (
          <button
            key={r.id}
            type="button"
            role="radio"
            aria-checked={role === r.id}
            onClick={() => setRole(r.id)}
            className={cn(
              "rounded-2xl border-2 bg-card p-4 text-start transition-colors duration-200 hover:border-primary-strong",
              role === r.id ? "border-primary-strong bg-primary/30" : "border-border",
            )}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl" aria-hidden="true">
                {r.emoji}
              </span>
              <span className="text-base font-bold text-foreground">{copy.label}</span>
            </div>
            {!compact && <p className="mt-1.5 text-sm text-muted-foreground">{copy.blurb}</p>}
          </button>
        );
      })}
    </div>
  );
}

export function ConditionPicker({ compact = false }: { compact?: boolean }) {
  const { conditions, toggle, t } = useProfile();
  const [groupIndex, setGroupIndex] = useState(0);
  const activeGroupIndex = compact ? -1 : groupIndex;
  const visibleIndices = compact ? GROUPS.map((_, idx) => idx) : [groupIndex];

  return (
    <div className="space-y-4">
      {!compact && (
        <div className="flex flex-wrap gap-1.5 rounded-xl bg-muted p-1" role="tablist">
          {GROUPS.map((g, idx) => (
            <button
              key={g}
              type="button"
              role="tab"
              aria-selected={activeGroupIndex === idx}
              onClick={() => setGroupIndex(idx)}
              className={cn(
                "whitespace-nowrap shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors",
                activeGroupIndex === idx
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.conditions.groups[idx] ?? g}
            </button>
          ))}
        </div>
      )}

      {visibleIndices.map((idx) => {
        const g = GROUPS[idx] ?? GROUPS[0];
        const groupLabel = t.conditions.groups[idx] ?? g;
        return (
          <fieldset key={g}>
            <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {groupLabel}
            </legend>
            <div className="flex flex-wrap gap-2">
              {CONDITIONS.filter((c) => c.group === g).map((c) => {
                const on = conditions.includes(c.id);
                const localized = t.conditions.items[c.id] ?? {
                  label: c.label,
                  tools: c.tools,
                };
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(c.id)}
                    title={localized.tools.join(" · ")}
                    className={cn(
                      "whitespace-nowrap shrink-0 rounded-xl border-2 px-3.5 py-2 text-sm font-semibold transition-colors duration-200",
                      on
                        ? "border-primary-strong bg-primary/40 text-foreground"
                        : "border-border bg-background hover:border-primary-strong",
                    )}
                  >
                    {on ? "✓ " : ""}
                    {localized.label}
                  </button>
                );
              })}
            </div>
            {!compact &&
              CONDITIONS.filter((c) => c.group === g && conditions.includes(c.id)).map((c) => {
                const localized = t.conditions.items[c.id] ?? {
                  label: c.label,
                  tools: c.tools,
                };
                return (
                  <p key={c.id} className="mt-2.5 text-sm text-muted-foreground">
                    <strong className="text-foreground">{localized.label}:</strong>{" "}
                    {localized.tools.join(" · ")}
                  </p>
                );
              })}
          </fieldset>
        );
      })}
    </div>
  );
}
