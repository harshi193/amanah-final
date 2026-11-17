import {
  ArrowRight,
  BookOpen,
  Camera,
  CheckCircle2,
  ImagePlus,
  Lock,
  Mic,
  Pause,
  Play,
  RotateCcw,
  Square,
  Volume2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DoveMascot } from "@/components/BrandAndDove";
import { getSpeechLocale, type Language } from "@/lib/i18n";
import { useProfile } from "@/lib/profile-context";
import { cn } from "@/lib/utils";

function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxSide = 480;
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(typeof reader.result === "string" ? reader.result : "");
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      };
      img.onerror = () => reject(new Error("Image load failed"));
      img.src = typeof reader.result === "string" ? reader.result : "";
    };
    reader.onerror = () => reject(new Error("File read failed"));
    reader.readAsDataURL(file);
  });
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(new Error("Audio read failed"));
    reader.readAsDataURL(blob);
  });
}

export function AddCustomCardModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (card: { label: string; photoDataUrl: string; audioDataUrl?: string }) => void;
}) {
  const { t } = useProfile();
  const [label, setLabel] = useState("");
  const [photoDataUrl, setPhotoDataUrl] = useState("");
  const [audioDataUrl, setAudioDataUrl] = useState<string | undefined>(undefined);

  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [micError, setMicError] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function stopCamera() {
    cameraStreamRef.current?.getTracks().forEach((tr) => tr.stop());
    cameraStreamRef.current = null;
    setCameraActive(false);
  }

  function stopMicStream() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    micStreamRef.current?.getTracks().forEach((tr) => tr.stop());
    micStreamRef.current = null;
    setRecording(false);
  }

  useEffect(() => {
    if (!open) {
      stopCamera();
      stopMicStream();
    }
    return () => {
      stopCamera();
      stopMicStream();
    };
  }, [open]);

  useEffect(() => {
    if (!recording) return;
    const timer = setInterval(() => setRecordSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [recording]);

  if (!open) return null;

  async function handleOpenCamera() {
    setCameraError(false);
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setCameraError(true);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      cameraStreamRef.current = stream;
      setCameraActive(true);
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          void videoRef.current.play();
        }
      });
    } catch {
      setCameraError(true);
    }
  }

  function handleSnapFromVideo() {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) return;
    const maxSide = 480;
    const scale = Math.min(1, maxSide / Math.max(video.videoWidth, video.videoHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(video.videoWidth * scale));
    canvas.height = Math.max(1, Math.round(video.videoHeight * scale));
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setPhotoDataUrl(canvas.toDataURL("image/jpeg", 0.78));
    }
    stopCamera();
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file);
      if (compressed) setPhotoDataUrl(compressed);
    } catch {
      setCameraError(true);
    }
  }

  async function startRecording() {
    setMicError(false);
    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices?.getUserMedia ||
      typeof MediaRecorder === "undefined"
    ) {
      setMicError(true);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (ev) => {
        if (ev.data.size > 0) chunksRef.current.push(ev.data);
      };
      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });
        if (blob.size > 0) {
          const dataUrl = await blobToDataUrl(blob);
          setAudioDataUrl(dataUrl);
        }
        micStreamRef.current?.getTracks().forEach((tr) => tr.stop());
        micStreamRef.current = null;
        setRecording(false);
      };

      setRecordSeconds(0);
      setAudioDataUrl(undefined);
      recorder.start();
      setRecording(true);
    } catch {
      setMicError(true);
    }
  }

  function finishRecording() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanLabel = label.trim();
    if (!cleanLabel || !photoDataUrl) return;
    onSave({
      label: cleanLabel,
      photoDataUrl,
      ...(audioDataUrl ? { audioDataUrl } : {}),
    });
    setLabel("");
    setPhotoDataUrl("");
    setAudioDataUrl(undefined);
    setRecordSeconds(0);
    onClose();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.studio.addCardTitle}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-xs"
    >
      <form
        onSubmit={handleSubmit}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[2rem] border bg-card p-6 text-card-foreground shadow-[var(--shadow-soft)]"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">{t.studio.addCardTitle}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t.studio.addCardNote}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.studio.cancel}
            className="rounded-xl p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Card Label + Quick Ideas */}
        <div className="mt-5">
          <label htmlFor="custom-card-label" className="block text-sm font-bold text-foreground">
            {t.studio.cardLabel}
          </label>
          <input
            id="custom-card-label"
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder={t.studio.cardLabelPlaceholder}
            required
            className="mt-1.5 w-full rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
          />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {t.studio.cardQuickLabels.map((quick) => (
              <button
                key={quick}
                type="button"
                onClick={() => setLabel(quick)}
                className="rounded-lg border bg-background px-2.5 py-1 text-xs font-semibold text-muted-foreground hover:border-primary-strong hover:text-foreground"
              >
                {quick}
              </button>
            ))}
          </div>
        </div>

        {/* Step 1: Real Photo */}
        <div className="mt-5 border-t pt-4">
          <p className="text-sm font-bold text-foreground">{t.studio.photoStep}</p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            className="sr-only"
          />

          <div className="mt-2.5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border bg-background px-4 py-2 text-sm font-bold text-foreground hover:border-primary-strong"
            >
              <ImagePlus className="h-4 w-4 text-primary-strong" aria-hidden="true" />
              <span>{t.studio.takeOrUploadPhoto}</span>
            </button>

            {!cameraActive ? (
              <button
                type="button"
                onClick={handleOpenCamera}
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border bg-background px-4 py-2 text-sm font-bold text-foreground hover:border-primary-strong"
              >
                <Camera className="h-4 w-4 text-secondary" aria-hidden="true" />
                <span>{t.studio.useCamera}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={stopCamera}
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border bg-background px-4 py-2 text-sm font-bold text-foreground"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                <span>{t.studio.closeCamera}</span>
              </button>
            )}
          </div>

          {cameraError && (
            <p className="mt-2 text-xs text-muted-foreground">{t.studio.cameraUnavailable}</p>
          )}

          {cameraActive && (
            <div className="mt-3 space-y-2">
              <video
                ref={videoRef}
                playsInline
                muted
                className="h-48 w-full rounded-2xl border bg-black object-cover"
              />
              <button
                type="button"
                onClick={handleSnapFromVideo}
                className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground"
              >
                <Camera className="h-4 w-4" aria-hidden="true" />
                <span>{t.studio.snapPhoto}</span>
              </button>
            </div>
          )}

          {photoDataUrl && !cameraActive && (
            <div className="mt-3 overflow-hidden rounded-2xl border bg-background">
              <img
                src={photoDataUrl}
                alt={label || t.studio.cardLabel}
                referrerPolicy="no-referrer"
                className="h-40 w-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Step 2: Familiar Voice Recording */}
        <div className="mt-5 border-t pt-4">
          <p className="text-sm font-bold text-foreground">{t.studio.voiceStep}</p>

          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            {!recording ? (
              <button
                type="button"
                onClick={startRecording}
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border bg-background px-4 py-2 text-sm font-bold text-foreground hover:border-primary-strong"
              >
                <Mic className="h-4 w-4 text-primary-strong" aria-hidden="true" />
                <span>{audioDataUrl ? t.studio.reRecord : t.studio.recordVoice}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={finishRecording}
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl bg-destructive px-4 py-2 text-sm font-bold text-destructive-foreground"
              >
                <Square className="h-4 w-4" aria-hidden="true" />
                <span>
                  {t.studio.stopRecording} ({recordSeconds}s)
                </span>
              </button>
            )}
          </div>

          {micError && (
            <p className="mt-2 text-xs text-muted-foreground">{t.studio.micUnavailable}</p>
          )}

          {audioDataUrl && !recording && (
            <div className="mt-3 space-y-1.5 rounded-2xl border bg-background p-3">
              <p className="text-xs font-bold text-accent-foreground">
                {t.studio.voiceRecordedReady}
              </p>
              <audio controls src={audioDataUrl} className="w-full" />
            </div>
          )}
        </div>

        {/* Submit / Cancel */}
        <div className="mt-6 flex items-center justify-end gap-2 border-t pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border bg-background px-4 py-2.5 text-sm font-bold text-foreground hover:bg-muted"
          >
            {t.studio.cancel}
          </button>
          <button
            type="submit"
            disabled={!label.trim() || !photoDataUrl || recording}
            className="rounded-xl bg-primary-strong px-5 py-2.5 text-sm font-bold text-secondary-foreground disabled:opacity-45"
          >
            {t.studio.saveCard}
          </button>
        </div>
      </form>
    </div>
  );
}

const STORY_INDEX_KEY = "amanah-last-story-index";
const STORY_OPEN_SESSION_KEY = "amanah-story-open";
let sessionStoryIndex: number | null = null;

function getSessionStoryIndex(total: number): number {
  if (total <= 1) return 0;
  if (sessionStoryIndex !== null && sessionStoryIndex < total) {
    return sessionStoryIndex;
  }
  try {
    const raw = localStorage.getItem(STORY_INDEX_KEY);
    const prev = raw !== null ? Number.parseInt(raw, 10) : -1;
    const next = Number.isFinite(prev) && prev >= 0 ? (prev + 1) % total : 0;
    localStorage.setItem(STORY_INDEX_KEY, String(next));
    sessionStoryIndex = next;
    return next;
  } catch {
    sessionStoryIndex = 0;
    return 0;
  }
}

function advanceSessionStoryIndex(total: number, current: number): number {
  if (total <= 1) return 0;
  const next = (current + 1) % total;
  sessionStoryIndex = next;
  try {
    localStorage.setItem(STORY_INDEX_KEY, String(next));
  } catch {
    // ignore storage errors
  }
  return next;
}

export function FirstThenBoard({
  onGoToWriting,
  onClaimReward,
}: {
  onGoToWriting: () => void;
  onClaimReward: (storyTitle: string) => void;
}) {
  const { role, completedSteps, language, t } = useProfile();
  const writingDone = completedSteps.includes("canvas");
  const canOpenStory = writingDone || role === "educator";
  const rewardClaimed = completedSteps.includes("story");

  const stories =
    t.studio.firstThen.stories.length > 0
      ? t.studio.firstThen.stories
      : [{ title: t.studio.firstThen.storyTitle, text: t.studio.firstThen.storyText }];

  const [storyIndex, setStoryIndex] = useState(0);
  const [storyOpen, setStoryOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    setStoryIndex(getSessionStoryIndex(stories.length));
    try {
      if (sessionStorage.getItem(STORY_OPEN_SESSION_KEY) === "1") {
        setStoryOpen(true);
      }
    } catch {
      // ignore sessionStorage errors
    }
  }, [stories.length]);

  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timerRunning]);

  const currentStory = stories[storyIndex % stories.length] ?? {
    title: t.studio.firstThen.storyTitle,
    text: t.studio.firstThen.storyText,
  };

  const mins = String(Math.floor(secondsLeft / 60)).padStart(1, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");

  function toggleStoryOpen() {
    setStoryOpen((prev) => {
      const next = !prev;
      try {
        sessionStorage.setItem(STORY_OPEN_SESSION_KEY, next ? "1" : "0");
      } catch {
        // ignore sessionStorage errors
      }
      return next;
    });
  }

  function handleRefreshStory() {
    if (typeof speechSynthesis !== "undefined") {
      speechSynthesis.cancel();
    }
    setStoryIndex((curr) => advanceSessionStoryIndex(stories.length, curr));
  }

  function speakStory(lang: Language) {
    if (typeof speechSynthesis === "undefined") return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(`${currentStory.title}. ${currentStory.text}`);
    u.lang = getSpeechLocale(lang);
    u.rate = 0.85;
    speechSynthesis.speak(u);
  }

  return (
    <section
      aria-label={t.studio.firstThen.title}
      className="rounded-[2rem] border bg-card p-6 shadow-[var(--shadow-soft)]"
    >
      <div>
        <h2 className="text-xl font-bold">{t.studio.firstThen.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t.studio.firstThen.subtitle}</p>
      </div>

      {/* 2-Step First -> Then Board */}
      <div className="mt-5 grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
        {/* FIRST: Finish 1 Writing Note */}
        <div
          className={cn(
            "flex flex-col justify-between rounded-2xl border-2 p-5 transition-colors",
            writingDone ? "border-accent bg-accent/20" : "border-primary-strong bg-background",
          )}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-secondary">
              {t.studio.firstThen.firstBadge}
            </p>
            <h3 className="mt-1 text-lg font-bold text-foreground">
              {t.studio.firstThen.firstTask}
            </h3>
          </div>

          <div className="mt-4">
            {writingDone ? (
              <span className="inline-flex items-center gap-2 text-sm font-bold text-accent-foreground">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                <span>{t.studio.firstThen.firstDone}</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={onGoToWriting}
                className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-xl bg-primary-strong px-4 py-2 text-sm font-bold text-secondary-foreground"
              >
                <span>{t.studio.firstThen.firstAction}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Arrow Connector */}
        <div className="flex items-center justify-center py-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-muted text-foreground">
            <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
          </div>
        </div>

        {/* THEN: 5 mins with Noor Dove Stories */}
        <div
          className={cn(
            "flex flex-col justify-between rounded-2xl border-2 p-5 transition-colors",
            rewardClaimed
              ? "border-accent bg-accent/25"
              : canOpenStory
                ? "border-gold bg-gold/15"
                : "border-border bg-muted/40",
          )}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gold-foreground">
              {t.studio.firstThen.thenBadge}
            </p>
            <h3 className="mt-1 text-lg font-bold text-foreground">
              {t.studio.firstThen.thenTask}
            </h3>
          </div>

          <div className="mt-4">
            {!canOpenStory ? (
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <Lock className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{t.studio.firstThen.lockedNote}</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={toggleStoryOpen}
                className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-xl bg-accent px-4 py-2 text-sm font-bold text-accent-foreground"
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                <span>
                  {storyOpen
                    ? t.studio.firstThen.hideStory
                    : writingDone
                      ? t.studio.firstThen.openStory
                      : t.studio.firstThen.educatorPreview}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expandable 5-Min Noor Dove Story Reward */}
      {canOpenStory && storyOpen && (
        <div className="mt-5 space-y-4 border-t pt-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <DoveMascot mood="happy" size="sm" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                  {t.studio.firstThen.storyCounter(
                    (storyIndex % stories.length) + 1,
                    stories.length,
                  )}
                </p>
                <h3 className="text-lg font-bold text-foreground">{currentStory.title}</h3>
                <p className="text-xs font-bold text-muted-foreground tabular-nums">
                  {mins}:{secs}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleRefreshStory}
                className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xl border bg-background px-3.5 py-2 text-xs font-bold text-foreground hover:border-primary-strong"
              >
                <RotateCcw className="h-3.5 w-3.5 text-primary-strong" aria-hidden="true" />
                <span>{t.studio.firstThen.newStory}</span>
              </button>

              <button
                type="button"
                onClick={() => speakStory(language)}
                className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xl border bg-background px-3.5 py-2 text-xs font-bold text-foreground hover:border-primary-strong"
              >
                <Volume2 className="h-4 w-4 text-primary-strong" aria-hidden="true" />
                <span>{t.studio.firstThen.listenStory}</span>
              </button>

              <button
                type="button"
                onClick={() => setTimerRunning((r) => !r)}
                className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xl bg-secondary px-3.5 py-2 text-xs font-bold text-secondary-foreground"
              >
                {timerRunning ? (
                  <>
                    <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t.studio.firstThen.pauseTimer}</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t.studio.firstThen.startTimer}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setTimerRunning(false);
                  setSecondsLeft(300);
                }}
                aria-label={t.studio.firstThen.resetTimer}
                className="inline-flex items-center gap-1 rounded-xl border bg-background px-3 py-2 text-xs font-bold text-foreground hover:bg-muted"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.studio.firstThen.resetTimer}</span>
              </button>
            </div>
          </div>

          <p className="rounded-2xl border bg-background p-4 text-base leading-relaxed text-foreground">
            {currentStory.text}
          </p>

          <div className="flex items-center justify-end">
            {rewardClaimed ? (
              <span className="inline-flex items-center gap-2 text-sm font-bold text-accent-foreground">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                <span>{t.studio.firstThen.rewardClaimed}</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => onClaimReward(currentStory.title)}
                className="rounded-xl bg-primary-strong px-5 py-2.5 text-sm font-bold text-secondary-foreground"
              >
                {t.studio.firstThen.claimReward}
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
