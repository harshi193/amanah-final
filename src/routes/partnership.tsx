import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { SdgImpactVisual, Vision2030Graphic } from "@/components/Graphics";
import { ScrollReveal } from "@/components/ScrollReveal";
import { UaeIndiaBridge } from "@/components/UaeIndiaBridge";
import { MEDIA } from "@/lib/media";
import { useProfile } from "@/lib/profile-context";

export const Route = createFileRoute("/partnership")({
  head: () => ({
    meta: [
      { title: "UAE–India Partnership & Vision 2030 SDG 3 — Amanah" },
      {
        name: "description",
        content:
          "Visual SDG 3, 4, and 17 impact through paired UAE infrastructure and Indian clinical strengths for Vision 2030.",
      },
      { property: "og:title", content: "Amanah · UAE–India Vision 2030 Partnership" },
      {
        property: "og:description",
        content: "Paired UAE & India strengths advancing Vision 2030 & SDG 3.",
      },
    ],
  }),
  component: Partnership,
});

function Partnership() {
  const { t } = useProfile();

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-5 py-8">
      {/* Intro */}
      <ScrollReveal>
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-wider text-secondary">
            {t.partnership.eyebrow}
          </p>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">{t.partnership.title}</h1>
          <p className="mt-2 text-base text-muted-foreground">{t.partnership.subtitle}</p>
        </div>
      </ScrollReveal>

      {/* Visual SDG Radial Gauges + Before/After Bars */}
      <ScrollReveal delayMs={50}>
        <SdgImpactVisual />
      </ScrollReveal>

      {/* Interactive Paired Strength Bridge */}
      <ScrollReveal delayMs={80}>
        <UaeIndiaBridge />
      </ScrollReveal>

      {/* Vision 2030 Roadmap */}
      <ScrollReveal delayMs={100}>
        <Vision2030Graphic />
      </ScrollReveal>

      {/* Photography Pair: Dubai Classroom + Bengaluru Clinic */}
      <ScrollReveal delayMs={120}>
        <section className="grid gap-6 md:grid-cols-2" aria-label={t.partnership.eyebrow}>
          <figure className="overflow-hidden rounded-[2rem] border bg-card shadow-[var(--shadow-soft)]">
            <img
              src={MEDIA.aboutUaeSchool}
              alt={t.partnership.uaeTitle}
              referrerPolicy="no-referrer"
              className="h-56 w-full object-cover"
            />
            <figcaption className="p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-secondary">
                {t.partnership.uaeLabel}
              </p>
              <p className="mt-1 font-bold text-foreground">{t.partnership.uaeTitle}</p>
            </figcaption>
          </figure>

          <figure className="overflow-hidden rounded-[2rem] border bg-card shadow-[var(--shadow-soft)]">
            <img
              src={MEDIA.aboutIndiaTherapist}
              alt={t.partnership.indiaTitle}
              referrerPolicy="no-referrer"
              className="h-56 w-full object-cover"
            />
            <figcaption className="p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-accent-foreground">
                {t.partnership.indiaLabel}
              </p>
              <p className="mt-1 font-bold text-foreground">{t.partnership.indiaTitle}</p>
            </figcaption>
          </figure>
        </section>
      </ScrollReveal>

      {/* Consent & Privacy */}
      <ScrollReveal delayMs={140}>
        <section className="rounded-[2rem] border bg-card p-6 shadow-[var(--shadow-soft)]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-secondary" aria-hidden="true" />
            <h2 className="text-xl font-bold">{t.partnership.privacyTitle}</h2>
          </div>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2">
            {t.partnership.privacyPoints.map((x, i) => (
              <li key={x} className="rounded-2xl border bg-background p-3.5 text-sm">
                <strong className="me-1.5 text-secondary tabular-nums">{i + 1}.</strong>
                {x}
              </li>
            ))}
          </ol>
        </section>
      </ScrollReveal>
    </div>
  );
}
