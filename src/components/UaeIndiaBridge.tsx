import { useState } from "react";
import { ArrowRight, CheckCircle2, HeartHandshake, Sparkles } from "lucide-react";
import { useProfile } from "@/lib/profile-context";
import { cn } from "@/lib/utils";

export function UaeIndiaBridge({ compact = false }: { compact?: boolean }) {
  const { t } = useProfile();
  const pairs = t.bridge.pairs;
  const [activeId, setActiveId] = useState(pairs[0]!.id);
  const current = pairs.find((p) => p.id === activeId) ?? pairs[0]!;

  return (
    <section
      aria-label={t.bridge.heading}
      className="rounded-[2rem] border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-secondary">
            {t.bridge.eyebrow}
          </p>
          <h2 className="mt-1 text-2xl font-bold sm:text-3xl">{t.bridge.heading}</h2>
        </div>

        <div className="flex flex-wrap gap-1.5 rounded-xl bg-muted p-1" role="tablist">
          {pairs.map((pair) => (
            <button
              key={pair.id}
              type="button"
              role="tab"
              aria-selected={pair.id === current.id}
              onClick={() => setActiveId(pair.id)}
              className={cn(
                "whitespace-nowrap shrink-0 rounded-lg px-3.5 py-2 text-xs font-bold transition-colors duration-200",
                pair.id === current.id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {pair.label}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Pairing Bridge */}
      <div className="mt-6 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <div className="flex flex-col justify-between rounded-2xl border bg-background p-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
              {t.bridge.uaeHeading}
            </span>
            <h3 className="mt-1.5 text-lg font-bold">{current.uaeTitle}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{current.uaeDetail}</p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-foreground">
            <CheckCircle2 className="h-4 w-4 text-accent-foreground" aria-hidden="true" />
            <span>{t.bridge.uaeBadge}</span>
          </div>
        </div>

        <div className="flex items-center justify-center py-1">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-primary/40 text-primary-strong">
            <HeartHandshake className="h-6 w-6" aria-hidden="true" />
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border bg-background p-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent-foreground">
              {t.bridge.indiaHeading}
            </span>
            <h3 className="mt-1.5 text-lg font-bold">{current.indiaTitle}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{current.indiaDetail}</p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-foreground">
            <Sparkles className="h-4 w-4 text-primary-strong" aria-hidden="true" />
            <span>{t.bridge.indiaBadge}</span>
          </div>
        </div>
      </div>

      {/* Combined Stronger Result + Measured Benefit */}
      <div className="mt-5 grid gap-5 rounded-2xl border bg-accent/25 p-5 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-accent-foreground">
            {t.bridge.combinedPrefix} · {current.sdgTarget}
          </p>
          <p className="mt-2 text-base font-semibold leading-relaxed text-foreground">
            {current.combinedOutcome}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-xl border bg-card p-4">
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-display text-3xl font-bold text-primary-strong tabular-nums">
              {current.metricValue}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-accent-foreground">
              {t.bridge.sdgImpact}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-foreground">{current.metricLabel}</p>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-secondary transition-all duration-300"
              style={{ width: `${current.fillPercent}%` }}
            />
          </div>
          {!compact && (
            <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowRight className="h-3.5 w-3.5 shrink-0 rtl:rotate-180" aria-hidden="true" />
              <span>{current.baselineNote}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
