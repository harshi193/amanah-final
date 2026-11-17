import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe2, ShieldCheck, Sparkles } from "lucide-react";
import { AmanahLogo, DoveMascot } from "@/components/BrandAndDove";
import { ProblemSolutionVisual, Vision2030Graphic } from "@/components/Graphics";
import { ScrollReveal } from "@/components/ScrollReveal";
import { UaeIndiaBridge } from "@/components/UaeIndiaBridge";
import { MEDIA } from "@/lib/media";
import { useProfile } from "@/lib/profile-context";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us, Problem & Solution — Amanah" },
      {
        name: "description",
        content:
          "About Amanah: solving fragmented neurodivergent care across UAE and India for Vision 2030 and SDG 3.",
      },
      { property: "og:title", content: "About Amanah" },
      {
        property: "og:description",
        content: "Our problem, solution, and Vision 2030 UAE–India impact.",
      },
    ],
  }),
  component: AboutPage,
});

const PILLAR_ICONS = [
  { Icon: ShieldCheck, color: "text-primary-strong" },
  { Icon: Sparkles, color: "text-accent-foreground" },
  { Icon: Globe2, color: "text-secondary" },
];

function AboutPage() {
  const { t } = useProfile();

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-5 py-8">
      {/* About Us Visual Hero */}
      <ScrollReveal>
        <section className="grid items-stretch gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col justify-center rounded-[2rem] border bg-card p-7 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3">
              <AmanahLogo className="h-10 w-10" />
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                {t.about.eyebrow}
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{t.about.title}</h1>
            <p className="mt-3 text-base text-muted-foreground">{t.about.subtitle}</p>
            <div className="mt-5">
              <DoveMascot mood="happy" size="sm" speech={t.about.doveSpeech} />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border bg-card shadow-[var(--shadow-soft)]">
            <img
              src={MEDIA.aboutUaeSchool}
              alt={t.about.photoCaptionTitle}
              referrerPolicy="no-referrer"
              className="h-64 w-full object-cover lg:h-full"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-wider text-white/85">
                {t.about.photoCaptionTag}
              </p>
              <p className="mt-0.5 text-sm font-semibold">{t.about.photoCaptionTitle}</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Visual Problem vs Solution */}
      <ScrollReveal delayMs={50}>
        <section
          aria-labelledby="problem-solution-heading"
          className="space-y-4 rounded-[2rem] border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-7"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-secondary">
                {t.about.whyExists}
              </p>
              <h2 id="problem-solution-heading" className="mt-0.5 text-2xl font-bold">
                {t.about.problemSolutionTitle}
              </h2>
            </div>
          </div>
          <ProblemSolutionVisual />
        </section>
      </ScrollReveal>

      {/* Bengaluru Network + Core Visual Pillars */}
      <ScrollReveal delayMs={80}>
        <section className="grid items-stretch gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[2rem] border bg-card shadow-[var(--shadow-soft)]">
            <img
              src={MEDIA.aboutIndiaTherapist}
              alt={t.about.indiaTag}
              referrerPolicy="no-referrer"
              className="h-64 w-full object-cover sm:h-72"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-wider text-white/85">
                {t.about.indiaTag}
              </p>
              <p className="mt-0.5 text-sm font-semibold">{t.about.indiaSubtitle}</p>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[2rem] border bg-card p-6 shadow-[var(--shadow-soft)]">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-secondary">
                {t.about.pillarsTag}
              </p>
              <div className="grid gap-3">
                {t.about.pillars.map((pillar, idx) => {
                  const { Icon, color } = PILLAR_ICONS[idx] ?? PILLAR_ICONS[0]!;
                  return (
                    <div
                      key={pillar.t}
                      className="flex items-center gap-3 rounded-2xl border bg-background p-3.5"
                    >
                      <Icon className={`h-5 w-5 shrink-0 ${color}`} aria-hidden="true" />
                      <div>
                        <p className="text-sm font-bold">{pillar.t}</p>
                        <p className="text-xs text-muted-foreground">{pillar.d}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/studio"
                className="rounded-xl bg-primary-strong px-5 py-2.5 text-sm font-bold text-secondary-foreground"
              >
                {t.about.openStudioBtn}
              </Link>
              <Link
                to="/partnership"
                className="rounded-xl border px-5 py-2.5 text-sm font-bold text-foreground hover:bg-muted"
              >
                {t.about.sdgImpactBtn}
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delayMs={100}>
        <Vision2030Graphic />
      </ScrollReveal>

      <ScrollReveal delayMs={120}>
        <UaeIndiaBridge compact />
      </ScrollReveal>
    </div>
  );
}
