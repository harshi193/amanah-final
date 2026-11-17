import { Link } from "@tanstack/react-router";
import { Check, Flame, Sparkles } from "lucide-react";
import { useId, useState } from "react";
import { useProfile } from "@/lib/profile-context";
import { cn } from "@/lib/utils";

export function AmanahLogo({ className = "h-9 w-9" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `amanah-arc-${uid}`;

  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="8" y1="54" x2="56" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--secondary)" />
          <stop offset="55%" stopColor="var(--primary-strong)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      {/* Protective Vision 2030 horizon arc */}
      <circle cx="32" cy="32" r="27" className="fill-card" />
      <circle
        cx="32"
        cy="32"
        r="26"
        stroke={`url(#${gradId})`}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="132 34"
        transform="rotate(-24 32 32)"
      />
      {/* Soaring dove silhouette */}
      <path
        d="M15 39c5-12 15-18 26-15 5 1 9 4 11 9 2-1 5-1 7 1-2 3-4 4-7 5-2 9-10 15-20 15-9 0-15-5-17-15z"
        className="fill-background stroke-foreground"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      {/* Uplifted sage wing */}
      <path
        d="M27 26c-5-6-3-14 4-17 2 6 5 11 10 13"
        className="fill-accent stroke-foreground"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Golden olive leaf */}
      <path
        d="M46 38c4-2 8-2 11 1-3 3-7 5-11 3"
        className="fill-gold stroke-foreground"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="44" cy="29.5" r="1.8" className="fill-foreground" />
    </svg>
  );
}

export type DoveMood = "happy" | "calm" | "cheering" | "listening" | "thinking" | "offline";

export function DoveMascot({
  mood = "happy",
  size = "md",
  speech,
  interactive = false,
  onClick,
  className,
}: {
  mood?: DoveMood;
  size?: "sm" | "md" | "lg";
  speech?: string;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const [wink, setWink] = useState(false);
  const dims = size === "sm" ? "h-14 w-14" : size === "lg" ? "h-36 w-36" : "h-24 w-24";

  const handleTap = () => {
    setWink(true);
    setTimeout(() => setWink(false), 600);
    onClick?.();
  };

  const isButton = Boolean(interactive || onClick);

  const svg = (
    <svg viewBox="0 0 120 120" fill="none" className={cn(dims, "dove-float")} aria-hidden="true">
      <circle
        cx="60"
        cy="64"
        r="48"
        className={cn(
          mood === "cheering"
            ? "fill-gold/30"
            : mood === "calm"
              ? "fill-secondary/25"
              : mood === "offline"
                ? "fill-accent/35"
                : "fill-primary/35",
        )}
      />
      <path
        d="M22 76c-6-4-10-12-8-18 8 2 14 7 18 14"
        className="fill-card stroke-foreground"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 68c0-22 16-38 36-38 15 0 28 10 31 24 2 10 0 22-8 30-7 8-19 13-31 13-18 0-28-12-28-29z"
        className="fill-card stroke-foreground"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M46 76c0-10 8-17 19-17 9 0 16 6 18 15-4 10-12 16-22 16-9 0-15-6-15-14z"
        className="fill-primary/30"
      />
      <g className="dove-wing">
        <path
          d={
            mood === "cheering"
              ? "M44 58c-14-14-12-30 2-36 6 12 12 22 20 29"
              : "M42 62c-12-8-14-24-2-32 6 10 13 18 22 24"
          }
          className="fill-accent stroke-foreground"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path
        d="M89 60c8 1 15 4 21 9"
        className="stroke-accent-foreground"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <ellipse
        cx="101"
        cy="59"
        rx="5"
        ry="3"
        transform="rotate(-22 101 59)"
        className="fill-accent stroke-foreground"
        strokeWidth="2"
      />
      <ellipse
        cx="108"
        cy="66"
        rx="5"
        ry="3"
        transform="rotate(14 108 66)"
        className="fill-accent stroke-foreground"
        strokeWidth="2"
      />
      {mood === "calm" || wink ? (
        <>
          <path
            d="M62 50c2 3 6 3 8 0"
            className="stroke-foreground"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M77 50c2 3 6 3 8 0"
            className="stroke-foreground"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <circle cx="65" cy="49" r="5" className="fill-foreground" />
          <circle cx="66.5" cy="47.5" r="1.7" className="fill-card" />
          <circle cx="81" cy="49" r="5" className="fill-foreground" />
          <circle cx="82.5" cy="47.5" r="1.7" className="fill-card" />
        </>
      )}
      <ellipse cx="57" cy="56" rx="4.5" ry="2.6" className="fill-primary/70" />
      <ellipse cx="87" cy="56" rx="4.5" ry="2.6" className="fill-primary/70" />
      <path
        d="M72 54l8 3-7 5-3-4 2-4z"
        className="fill-gold stroke-foreground"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M54 96v7m14-7v7"
        className="stroke-gold-foreground"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      {isButton ? (
        <button
          type="button"
          onClick={handleTap}
          aria-label="Noor the dove companion"
          className="relative shrink-0 cursor-pointer rounded-full transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          {svg}
        </button>
      ) : (
        <span className="relative inline-flex shrink-0 rounded-full">{svg}</span>
      )}

      {speech && (
        <div className="relative max-w-xs rounded-2xl border bg-card px-4 py-3 text-sm font-medium text-card-foreground shadow-[var(--shadow-soft)]">
          {speech}
        </div>
      )}
    </div>
  );
}

export function ProgressPath({ compact = false }: { compact?: boolean }) {
  const { xp, streak, level, levelTitle, nextLevelXp, completedSteps, t } = useProfile();
  const levelProgress = Math.min(100, Math.round(((xp % 100) / 100) * 100));
  const steps = t.progress.steps;

  return (
    <section
      aria-label={t.progress.journeyTitle}
      className="rounded-[2rem] border bg-card p-6 shadow-[var(--shadow-soft)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <DoveMascot
            mood={completedSteps.length >= 3 ? "cheering" : "happy"}
            size="sm"
            interactive
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t.progress.levelLabel(level, levelTitle)}
            </p>
            <h3 className="text-xl font-bold">{t.progress.journeyTitle}</h3>
          </div>
        </div>

        <div className="flex items-center gap-5 tabular-nums">
          <div className="flex items-center gap-1.5 text-sm font-bold text-gold-foreground">
            <Flame className="h-4 w-4 text-gold" aria-hidden="true" />
            <span>{t.progress.dayStreak(streak)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-bold text-primary-strong">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>{xp} XP</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex justify-between text-xs font-medium text-muted-foreground tabular-nums">
          <span>{t.progress.progressTo(Math.min(5, level + 1))}</span>
          <span>
            {xp} / {nextLevelXp} XP
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={levelProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-3.5 w-full overflow-hidden rounded-full bg-muted"
        >
          <div
            className="h-full rounded-full bg-accent transition-transform duration-300"
            style={{ width: `${Math.max(10, levelProgress)}%` }}
          />
        </div>
      </div>

      {!compact && (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {steps.map((step, index) => {
            const done = completedSteps.includes(step.id);
            const isNext =
              !done && (index === 0 || completedSteps.includes(steps[index - 1]?.id ?? ""));
            return (
              <Link
                key={step.id}
                to={step.to}
                className={cn(
                  "group relative flex flex-col items-center rounded-2xl border-2 p-4 text-center transition-transform duration-200 hover:-translate-y-0.5",
                  done
                    ? "border-accent bg-accent/25 text-foreground"
                    : isNext
                      ? "border-primary-strong bg-primary/25 text-foreground"
                      : "border-border bg-background/60 text-muted-foreground",
                )}
              >
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full border-2 text-sm font-bold tabular-nums",
                    done
                      ? "border-accent-foreground bg-accent text-accent-foreground"
                      : isNext
                        ? "border-primary-strong bg-primary-strong text-secondary-foreground"
                        : "border-border bg-card text-muted-foreground",
                  )}
                >
                  {done ? <Check className="h-5 w-5" aria-hidden="true" /> : index + 1}
                </div>
                <span className="mt-2.5 text-sm font-bold leading-snug">{step.label}</span>
                <span className="mt-0.5 text-xs text-muted-foreground tabular-nums">
                  {done ? t.progress.completed : `${step.xp} XP`}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
