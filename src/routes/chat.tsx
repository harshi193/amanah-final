import { createFileRoute } from "@tanstack/react-router";
import { DoveMascot } from "@/components/BrandAndDove";
import { DoveChat } from "@/components/DoveChat";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useProfile } from "@/lib/profile-context";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Dove Companion Chat — Amanah" },
      {
        name: "description",
        content:
          "Talk calmly with Noor, Amanah's Gemini-powered dove companion, tailored to your role — online or offline.",
      },
      { property: "og:title", content: "Amanah · Noor Dove Chat" },
      { property: "og:description", content: "Gentle, adaptive guidance whenever you need it." },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  const { role, conditions, isOffline, t } = useProfile();
  const isStudent = role === "child";
  const showNeeds = role === "parent" || role === "educator";
  const roleLabel = role ? t.roles[role].label : t.nav.rolesAndNeeds;
  const selectedLabels = conditions
    .map((id) => t.conditions.items[id]?.label)
    .filter((v): v is string => Boolean(v));

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <ScrollReveal>
        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.5fr]">
          <aside className="space-y-5 rounded-[2rem] border bg-card p-6 shadow-[var(--shadow-soft)]">
            <DoveMascot
              mood={isOffline ? "offline" : "happy"}
              size="lg"
              interactive
              speech={t.chat.doveSpeech}
            />
            <div>
              <h1 className="text-3xl font-bold">{t.chat.pageTitle}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{t.chat.pageDesc}</p>
            </div>

            {!isStudent && (
              <div className="space-y-3 border-t pt-4 text-sm">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t.chat.activeRole}
                  </p>
                  <p className="mt-0.5 font-semibold">{roleLabel}</p>
                </div>
                {showNeeds && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t.chat.tailoredNeeds}
                    </p>
                    <p className="mt-0.5 text-muted-foreground">
                      {selectedLabels.length > 0
                        ? selectedLabels.join(" · ")
                        : t.chat.generalComfort}
                    </p>
                  </div>
                )}
              </div>
            )}
          </aside>

          <div>
            <DoveChat mode="page" />
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
