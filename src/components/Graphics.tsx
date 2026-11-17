import { AlertCircle, CheckCircle2, Globe2, GraduationCap, HeartPulse } from "lucide-react";
import { useProfile } from "@/lib/profile-context";
import { cn } from "@/lib/utils";

const TOOLKIT_SVGS = [
  <svg key="sos" viewBox="0 0 64 64" fill="none" className="h-11 w-11" aria-hidden="true">
    <circle cx="32" cy="32" r="24" className="fill-secondary/20" />
    <circle
      cx="32"
      cy="32"
      r="16"
      className="fill-primary/45 stroke-primary-strong"
      strokeWidth="2"
    />
    <circle cx="32" cy="32" r="7" className="fill-card stroke-foreground" strokeWidth="2" />
  </svg>,
  <svg key="tap" viewBox="0 0 64 64" fill="none" className="h-11 w-11" aria-hidden="true">
    <rect
      x="10"
      y="14"
      width="28"
      height="36"
      rx="7"
      className="fill-accent/40 stroke-foreground"
      strokeWidth="2"
    />
    <rect
      x="26"
      y="18"
      width="28"
      height="32"
      rx="7"
      className="fill-card stroke-foreground"
      strokeWidth="2"
    />
    <path
      d="M35 34h10m-10-6h12m-12 12h7"
      className="stroke-primary-strong"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>,
  <svg key="ruler" viewBox="0 0 64 64" fill="none" className="h-11 w-11" aria-hidden="true">
    <rect
      x="10"
      y="12"
      width="44"
      height="40"
      rx="8"
      className="fill-card stroke-foreground"
      strokeWidth="2"
    />
    <rect
      x="14"
      y="26"
      width="36"
      height="12"
      rx="4"
      className="fill-primary/40 stroke-primary-strong"
      strokeWidth="2"
    />
    <path
      d="M18 20h20M18 32h28M18 44h22"
      className="stroke-foreground"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>,
  <svg key="offline" viewBox="0 0 64 64" fill="none" className="h-11 w-11" aria-hidden="true">
    <path
      d="M18 44h28a10 10 0 001-20 14 14 0 00-27-3 9 9 0 00-2 23z"
      className="fill-gold/30 stroke-foreground"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path
      d="M27 35l4 4 8-8"
      className="stroke-accent-foreground"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
];

export function SensoryToolkitGraphic() {
  const { t } = useProfile();

  return (
    <section
      aria-label="Sensory toolkit graphics"
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
    >
      {t.toolkit.items.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center gap-3.5 rounded-2xl border bg-card p-4 shadow-[var(--shadow-soft)]"
        >
          <div className="shrink-0">{TOOLKIT_SVGS[idx]}</div>
          <div>
            <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export function ProblemSolutionVisual() {
  const { t } = useProfile();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border bg-background p-5">
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" aria-hidden="true" />
          <h3 className="text-base font-bold text-foreground">{t.problemSolution.problemTitle}</h3>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {t.problemSolution.problems.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border bg-accent/25 p-5">
        <div className="flex items-center gap-2 text-accent-foreground">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          <h3 className="text-base font-bold text-foreground">{t.problemSolution.solutionTitle}</h3>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-foreground">
          {t.problemSolution.solutions.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const SDG_STYLE = [
  {
    percent: 86,
    beforeWidth: "92%",
    afterWidth: "18%",
    ringClass: "stroke-accent-foreground",
    Icon: HeartPulse,
  },
  {
    percent: 82,
    beforeWidth: "32%",
    afterWidth: "85%",
    ringClass: "stroke-primary-strong",
    Icon: GraduationCap,
  },
  {
    percent: 78,
    beforeWidth: "100%",
    afterWidth: "30%",
    ringClass: "stroke-secondary",
    Icon: Globe2,
  },
];

export function SdgImpactVisual() {
  const { t } = useProfile();

  return (
    <section aria-label="SDG 3, 4, and 17 visual impact" className="grid gap-5 md:grid-cols-3">
      {t.sdg.cards.map((item, idx) => {
        const style = SDG_STYLE[idx] ?? SDG_STYLE[0]!;
        const radius = 32;
        const circ = 2 * Math.PI * radius;
        const offset = circ - (style.percent / 100) * circ;
        const Icon = style.Icon;

        return (
          <article
            key={item.number}
            className="flex flex-col justify-between rounded-[2rem] border bg-card p-6 shadow-[var(--shadow-soft)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {item.target}
                </p>
                <h3 className="mt-1 text-xl font-bold">
                  SDG {item.number} · {item.title}
                </h3>
              </div>

              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90" aria-hidden="true">
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    fill="none"
                    strokeWidth="7"
                    className="stroke-muted"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    fill="none"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={offset}
                    className={cn("transition-all duration-500", style.ringClass)}
                  />
                </svg>
                <Icon className="absolute h-5 w-5 text-foreground" aria-hidden="true" />
              </div>
            </div>

            <p className="mt-3 font-display text-3xl font-bold text-primary-strong tabular-nums">
              {item.headlineStat}
            </p>

            <div className="mt-4 space-y-2.5 border-t pt-4 text-xs">
              <div>
                <div className="mb-1 flex justify-between text-muted-foreground">
                  <span>{t.sdg.before}</span>
                  <span>{item.beforeLabel}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-muted-foreground/45"
                    style={{ width: style.beforeWidth }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between font-bold text-foreground">
                  <span>{t.sdg.withAmanah}</span>
                  <span>{item.afterLabel}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: style.afterWidth }}
                  />
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export function Vision2030Graphic() {
  const { t } = useProfile();

  return (
    <section
      aria-label={t.vision.title}
      className="rounded-[2rem] border bg-card p-6 shadow-[var(--shadow-soft)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-bold sm:text-2xl">{t.vision.title}</h2>
        <span className="text-xs font-bold text-secondary">2026 → 2030</span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {t.vision.milestones.map((m) => (
          <div key={m.year} className="rounded-2xl border bg-background p-4">
            <span className="font-display text-2xl font-bold text-primary-strong tabular-nums">
              {m.year}
            </span>
            <h3 className="mt-1 text-base font-bold">{m.title}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{m.sub}</p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-accent" style={{ width: `${m.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
