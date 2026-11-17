import { Link, useLocation } from "@tanstack/react-router";
import {
  ArrowUpRight,
  MessageCircle,
  Send,
  Sparkles,
  Trash2,
  Volume2,
  WifiOff,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DoveMascot } from "@/components/BrandAndDove";
import { getSpeechLocale, type Language } from "@/lib/i18n";
import { useProfile } from "@/lib/profile-context";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  source?: "gemini" | "offline";
};

function buildOfflineReply(prompt: string, language: Language): string {
  const q = prompt.toLowerCase();
  if (language === "ar") {
    if (q.includes("تنفس") || q.includes("إرهاق") || q.includes("هدوء")) {
      return "لنتوقف معًا. شهيق بطيء 4 عدات، ثم زفير 6 عدات. كل شيء محفوظ محليًا على جهازك.";
    }
    return "أنا معك في الوضع دون إنترنت. يمكنك استخدام بطاقات التحدث أو مقياس المزاج أو استشارة المعالج في الاستوديو.";
  }
  if (language === "hi") {
    if (q.includes("साँस") || q.includes("दबाव") || q.includes("शांत")) {
      return "आइए साथ में रुकें। 4 गिनती तक धीरे साँस लें और 6 गिनती तक छोड़ें। सब कुछ ऑफ़लाइन सुरक्षित रहता है।";
    }
    return "मैं ऑफ़लाइन मोड में भी आपके साथ हूँ। आप स्टूडियो में टैप-टू-टॉक कार्ड या थेरेपिस्ट चैट का उपयोग कर सकते हैं।";
  }
  if (
    q.includes("breathe") ||
    q.includes("overwhelmed") ||
    q.includes("calm") ||
    q.includes("panic")
  ) {
    return "Let's pause together. Breathe in slowly for 4 counts, hold softly for 2, and breathe out for 6. Everything works offline.";
  }
  if (
    q.includes("classroom") ||
    q.includes("school") ||
    q.includes("homework") ||
    q.includes("focus")
  ) {
    return "Try one tiny step at a time: pick a 5-minute window, dim bright screens, and offer two clear choices instead of an open question. You can send a Tap-to-Talk card or talk to a therapist right in the Studio.";
  }
  return "I am here with you in Offline Mode. You can log a mood check-in, use the breathing guide, or talk to a therapist in Studio—everything saves locally.";
}

function speakText(text: string, language: Language) {
  if (typeof speechSynthesis === "undefined") return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = getSpeechLocale(language);
  u.rate = 0.9;
  speechSynthesis.speak(u);
}

const STORAGE_KEY = "amanah-dove-chat";

export function DoveChat({ mode = "widget" }: { mode?: "widget" | "page" }) {
  const { role, conditions, language, isOffline, recordActivity, t } = useProfile();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorNote, setErrorNote] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: t.chat.welcome,
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) setMessages(parsed);
      }
    } catch {
      // ignore invalid stored chat
    }
  }, []);

  useEffect(() => {
    setMessages((prev) =>
      prev.length === 1 && prev[0]?.id === "welcome"
        ? [{ id: "welcome", role: "assistant", content: t.chat.welcome }]
        : prev,
    );
  }, [t.chat.welcome]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)));
    } catch {
      // ignore storage quota errors
    }
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (mode === "widget" && location.pathname === "/chat") {
    return null;
  }

  const isStudent = role === "child";
  const starters = t.chat.promptsByRole[role ?? "parent"] ?? t.chat.promptsByRole.parent;

  async function sendMessage(rawText: string) {
    const trimmed = rawText.trim();
    if (!trimmed || loading) return;

    setErrorNote("");
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
    };
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput("");
    setLoading(true);
    recordActivity("chat", 10);

    if (isOffline) {
      const offlineReply = buildOfflineReply(trimmed, language);
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: offlineReply,
          source: "offline",
        },
      ]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "noor",
          language,
          messages: nextHistory.map((m) => ({ role: m.role, content: m.content })),
          userRole: role,
          conditions: isStudent ? [] : conditions,
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (!res.ok || !data.reply) {
        const fallback = buildOfflineReply(trimmed, language);
        setErrorNote(data.error ? t.chat.busyFallback : "");
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            content: fallback,
            source: "offline",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            content: data.reply!,
            source: "gemini",
          },
        ]);
      }
    } catch {
      const fallback = buildOfflineReply(trimmed, language);
      setErrorNote(t.chat.networkFallback);
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: fallback,
          source: "offline",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setErrorNote("");
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: t.chat.cleared,
      },
    ]);
  }

  const chatPanel = (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-[1.75rem] border bg-card text-card-foreground shadow-[var(--shadow-soft)]",
        mode === "widget" ? "h-[30rem] w-[min(24rem,calc(100vw-2rem))]" : "h-[36rem] w-full",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b bg-primary/20 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <DoveMascot mood={isOffline ? "offline" : loading ? "thinking" : "happy"} size="sm" />
          <div>
            <h2 className="text-base font-bold leading-tight">{t.chat.title}</h2>
            <p className="text-xs text-muted-foreground">
              {isOffline ? t.chat.offlineStatus : t.chat.geminiStatus}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={clearChat}
            aria-label={t.chat.clearBtn}
            title={t.chat.clearBtn}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
          {mode === "widget" && (
            <>
              <Link
                to="/chat"
                onClick={() => setOpen(false)}
                aria-label={t.chat.openTabBtn}
                title={t.chat.openTabBtn}
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.chat.closeBtn}
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn("flex flex-col", m.role === "user" ? "items-end" : "items-start")}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                m.role === "user"
                  ? "bg-primary-strong text-secondary-foreground"
                  : "border bg-background text-foreground",
              )}
            >
              <p>{m.content}</p>
              {m.role === "assistant" && (
                <div className="mt-2 flex items-center justify-between gap-3 border-t border-border/50 pt-1.5 text-xs text-muted-foreground">
                  <button
                    type="button"
                    onClick={() => speakText(m.content, language)}
                    className="inline-flex items-center gap-1 font-semibold hover:text-foreground"
                  >
                    <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t.chat.readAloud}</span>
                  </button>
                  {m.source === "gemini" && (
                    <span className="inline-flex items-center gap-1 font-medium text-primary-strong">
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      <span>{t.chat.geminiTag}</span>
                    </span>
                  )}
                  {m.source === "offline" && (
                    <span className="inline-flex items-center gap-1">
                      <WifiOff className="h-3 w-3" aria-hidden="true" />
                      <span>{t.chat.offlineGuideTag}</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-xs font-medium text-muted-foreground">{t.chat.thinking}</div>
        )}
        {errorNote && (
          <div className="rounded-xl border bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
            {errorNote}
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick prompts */}
      <div className="flex gap-1.5 overflow-x-auto border-t bg-background/60 px-3 py-2">
        {starters.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => sendMessage(prompt)}
            className="whitespace-nowrap shrink-0 rounded-lg border bg-card px-2.5 py-1 text-xs font-semibold text-foreground hover:border-primary-strong"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex items-center gap-2 border-t bg-card p-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.chat.placeholder}
          aria-label={t.chat.placeholder}
          className="min-w-0 flex-1 rounded-xl border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label={t.studio.send}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-strong text-secondary-foreground disabled:opacity-50"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );

  if (mode === "page") {
    return chatPanel;
  }

  return (
    <div className="fixed bottom-4 end-4 z-50 flex flex-col items-end gap-3">
      {open && chatPanel}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? t.chat.closeNoor : t.chat.askNoor}
        className="inline-flex items-center gap-2.5 rounded-full border-2 border-primary-strong bg-card px-4 py-2 text-sm font-bold text-foreground shadow-[var(--shadow-soft)] transition-transform duration-200 hover:scale-105"
      >
        <DoveMascot
          mood={isOffline ? "offline" : "happy"}
          size="sm"
          className="[&_svg]:h-9 [&_svg]:w-9"
        />
        <span className="whitespace-nowrap shrink-0">
          {open ? t.chat.closeNoor : t.chat.askNoor}
        </span>
        <MessageCircle className="h-4 w-4 text-primary-strong" aria-hidden="true" />
      </button>
    </div>
  );
}
