import { createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  CheckCircle2,
  Heart,
  HeartHandshake,
  Mail,
  PenTool,
  Plus,
  Send,
  Sparkles,
  Trash2,
  Volume2,
  WifiOff,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DoveMascot, ProgressPath } from "@/components/BrandAndDove";
import { EducatorStudentManager } from "@/components/EducatorStudentManager";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AddCustomCardModal, FirstThenBoard } from "@/components/StudioExtras";
import { getSpeechLocale, type Language } from "@/lib/i18n";
import { MEDIA } from "@/lib/media";
import { useProfile, type CustomTapCard } from "@/lib/profile-context";
import { has } from "@/lib/profiles";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Expression Studio — Amanah" },
      {
        name: "description",
        content:
          "Tap-to-talk cards that notify parents, calm breathing, talk to a therapist, and writing canvas.",
      },
      { property: "og:title", content: "Amanah Expression Studio" },
      {
        property: "og:description",
        content: "Low-pressure expression tools — online or offline.",
      },
    ],
  }),
  component: Studio,
});

type StudioTab = "cards" | "mood" | "therapist" | "canvas" | "journey";

function say(text: string, language: Language) {
  if (typeof speechSynthesis === "undefined") return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = getSpeechLocale(language);
  u.rate = 0.85;
  speechSynthesis.speak(u);
}

function buildOfflineTherapistReply(prompt: string, language: Language): string {
  const q = prompt.toLowerCase();
  if (language === "ar") {
    if (q.includes("صاخب") || q.includes("صوت") || q.includes("تنفس")) {
      return "شكرًا لمشاركتي ذلك. انتقل إلى مكان أهدأ قليلًا، وخذ 3 أنفاس بطيئة. رسالتك محفوظة وسأراجعها مع والديك.";
    }
    return "أسمعك باهتمام. خذ استراحة قصيرة مع ماء بارد أو بطاقة التحدث، وقد تم حفظ رسالتك لفريق الرعاية.";
  }
  if (language === "hi") {
    if (q.includes("शोर") || q.includes("साँस")) {
      return "यह साझा करने के लिए धन्यवाद। कृपया थोड़ी शांत जगह पर जाएँ और 3 धीमी साँसें लें। आपका संदेश सुरक्षित रूप से सहेजा गया है।";
    }
    return "मैं आपकी बात ध्यान से सुन रही हूँ। आप चाहें तो एक शांत ब्रेक लें—आपका संदेश केयर टीम के लिए सहेज लिया गया है।";
  }
  if (q.includes("loud") || q.includes("breath") || q.includes("focus")) {
    return "Thank you for telling me. Step into a quieter spot for 3 slow breaths, then try one tiny step at a time—your note is saved for your Care Team.";
  }
  return "I hear you and I am proud of you for sharing. Take a gentle break whenever you need one, and your note is safely saved for your Care Team.";
}

function Studio() {
  const {
    role,
    conditions,
    language,
    isOffline,
    recordActivity,
    notifyParent,
    getRegisteredEmailForChild,
    checkins,
    therapistMessages,
    addTherapistExchange,
    customCards,
    addCustomCard,
    removeCustomCard,
    t,
  } = useProfile();

  const [tab, setTab] = useState<StudioTab>("cards");
  const [mood, setMood] = useState<{ id: string; label: string } | null>(null);
  const [level, setLevel] = useState(3);
  const [notifiedCard, setNotifiedCard] = useState<string | null>(null);
  const [doveMessage, setDoveMessage] = useState<string | null>(null);
  const [addCardOpen, setAddCardOpen] = useState(false);

  const registeredParent = getRegisteredEmailForChild();

  useEffect(() => {
    try {
      const savedTab = sessionStorage.getItem("amanah-studio-tab") as StudioTab | null;
      if (
        savedTab === "cards" ||
        savedTab === "mood" ||
        savedTab === "therapist" ||
        savedTab === "canvas" ||
        savedTab === "journey"
      ) {
        setTab(savedTab);
      }
    } catch {
      // ignore sessionStorage errors
    }
  }, []);

  function selectTab(nextTab: StudioTab) {
    setTab(nextTab);
    try {
      sessionStorage.setItem("amanah-studio-tab", nextTab);
    } catch {
      // ignore sessionStorage errors
    }
  }

  useEffect(() => {
    setDoveMessage(null);
  }, [language]);

  const dmdd = has(conditions, "dmdd", "tourette");

  const studioTabs: { id: StudioTab; label: string; Icon: typeof Heart }[] = [
    { id: "cards", label: t.studio.tabs.cards, Icon: Volume2 },
    { id: "mood", label: t.studio.tabs.mood, Icon: Heart },
    { id: "therapist", label: t.studio.tabs.therapist, Icon: HeartHandshake },
    { id: "canvas", label: t.studio.tabs.canvas, Icon: PenTool },
    { id: "journey", label: t.studio.tabs.journey, Icon: Sparkles },
  ];

  function handleSend(stepId: string, points: number, moodTitle: string, note: string) {
    recordActivity(stepId, points, { mood: moodTitle, note });
    setDoveMessage(isOffline ? t.studio.savedOffline(points) : t.studio.savedOnline(points));
  }

  function handleTapCard(card: { id: string; label: string; speak: string }) {
    say(card.speak, language);
    notifyParent(card.label);
    setNotifiedCard(card.label);
    setDoveMessage(
      isOffline
        ? t.studio.parentAlertOffline
        : registeredParent
          ? t.studio.parentAlertOnlineEmail(card.label, registeredParent.email)
          : t.studio.parentAlertOnline(card.label),
    );
  }

  function handleTapCustomCard(card: CustomTapCard) {
    if (card.audioDataUrl) {
      const audio = new Audio(card.audioDataUrl);
      void audio.play().catch(() => say(card.label, language));
    } else {
      say(card.label, language);
    }
    notifyParent(card.label);
    setNotifiedCard(card.label);
    setDoveMessage(
      isOffline
        ? t.studio.parentAlertOffline
        : registeredParent
          ? t.studio.parentAlertOnlineEmail(card.label, registeredParent.email)
          : t.studio.customVoicePlayed(card.label),
    );
  }

  async function handleTherapistMessage(text: string): Promise<void> {
    const trimmed = text.trim();
    if (!trimmed) return;

    if (isOffline) {
      addTherapistExchange(trimmed, buildOfflineTherapistReply(trimmed, language));
      setDoveMessage(t.studio.therapistSentDove);
      return;
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "therapist",
          language,
          userRole: role,
          conditions: role === "child" ? [] : conditions,
          messages: [{ role: "user", content: trimmed }],
        }),
      });
      const data = (await res.json()) as { reply?: string };
      const reply = data.reply?.trim() || buildOfflineTherapistReply(trimmed, language);
      addTherapistExchange(trimmed, reply);
    } catch {
      addTherapistExchange(trimmed, buildOfflineTherapistReply(trimmed, language));
    }
    setDoveMessage(t.studio.therapistSentDove);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-5 py-8">
      <ScrollReveal>
        <section className="grid items-stretch gap-5 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col justify-between rounded-[2rem] border bg-card p-6 shadow-[var(--shadow-soft)]">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-secondary">
                {isOffline ? t.studio.offlineLabel : t.studio.label}
              </p>
              <h1 className="mt-1 text-3xl font-bold">{t.studio.heading}</h1>
            </div>
            <div className="mt-4">
              <DoveMascot
                mood={isOffline ? "offline" : "cheering"}
                size="sm"
                interactive
                speech={doveMessage ?? t.studio.initialDove}
              />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border bg-card shadow-[var(--shadow-soft)]">
            <img
              src={MEDIA.studioCalmCorner}
              alt={t.studio.heading}
              referrerPolicy="no-referrer"
              className="h-44 w-full object-cover lg:h-full"
            />
          </div>
        </section>
      </ScrollReveal>

      {role === "educator" && <EducatorStudentManager compact />}

      {/* Studio Tabs */}
      <div
        role="tablist"
        aria-label={t.studio.label}
        className="flex flex-wrap gap-2 rounded-2xl border bg-card p-2 shadow-[var(--shadow-soft)]"
      >
        {studioTabs.map(({ id, label, Icon }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectTab(id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-bold transition-colors",
                active
                  ? "bg-primary-strong text-secondary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Tap-to-Talk Cards with instant Parent Notification */}
      {tab === "cards" && (
        <Card title={t.studio.tapTitle} note={t.studio.tapNote}>
          {registeredParent && (
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-xl border border-primary-strong/30 bg-primary/15 px-3 py-1.5 text-xs font-bold text-foreground">
              <Mail className="h-3.5 w-3.5 text-primary-strong" aria-hidden="true" />
              <span>{t.studio.parentEmailLinked(registeredParent.email)}</span>
            </div>
          )}

          {notifiedCard && (
            <div
              role="status"
              className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-accent-foreground/30 bg-accent/25 px-4 py-3 text-sm font-bold text-foreground"
            >
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-accent-foreground" aria-hidden="true" />
                <span>
                  {registeredParent
                    ? t.studio.parentNotifiedEmail(notifiedCard, registeredParent.email, isOffline)
                    : t.studio.parentNotified(notifiedCard, isOffline)}
                </span>
              </div>
              <CheckCircle2 className="h-4 w-4 text-accent-foreground" aria-hidden="true" />
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-3">
            {t.studio.cards.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleTapCard(c)}
                className="flex items-center justify-between rounded-2xl border-2 bg-background px-4 py-4 text-start text-base font-bold transition-colors hover:border-primary-strong"
              >
                <span>{c.label}</span>
                <Bell className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              </button>
            ))}

            {customCards.map((card) => (
              <div
                key={card.id}
                className="relative overflow-hidden rounded-2xl border-2 border-primary-strong/45 bg-background transition-colors hover:border-primary-strong"
              >
                <button
                  type="button"
                  onClick={() => handleTapCustomCard(card)}
                  className="flex h-full w-full items-center gap-3 p-3 text-start"
                >
                  <img
                    src={card.photoDataUrl}
                    alt={card.label}
                    referrerPolicy="no-referrer"
                    className="h-14 w-14 shrink-0 rounded-xl border object-cover"
                  />
                  <div className="min-w-0 flex-1 pe-6">
                    <p className="truncate text-base font-bold text-foreground">{card.label}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                      <Volume2 className="h-3.5 w-3.5 text-primary-strong" aria-hidden="true" />
                      <span>{card.audioDataUrl ? t.studio.listen : t.studio.readAloud}</span>
                    </p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => removeCustomCard(card.id)}
                  aria-label={`${t.studio.deleteCard}: ${card.label}`}
                  className="absolute end-2 top-2 rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => setAddCardOpen(true)}
              className="flex min-h-[5.25rem] items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary-strong/60 bg-primary/10 px-4 py-4 text-base font-bold text-primary-strong transition-colors hover:border-primary-strong hover:bg-primary/20"
            >
              <Plus className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>{t.studio.addCardTile}</span>
            </button>
          </div>
        </Card>
      )}

      {tab === "mood" && (
        <div className="space-y-6">
          <SOS onComplete={() => handleSend("breathe", 25, t.studio.sosTitle, t.studio.sosNote)} />

          <Card title={t.studio.moodTitle}>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {t.studio.moods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={mood?.id === m.id}
                  onClick={() => setMood({ id: m.id, label: m.label })}
                  className={cn(
                    "rounded-2xl border-2 p-4 text-center transition-colors",
                    mood?.id === m.id
                      ? "border-primary-strong bg-primary/35"
                      : "border-border bg-background hover:border-primary-strong",
                  )}
                >
                  <div className="text-4xl" aria-hidden="true">
                    {m.e}
                  </div>
                  <div className="mt-1.5 text-sm font-bold">{m.label}</div>
                </button>
              ))}
            </div>
            {mood && (
              <div className="mt-5 rounded-2xl border bg-background p-4">
                <label htmlFor="lvl" className="text-sm font-bold">
                  {t.studio.intensity}{" "}
                  <span className="text-muted-foreground tabular-nums">({level}/5)</span>
                </label>
                <input
                  id="lvl"
                  type="range"
                  min={1}
                  max={5}
                  value={level}
                  onChange={(e) => setLevel(+e.target.value)}
                  className="mt-2 w-full accent-[var(--primary-strong)]"
                />
                <button
                  type="button"
                  onClick={() => {
                    handleSend("checkin", 20, `${mood.label} (${level}/5)`, t.studio.moodTitle);
                    setMood(null);
                  }}
                  className="mt-3 rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground"
                >
                  {t.studio.saveMood}
                </button>
              </div>
            )}
          </Card>

          {dmdd && (
            <Thermometer
              onSend={(label) =>
                handleSend("checkin", 15, `${t.studio.cooldownTitle}: ${label}`, label)
              }
            />
          )}
        </div>
      )}

      {tab === "therapist" && (
        <TalkToTherapist
          messages={therapistMessages}
          isOffline={isOffline}
          language={language}
          onSend={handleTherapistMessage}
        />
      )}

      {tab === "canvas" && (
        <Canvas
          language={language}
          onSend={(snippet) => handleSend("canvas", 25, t.studio.writingTitle, snippet)}
        />
      )}

      {tab === "journey" && (
        <div className="space-y-6">
          <ProgressPath />
          <FirstThenBoard
            onGoToWriting={() => selectTab("canvas")}
            onClaimReward={(storyTitle) => {
              recordActivity("story", 15, {
                mood: t.studio.firstThen.thenTask,
                note: storyTitle,
              });
              setDoveMessage(t.studio.firstThen.rewardEarnedDove);
            }}
          />
          <Card title={t.studio.recentShares}>
            <ul className="space-y-2">
              {checkins.slice(0, 5).map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border bg-background px-4 py-3 text-sm"
                >
                  <div>
                    <span className="font-bold">{item.mood}</span>
                    <span className="text-muted-foreground"> · {item.note}</span>
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground tabular-nums">
                    {item.at} · {item.synced ? t.studio.syncedLabel : t.studio.offlineLabelTag}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}

      <AddCustomCardModal
        open={addCardOpen}
        onClose={() => setAddCardOpen(false)}
        onSave={addCustomCard}
      />
    </div>
  );
}

function TalkToTherapist({
  messages,
  isOffline,
  language,
  onSend,
}: {
  messages: {
    id: string;
    sender: "student" | "therapist";
    text: string;
    at: string;
    synced: boolean;
  }[];
  isOffline: boolean;
  language: Language;
  onSend: (text: string) => Promise<void>;
}) {
  const { t } = useProfile();
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  async function submit(text: string) {
    if (!text.trim() || sending) return;
    setSending(true);
    setDraft("");
    try {
      await onSend(text);
    } finally {
      setSending(false);
    }
  }

  return (
    <Card title={t.studio.therapistTitle} note={t.studio.therapistNote}>
      {/* Therapist Specialist Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-background p-4">
        <div className="flex items-center gap-3">
          <img
            src={MEDIA.aboutIndiaTherapist}
            alt={t.studio.therapistName}
            referrerPolicy="no-referrer"
            className="h-12 w-12 rounded-full border object-cover"
          />
          <div>
            <p className="font-bold text-foreground">{t.studio.therapistName}</p>
            <p className="text-xs text-muted-foreground">{t.studio.therapistRole}</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-xl border bg-card px-3 py-1.5 text-xs font-bold text-secondary">
          {isOffline ? (
            <>
              <WifiOff className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.studio.savesOffline}</span>
            </>
          ) : (
            <>
              <HeartHandshake className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.studio.careConnected}</span>
            </>
          )}
        </span>
      </div>

      {/* Quick Prompts */}
      <div className="mt-4 flex flex-wrap gap-2">
        {t.studio.therapistPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            disabled={sending}
            onClick={() => void submit(prompt)}
            className="rounded-xl border bg-background px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:border-primary-strong disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Conversation Feed */}
      <div className="mt-4 max-h-80 space-y-3 overflow-y-auto rounded-2xl border bg-background p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn("flex flex-col", m.sender === "student" ? "items-end" : "items-start")}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                m.sender === "student"
                  ? "bg-primary-strong text-secondary-foreground"
                  : "border bg-card text-foreground",
              )}
            >
              <p>{m.text}</p>
              <div className="mt-1.5 flex items-center justify-between gap-3 text-[11px] opacity-80">
                <span className="tabular-nums">
                  {m.at}
                  {!m.synced ? ` · ${t.studio.offlineQueued}` : ""}
                </span>
                {m.sender === "therapist" && (
                  <button
                    type="button"
                    onClick={() => say(m.text, language)}
                    className="inline-flex items-center gap-1 font-bold hover:underline"
                  >
                    <Volume2 className="h-3 w-3" aria-hidden="true" />
                    <span>{t.studio.listen}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {sending && (
          <p className="text-xs font-semibold text-muted-foreground">{t.studio.sending}</p>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Message Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void submit(draft);
        }}
        className="mt-4 flex items-center gap-2"
      >
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={t.studio.therapistPlaceholder}
          aria-label={t.studio.therapistPlaceholder}
          className="min-w-0 flex-1 rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          disabled={sending || !draft.trim()}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary-strong px-5 py-3 text-sm font-bold text-secondary-foreground disabled:opacity-50"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          <span>{t.studio.send}</span>
        </button>
      </form>
    </Card>
  );
}

function Card({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border bg-card p-6 shadow-[var(--shadow-soft)]">
      <h2 className="text-2xl font-bold">{title}</h2>
      {note && <p className="mt-1 text-sm text-muted-foreground">{note}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function SOS({ onComplete }: { onComplete: () => void }) {
  const { t } = useProfile();
  const [on, setOn] = useState(false);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    if (!on) return;
    const timer = setInterval(() => setPhase((p) => (p === "in" ? "out" : "in")), 5000);
    return () => clearInterval(timer);
  }, [on]);

  return (
    <section className="rounded-[2rem] border bg-secondary/15 p-6 text-center shadow-[var(--shadow-soft)]">
      {!on ? (
        <div className="flex flex-wrap items-center justify-between gap-4 text-start">
          <div>
            <h2 className="text-xl font-bold">{t.studio.sosTitle}</h2>
            <p className="text-sm text-muted-foreground">{t.studio.sosNote}</p>
          </div>
          <button
            type="button"
            onClick={() => setOn(true)}
            className="shrink-0 whitespace-nowrap rounded-xl bg-secondary px-6 py-3 text-base font-bold text-secondary-foreground"
          >
            {t.studio.startSos}
          </button>
        </div>
      ) : (
        <div>
          <div className="breathe mx-auto flex h-44 w-44 items-center justify-center rounded-full bg-primary/60">
            <span className="font-display text-xl font-bold text-foreground">
              {phase === "in" ? t.studio.breatheIn : t.studio.breatheOut}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setOn(false);
              onComplete();
            }}
            className="mt-4 rounded-xl border bg-card px-5 py-2 text-sm font-bold text-foreground"
          >
            {t.studio.doneXp}
          </button>
        </div>
      )}
    </section>
  );
}

function Thermometer({ onSend }: { onSend: (s: string) => void }) {
  const { t } = useProfile();
  const [i, setI] = useState<number | null>(null);
  return (
    <Card title={t.studio.cooldownTitle}>
      <div className="flex flex-wrap gap-2">
        {t.studio.cooldownLevels.map((l, k) => (
          <button
            key={l}
            type="button"
            onClick={() => {
              setI(k);
              if (k >= 2) onSend(l);
            }}
            className={cn(
              "rounded-2xl border-2 px-4 py-3 text-sm font-bold",
              i === k ? "border-primary-strong bg-primary/40" : "bg-background",
            )}
          >
            {l}
          </button>
        ))}
      </div>
      {i !== null && (
        <p className="mt-3 rounded-2xl border bg-accent/30 p-3 text-sm font-semibold">
          {t.studio.cooldownTips[i]}
        </p>
      )}
    </Card>
  );
}

function Canvas({ language, onSend }: { language: Language; onSend: (s: string) => void }) {
  const { t } = useProfile();
  const [txt, setTxt] = useState(t.studio.defaultCanvasText);
  const [dirty, setDirty] = useState(false);
  const [ruler, setRuler] = useState(false);
  const [y, setY] = useState(0);
  const [syll, setSyll] = useState(false);

  useEffect(() => {
    if (!dirty) {
      setTxt(t.studio.defaultCanvasText);
    }
  }, [dirty, t.studio.defaultCanvasText]);

  const shown = syll ? txt.replace(/([aeiouy]+)([^aeiouy\s]{1,2})(?=[aeiouy])/gi, "$1$2·") : txt;

  return (
    <Card title={t.studio.writingTitle} note={t.studio.writingNote}>
      <div className="mb-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => say(txt, language)}
          className="rounded-xl bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground"
        >
          {t.studio.readAloud}
        </button>
        <button
          type="button"
          aria-pressed={ruler}
          onClick={() => setRuler(!ruler)}
          className="rounded-xl border px-4 py-2 text-sm font-semibold"
        >
          {ruler ? t.studio.rulerOn : t.studio.rulerOff}
        </button>
        <button
          type="button"
          aria-pressed={syll}
          onClick={() => setSyll(!syll)}
          className="rounded-xl border px-4 py-2 text-sm font-semibold"
        >
          {syll ? t.studio.syllablesOn : t.studio.syllablesOff}
        </button>
      </div>

      <textarea
        value={txt}
        onChange={(e) => {
          setDirty(true);
          setTxt(e.target.value);
        }}
        rows={3}
        aria-label={t.studio.writingTitle}
        className="w-full rounded-2xl border bg-background p-4 text-xl leading-loose text-foreground"
        style={{ fontFamily: "var(--font-dyslexic)" }}
      />

      <div
        className="relative mt-3 rounded-2xl border bg-background p-4 text-xl leading-loose"
        style={{ fontFamily: "var(--font-dyslexic)", letterSpacing: "0.05em" }}
        onMouseMove={(e) => setY(e.clientY - e.currentTarget.getBoundingClientRect().top)}
      >
        {ruler && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 h-10 -translate-y-1/2 rounded-lg bg-primary/35 ring-2 ring-primary-strong"
            style={{ top: y }}
          />
        )}
        <p className="relative">{shown}</p>
      </div>

      <button
        type="button"
        onClick={() => onSend(`“${txt.slice(0, 48)}${txt.length > 48 ? "…" : ""}”`)}
        className="mt-4 rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground"
      >
        {t.studio.saveNote}
      </button>
    </Card>
  );
}
