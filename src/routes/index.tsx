import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bell, Check, Mail, MessageCircle, WifiOff } from "lucide-react";
import { AmanahLogo, DoveMascot, ProgressPath } from "@/components/BrandAndDove";
import { EducatorStudentManager } from "@/components/EducatorStudentManager";
import {
  ProblemSolutionVisual,
  SdgImpactVisual,
  SensoryToolkitGraphic,
  Vision2030Graphic,
} from "@/components/Graphics";
import { ParentNotificationSetup } from "@/components/ParentNotificationSetup";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ConditionPicker, RolePicker } from "@/components/Selector";
import { UaeIndiaBridge } from "@/components/UaeIndiaBridge";
import { MEDIA } from "@/lib/media";
import { useProfile } from "@/lib/profile-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amanah — Gentle support for every child" },
      {
        name: "description",
        content:
          "Calm, sensory-friendly support for neurodivergent students, parents, and educators aligned with Vision 2030 & SDG 3.",
      },
      { property: "og:title", content: "Amanah — Gentle support for every child" },
      {
        property: "og:description",
        content: "Interactive dove guide, instant parent alerts, offline tools, and SDG 3 impact.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { role, userName, isOffline, parentAlerts, acknowledgeAlert, t } = useProfile();
  const showNeeds = role === "parent" || role === "educator";

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-5 py-8">
      {/* Hero Split: Warm Photo + Noor */}
      <ScrollReveal>
        <section className="grid items-stretch gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col justify-between rounded-[2rem] border bg-card p-7 shadow-[var(--shadow-soft)]">
            <div>
              <DoveMascot
                mood={isOffline ? "offline" : "happy"}
                size="md"
                interactive
                speech={isOffline ? t.hero.offlineSpeech : t.hero.onlineSpeech(userName)}
              />
              <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-5xl">{t.hero.title}</h1>
              <p className="mt-3 text-base text-muted-foreground">{t.hero.subtitle}</p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/studio"
                className="inline-flex items-center gap-2 rounded-xl bg-primary-strong px-5 py-3 text-sm font-bold text-secondary-foreground"
              >
                <span>{t.hero.openStudio}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
              <Link
                to="/chat"
                className="inline-flex items-center gap-2 rounded-xl border bg-background px-5 py-3 text-sm font-bold text-foreground hover:border-primary-strong"
              >
                <MessageCircle className="h-4 w-4 text-primary-strong" aria-hidden="true" />
                <span>{t.hero.askNoor}</span>
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border bg-card shadow-[var(--shadow-soft)]">
            <img
              src={MEDIA.heroChildLearning}
              alt={t.hero.photoAlt}
              referrerPolicy="no-referrer"
              className="h-64 w-full object-cover lg:h-full"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-wider text-white/90">
                {t.hero.photoBadge}
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Parent Notification Email Registration + Live Alerts Feed */}
      {role === "parent" && (
        <ScrollReveal delayMs={40}>
          <div className="space-y-6">
            <ParentNotificationSetup />

            <section
              aria-label={t.home.parentAlertsTitle}
              className="rounded-[2rem] border bg-card p-6 shadow-[var(--shadow-soft)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Bell className="h-5 w-5 text-primary-strong" aria-hidden="true" />
                  <h2 className="text-xl font-bold">{t.home.parentAlertsTitle}</h2>
                </div>
                <Link
                  to="/studio"
                  className="text-xs font-bold text-primary-strong hover:underline"
                >
                  {t.home.testInStudio}
                </Link>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {parentAlerts.slice(0, 4).map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border bg-background p-4"
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-foreground">{alert.card}</p>
                      <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground tabular-nums">
                        <span>
                          {alert.childName} · {alert.at}
                        </span>
                        {!alert.synced && (
                          <span className="inline-flex items-center gap-1 text-gold-foreground">
                            <WifiOff className="h-3 w-3" aria-hidden="true" /> {t.home.offlineTag}
                          </span>
                        )}
                      </p>
                      <p className="mt-1.5 inline-flex items-center gap-1 rounded-lg bg-card px-2 py-0.5 text-[11px] font-semibold text-primary-strong">
                        <Mail className="h-3 w-3 shrink-0" aria-hidden="true" />
                        <span className="truncate">
                          {alert.notifiedEmail && alert.emailStatus === "sent"
                            ? t.home.parentEmail.notifiedBadge(alert.notifiedEmail)
                            : alert.notifiedEmail && alert.emailStatus === "queued-offline"
                              ? t.home.parentEmail.queuedEmailBadge(alert.notifiedEmail)
                              : t.home.parentEmail.inAppOnlyBadge}
                        </span>
                      </p>
                    </div>
                    {alert.acknowledged ? (
                      <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-accent-foreground">
                        <Check className="h-4 w-4" aria-hidden="true" /> {t.home.seen}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="shrink-0 whitespace-nowrap rounded-xl bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground"
                      >
                        {t.home.acknowledge}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </ScrollReveal>
      )}

      {/* Educator Individual Student Login & Classroom Roster */}
      {role === "educator" && (
        <ScrollReveal delayMs={40}>
          <EducatorStudentManager />
        </ScrollReveal>
      )}

      {/* Sensory Toolkit Visuals */}
      <ScrollReveal delayMs={60}>
        <SensoryToolkitGraphic />
      </ScrollReveal>

      {/* Duolingo-inspired Progress Path */}
      <ScrollReveal delayMs={80}>
        <ProgressPath />
      </ScrollReveal>

      {/* About Us directly on the First Dashboard */}
      <ScrollReveal delayMs={100}>
        <section
          aria-labelledby="home-about-heading"
          className="rounded-[2rem] border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <AmanahLogo className="h-9 w-9" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-secondary">
                  {t.home.aboutTag}
                </p>
                <h2 id="home-about-heading" className="text-2xl font-bold">
                  {t.home.aboutHeading}
                </h2>
              </div>
            </div>
            <Link to="/about" className="text-sm font-bold text-primary-strong hover:underline">
              {t.home.seeStory}
            </Link>
          </div>

          <div className="mt-5 grid items-center gap-6 lg:grid-cols-[1.2fr_1fr]">
            <ProblemSolutionVisual />
            <div className="grid grid-cols-2 gap-3">
              <img
                src={MEDIA.aboutUaeSchool}
                alt={t.about.photoCaptionTag}
                referrerPolicy="no-referrer"
                className="h-36 w-full rounded-2xl border object-cover"
              />
              <img
                src={MEDIA.aboutIndiaTherapist}
                alt={t.about.indiaTag}
                referrerPolicy="no-referrer"
                className="h-36 w-full rounded-2xl border object-cover"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Visual SDG 3, 4, 17 Dashboard + UAE-India Bridge */}
      <ScrollReveal delayMs={120}>
        <div className="space-y-6">
          <SdgImpactVisual />
          <UaeIndiaBridge compact />
          <Vision2030Graphic />
        </div>
      </ScrollReveal>

      {/* Roles & Needs Customization — Parent & Educator ONLY */}
      {showNeeds && (
        <ScrollReveal delayMs={140}>
          <section className="grid gap-6 rounded-[2rem] border bg-card p-6 shadow-[var(--shadow-soft)] lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold">{t.home.activeRoleHeading}</h2>
              <p className="mb-3 text-xs text-muted-foreground">{t.home.adultControlsSub}</p>
              <RolePicker />
            </div>

            <div>
              <h2 className="text-xl font-bold">{t.home.studentNeedsHeading}</h2>
              <p className="mb-3 text-xs text-muted-foreground">{t.home.tunesSub}</p>
              <ConditionPicker />
            </div>
          </section>
        </ScrollReveal>
      )}
    </div>
  );
}
