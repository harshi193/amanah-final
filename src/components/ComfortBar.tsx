import {
  Contrast,
  Download,
  Languages,
  Lock,
  Moon,
  RefreshCw,
  Sun,
  Unlock,
  Wifi,
  WifiOff,
} from "lucide-react";
import { LANGUAGES } from "@/lib/i18n";
import { usePWAInstall } from "@/lib/offline";
import { useProfile, type ThemeMode } from "@/lib/profile-context";
import { cn } from "@/lib/utils";

export function ComfortBar() {
  const {
    theme,
    setTheme,
    language,
    setLanguage,
    offlineMode,
    setOfflineMode,
    isOffline,
    pendingCount,
    syncPending,
    guardianUnlocked,
    setGuardianDrawerOpen,
    t,
  } = useProfile();
  const { isInstallable, isInstalled, install } = usePWAInstall();

  const themes: { id: ThemeMode; label: string; Icon: typeof Sun }[] = [
    { id: "light", label: t.comfort.light, Icon: Sun },
    { id: "dark", label: t.comfort.dark, Icon: Moon },
    { id: "high-contrast", label: t.comfort.highContrast, Icon: Contrast },
  ];

  return (
    <div
      aria-label="Display, language translator, offline, and parent PIN settings"
      className="border-b bg-card/70 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2.5 px-5 py-2">
        {/* Display Theme Modes & 3-Language Translator */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div
            className="flex items-center gap-1 rounded-xl bg-muted p-1"
            role="group"
            aria-label="Color theme"
          >
            {themes.map(({ id, label, Icon }) => {
              const active = theme === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setTheme(id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold transition-colors",
                    active
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* 3-Language Translator (English / Arabic / Hindi) */}
          <div
            className="flex items-center gap-1 rounded-xl bg-muted p-1"
            role="group"
            aria-label={t.comfort.languageLabel}
          >
            <Languages
              className="mx-1 h-3.5 w-3.5 shrink-0 text-primary-strong"
              aria-hidden="true"
            />
            {LANGUAGES.map((lang) => {
              const active = language === lang.id;
              return (
                <button
                  key={lang.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setLanguage(lang.id)}
                  className={cn(
                    "whitespace-nowrap shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold transition-colors",
                    active
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {lang.native}
                </button>
              );
            })}
          </div>
        </div>

        {/* Offline Mode + Sync + Install + Locked Parent/Teacher Settings */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            aria-pressed={offlineMode}
            onClick={() => setOfflineMode(!offlineMode)}
            className={cn(
              "inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xl border px-2.5 py-1 text-xs font-bold transition-colors",
              isOffline
                ? "border-gold bg-gold/25 text-foreground"
                : "border-border bg-background text-foreground hover:border-primary-strong",
            )}
          >
            {isOffline ? (
              <WifiOff className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Wifi className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span>
              {offlineMode
                ? t.comfort.offlineOn
                : isOffline
                  ? t.comfort.offline
                  : t.comfort.offlineOff}
            </span>
          </button>

          {pendingCount > 0 && (
            <button
              type="button"
              onClick={syncPending}
              className="inline-flex items-center gap-1 whitespace-nowrap shrink-0 rounded-xl bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground"
            >
              <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.comfort.sync(pendingCount)}</span>
            </button>
          )}

          {isInstallable && !isInstalled && (
            <button
              type="button"
              onClick={install}
              className="inline-flex items-center gap-1 whitespace-nowrap shrink-0 rounded-xl bg-primary-strong px-2.5 py-1 text-xs font-bold text-secondary-foreground"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.comfort.install}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setGuardianDrawerOpen(true)}
            aria-label={t.comfort.parentTeacherPin}
            className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xl border bg-background px-2.5 py-1 text-xs font-bold text-foreground hover:border-primary-strong"
          >
            {guardianUnlocked ? (
              <Unlock className="h-3.5 w-3.5 text-accent-foreground" aria-hidden="true" />
            ) : (
              <Lock className="h-3.5 w-3.5 text-primary-strong" aria-hidden="true" />
            )}
            <span>
              {guardianUnlocked ? t.comfort.settingsUnlocked : t.comfort.parentTeacherPin}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
