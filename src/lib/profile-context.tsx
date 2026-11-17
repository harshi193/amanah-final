import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { TRANSLATIONS, type Language } from "./i18n";
import { useBrowserOnlineStatus } from "./offline";
import type { Role } from "./profiles";
import { has } from "./profiles";

export type ThemeMode = "light" | "dark" | "high-contrast";
export type DeviceMode = "laptop" | "tablet" | "mobile";

export type CheckinEntry = {
  id: string;
  at: string;
  mood: string;
  note: string;
  synced: boolean;
};

export type ParentAlert = {
  id: string;
  card: string;
  at: string;
  childName: string;
  acknowledged: boolean;
  synced: boolean;
  notifiedEmail?: string;
  emailStatus?: "sent" | "queued-offline" | "none";
};

export type ParentChildRegistration = {
  id: string;
  parentName: string;
  childName: string;
  email: string;
  registeredAt: string;
};

export type TherapistMessage = {
  id: string;
  sender: "student" | "therapist";
  text: string;
  at: string;
  synced: boolean;
};

export type CustomTapCard = {
  id: string;
  label: string;
  photoDataUrl: string;
  audioDataUrl?: string;
  createdAt: string;
};

export type StudentProfile = {
  id: string;
  name: string;
  studentCode: string;
  grade: string;
  organisationName: string;
  cue: string;
  conditions: string[];
  xp: number;
  streak: number;
  completedSteps: string[];
  checkins: CheckinEntry[];
  parentAlerts: ParentAlert[];
  therapistMessages: TherapistMessage[];
  customCards: CustomTapCard[];
  educatorNotes: string;
  lastLoggedInAt: string;
};

type StoredState = {
  signedIn: boolean;
  userName: string;
  organisationName: string;
  role: Role | null;
  conditions: string[];
  theme: ThemeMode;
  language: Language;
  deviceMode: DeviceMode;
  offlineMode: boolean;
  xp: number;
  streak: number;
  completedSteps: string[];
  checkins: CheckinEntry[];
  parentAlerts: ParentAlert[];
  parentRegistrations: ParentChildRegistration[];
  therapistMessages: TherapistMessage[];
  customCards: CustomTapCard[];
  students: StudentProfile[];
  activeStudentId: string | null;
};

const DEFAULT_CHECKINS: CheckinEntry[] = [
  {
    id: "c1",
    at: "Today 08:10",
    mood: "Happy (2/5)",
    note: "Ready for morning class",
    synced: true,
  },
  {
    id: "c2",
    at: "Yesterday 15:40",
    mood: "Overwhelmed (4/5)",
    note: "Care note · hall was loud",
    synced: true,
  },
];

const DEFAULT_ALERTS: ParentAlert[] = [
  {
    id: "a1",
    card: "⏸️ I need a break",
    at: "Today 09:15",
    childName: "Aarav K.",
    acknowledged: false,
    synced: true,
    emailStatus: "none",
  },
];

const DEFAULT_THERAPIST_MESSAGES: TherapistMessage[] = [
  {
    id: "t1",
    sender: "therapist",
    text: "Hello! I am Dr. Meera Nair. Whenever you want to talk, send a calm note or tap a quick prompt below.",
    at: "Today 08:00",
    synced: true,
  },
];

const DEFAULT_STUDENTS: StudentProfile[] = [
  {
    id: "s-aarav",
    name: "Aarav K.",
    studentCode: "STU-101",
    grade: "Grade 3 · A",
    organisationName: "",
    cue: "Seat near window · visual cards",
    conditions: ["asd", "spd"],
    xp: 45,
    streak: 3,
    completedSteps: ["checkin"],
    checkins: DEFAULT_CHECKINS,
    parentAlerts: DEFAULT_ALERTS,
    therapistMessages: DEFAULT_THERAPIST_MESSAGES,
    customCards: [],
    educatorNotes: "Responds well to 30-second visual transition cues before group work.",
    lastLoggedInAt: "Today 08:10",
  },
  {
    id: "s-layla",
    name: "Layla M.",
    studentCode: "STU-102",
    grade: "Grade 4 · B",
    organisationName: "",
    cue: "10-min task chunks · reading ruler",
    conditions: ["adhd", "dyslexia"],
    xp: 70,
    streak: 5,
    completedSteps: ["checkin", "breathe"],
    checkins: [
      {
        id: "c-layla-1",
        at: "Today 08:30",
        mood: "Proud (4/5)",
        note: "Completed 2 reading chunks with ruler",
        synced: true,
      },
    ],
    parentAlerts: [],
    therapistMessages: DEFAULT_THERAPIST_MESSAGES,
    customCards: [],
    educatorNotes: "Prefers weighted Lexend font and syllable breaks during reading.",
    lastLoggedInAt: "Yesterday 14:20",
  },
  {
    id: "s-noor",
    name: "Noor A.",
    studentCode: "STU-103",
    grade: "Grade 2 · A",
    organisationName: "",
    cue: "Accept tap-to-talk · zero verbal demand",
    conditions: ["mutism", "anxiety"],
    xp: 35,
    streak: 2,
    completedSteps: ["card"],
    checkins: [
      {
        id: "c-noor-1",
        at: "Today 09:05",
        mood: "Happy (3/5)",
        note: "Used Tap-to-Talk card for quiet break",
        synced: true,
      },
    ],
    parentAlerts: [],
    therapistMessages: DEFAULT_THERAPIST_MESSAGES,
    customCards: [],
    educatorNotes: "Offer two visual choices rather than open-ended verbal questions.",
    lastLoggedInAt: "Yesterday 11:15",
  },
];

const INITIAL_STATE: StoredState = {
  signedIn: false,
  userName: "",
  organisationName: "",
  role: null,
  conditions: [],
  theme: "light",
  language: "en",
  deviceMode: "laptop",
  offlineMode: false,
  xp: 45,
  streak: 3,
  completedSteps: ["checkin"],
  checkins: DEFAULT_CHECKINS,
  parentAlerts: DEFAULT_ALERTS,
  parentRegistrations: [],
  therapistMessages: DEFAULT_THERAPIST_MESSAGES,
  customCards: [],
  students: DEFAULT_STUDENTS,
  activeStudentId: "s-aarav",
};

export type NewStudentInput = {
  name: string;
  studentCode?: string;
  grade?: string;
  organisationName?: string;
  cue?: string;
  conditions?: string[];
  educatorNotes?: string;
  initialMood?: { mood: string; note: string };
};

export type RegisterEmailResult = {
  ok: boolean;
  mode?: "created" | "updated";
  registration?: ParentChildRegistration;
  error?: string;
};

export type Ctx = StoredState & {
  ready: boolean;
  browserOnline: boolean;
  isOffline: boolean;
  pendingCount: number;
  unreadAlertsCount: number;
  level: number;
  levelTitle: string;
  nextLevelXp: number;
  guardianUnlocked: boolean;
  guardianDrawerOpen: boolean;
  activeStudent: StudentProfile | null;
  t: (typeof TRANSLATIONS)["en"];
  setGuardianDrawerOpen: (open: boolean) => void;
  unlockGuardian: (pin: string) => boolean;
  lockGuardian: () => void;
  signIn: (
    role: Role,
    name?: string,
    initialStudentId?: string | null,
    organisationName?: string,
  ) => void;
  signOut: () => void;
  setRole: (r: Role) => void;
  setOrganisationName: (org: string) => void;
  toggle: (id: string) => void;
  setTheme: (t: ThemeMode) => void;
  setLanguage: (l: Language) => void;
  setDeviceMode: (d: DeviceMode) => void;
  setOfflineMode: (on: boolean) => void;
  recordActivity: (
    stepId: string,
    points: number,
    checkin?: { mood: string; note: string },
  ) => void;
  notifyParent: (card: string) => void;
  acknowledgeAlert: (id: string) => void;
  registerParentChildEmail: (
    childName: string,
    email: string,
    parentName?: string,
  ) => RegisterEmailResult;
  removeParentRegistration: (id: string) => void;
  getRegisteredEmailForChild: (childName?: string) => ParentChildRegistration | null;
  addTherapistExchange: (studentText: string, therapistReply: string) => void;
  addCustomCard: (card: Omit<CustomTapCard, "id" | "createdAt">) => void;
  removeCustomCard: (id: string) => void;
  syncPending: () => void;
  loginStudent: (studentId: string) => void;
  logoutStudent: () => void;
  addAndLoginStudent: (input: NewStudentInput) => void;
  updateStudent: (
    studentId: string,
    patch: Partial<
      Pick<
        StudentProfile,
        | "name"
        | "studentCode"
        | "grade"
        | "organisationName"
        | "cue"
        | "educatorNotes"
        | "conditions"
      >
    >,
  ) => void;
  removeStudent: (studentId: string) => void;
};

const C = createContext<Ctx>({
  ...INITIAL_STATE,
  ready: false,
  browserOnline: true,
  isOffline: false,
  pendingCount: 0,
  unreadAlertsCount: 0,
  level: 1,
  levelTitle: TRANSLATIONS.en.progress.levelTitles[0]!,
  nextLevelXp: 100,
  guardianUnlocked: false,
  guardianDrawerOpen: false,
  activeStudent: DEFAULT_STUDENTS[0]!,
  t: TRANSLATIONS.en,
  setGuardianDrawerOpen: () => {},
  unlockGuardian: () => false,
  lockGuardian: () => {},
  signIn: () => {},
  signOut: () => {},
  setRole: () => {},
  setOrganisationName: () => {},
  toggle: () => {},
  setTheme: () => {},
  setLanguage: () => {},
  setDeviceMode: () => {},
  setOfflineMode: () => {},
  recordActivity: () => {},
  notifyParent: () => {},
  acknowledgeAlert: () => {},
  registerParentChildEmail: () => ({ ok: false }),
  removeParentRegistration: () => {},
  getRegisteredEmailForChild: () => null,
  addTherapistExchange: () => {},
  addCustomCard: () => {},
  removeCustomCard: () => {},
  syncPending: () => {},
  loginStudent: () => {},
  logoutStudent: () => {},
  addAndLoginStudent: () => {},
  updateStudent: () => {},
  removeStudent: () => {},
});

const KEY = "amanah-profile-v2";
const GUARDIAN_PIN = "1234";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatNowTime(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function normalizePairKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function findRegistrationForChild(
  registrations: ParentChildRegistration[],
  childName: string,
): ParentChildRegistration | null {
  const target = normalizePairKey(childName);
  if (!target || registrations.length === 0) return null;
  const exact = registrations.find((r) => normalizePairKey(r.childName) === target);
  if (exact) return exact;
  const targetFirst = target.split(" ")[0] ?? target;
  const firstMatches = registrations.filter((r) => {
    const regFirst = normalizePairKey(r.childName).split(" ")[0];
    return Boolean(regFirst && regFirst === targetFirst);
  });
  if (firstMatches.length === 1) return firstMatches[0]!;
  return null;
}

function resolveChildNameForNotify(state: StoredState): string {
  const currentStudent =
    state.role === "educator" && state.activeStudentId
      ? state.students.find((s) => s.id === state.activeStudentId)
      : null;
  if (currentStudent) return currentStudent.name;
  if (state.role === "child" && state.userName.trim()) return state.userName.trim();
  if (state.role === "parent" && state.parentRegistrations.length > 0) {
    const active = state.activeStudentId
      ? state.students.find((s) => s.id === state.activeStudentId)
      : null;
    if (active) {
      const matched = findRegistrationForChild(state.parentRegistrations, active.name);
      if (matched) return matched.childName;
    }
    return state.parentRegistrations[0]!.childName;
  }
  const fallbackStudent = state.activeStudentId
    ? state.students.find((s) => s.id === state.activeStudentId)
    : null;
  return fallbackStudent?.name ?? "Aarav";
}

function syncActiveStudentToRoster(state: StoredState): StoredState {
  if (state.role !== "educator" || !state.activeStudentId) return state;
  const idx = state.students.findIndex((s) => s.id === state.activeStudentId);
  if (idx === -1) return state;
  const current = state.students[idx]!;
  const updated: StudentProfile = {
    ...current,
    organisationName: current.organisationName || state.organisationName,
    conditions: state.conditions,
    xp: state.xp,
    streak: state.streak,
    completedSteps: state.completedSteps,
    checkins: state.checkins,
    parentAlerts: state.parentAlerts,
    therapistMessages: state.therapistMessages,
    customCards: state.customCards,
  };
  const students = [...state.students];
  students[idx] = updated;
  return { ...state, students };
}

function applyStudentDataToWorkspace(state: StoredState, student: StudentProfile): StoredState {
  return {
    ...state,
    activeStudentId: student.id,
    conditions: student.conditions,
    xp: student.xp,
    streak: student.streak,
    completedSteps: student.completedSteps,
    checkins: student.checkins,
    parentAlerts: student.parentAlerts,
    therapistMessages:
      student.therapistMessages.length > 0 ? student.therapistMessages : DEFAULT_THERAPIST_MESSAGES,
    customCards: student.customCards,
  };
}

function normalizeStudentProfile(st: Partial<StudentProfile>, index: number): StudentProfile {
  return {
    id: st.id || `student-${index}-${Date.now()}`,
    name: st.name || `Student ${index + 1}`,
    studentCode: typeof st.studentCode === "string" ? st.studentCode : "",
    grade: typeof st.grade === "string" ? st.grade : "",
    organisationName: typeof st.organisationName === "string" ? st.organisationName : "",
    cue: typeof st.cue === "string" ? st.cue : "Gentle visual prompts",
    conditions: Array.isArray(st.conditions) ? st.conditions : [],
    xp: typeof st.xp === "number" ? st.xp : 0,
    streak: typeof st.streak === "number" ? st.streak : 1,
    completedSteps: Array.isArray(st.completedSteps) ? st.completedSteps : [],
    checkins: Array.isArray(st.checkins) ? st.checkins : [],
    parentAlerts: Array.isArray(st.parentAlerts) ? st.parentAlerts : [],
    therapistMessages:
      Array.isArray(st.therapistMessages) && st.therapistMessages.length > 0
        ? st.therapistMessages
        : DEFAULT_THERAPIST_MESSAGES,
    customCards: Array.isArray(st.customCards) ? st.customCards : [],
    educatorNotes: typeof st.educatorNotes === "string" ? st.educatorNotes : "",
    lastLoggedInAt: typeof st.lastLoggedInAt === "string" ? st.lastLoggedInAt : "Today",
  };
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoredState>(INITIAL_STATE);
  const [ready, setReady] = useState(false);
  const [guardianUnlocked, setGuardianUnlocked] = useState(false);
  const [guardianDrawerOpen, setGuardianDrawerOpen] = useState(false);
  const browserOnline = useBrowserOnlineStatus();
  const dispatchedEmailAlertIds = useRef<Set<string>>(new Set(["a1"]));

  useEffect(() => {
    try {
      const s = localStorage.getItem(KEY);
      if (s) {
        const parsed = JSON.parse(s) as Partial<StoredState>;
        const validRole: Role | null =
          parsed.role === "child" || parsed.role === "parent" || parsed.role === "educator"
            ? parsed.role
            : null;
        const validLang: Language =
          parsed.language === "ar" || parsed.language === "hi" ? parsed.language : "en";
        const parsedStudents =
          Array.isArray(parsed.students) && parsed.students.length > 0
            ? parsed.students.map((st, idx) => normalizeStudentProfile(st, idx))
            : DEFAULT_STUDENTS;
        const parsedActiveId =
          parsed.activeStudentId === null
            ? null
            : typeof parsed.activeStudentId === "string" &&
                parsedStudents.some((st) => st.id === parsed.activeStudentId)
              ? parsed.activeStudentId
              : (parsedStudents[0]?.id ?? null);
        const parsedAlerts = Array.isArray(parsed.parentAlerts)
          ? parsed.parentAlerts
          : DEFAULT_ALERTS;
        for (const alert of parsedAlerts) {
          if (alert.emailStatus === "sent") {
            dispatchedEmailAlertIds.current.add(alert.id);
          }
        }
        for (const st of parsedStudents) {
          for (const alert of st.parentAlerts) {
            if (alert.emailStatus === "sent") {
              dispatchedEmailAlertIds.current.add(alert.id);
            }
          }
        }

        setState((prev) => {
          const base: StoredState = {
            ...prev,
            ...parsed,
            organisationName:
              typeof parsed.organisationName === "string" ? parsed.organisationName : "",
            role: validRole,
            signedIn: Boolean(parsed.signedIn && validRole),
            language: validLang,
            deviceMode:
              parsed.deviceMode === "tablet" || parsed.deviceMode === "mobile"
                ? parsed.deviceMode
                : "laptop",
            conditions: Array.isArray(parsed.conditions) ? parsed.conditions : prev.conditions,
            completedSteps: Array.isArray(parsed.completedSteps)
              ? parsed.completedSteps
              : prev.completedSteps,
            checkins:
              Array.isArray(parsed.checkins) && parsed.checkins.length > 0
                ? parsed.checkins
                : prev.checkins,
            parentAlerts: parsedAlerts,
            parentRegistrations: Array.isArray(parsed.parentRegistrations)
              ? parsed.parentRegistrations
              : [],
            therapistMessages:
              Array.isArray(parsed.therapistMessages) && parsed.therapistMessages.length > 0
                ? parsed.therapistMessages
                : prev.therapistMessages,
            customCards: Array.isArray(parsed.customCards) ? parsed.customCards : prev.customCards,
            students: parsedStudents,
            activeStudentId: parsedActiveId,
          };

          if (base.role === "educator" && base.activeStudentId) {
            const active = base.students.find((st) => st.id === base.activeStudentId);
            if (active) return applyStudentDataToWorkspace(base, active);
          }
          return base;
        });
      }
    } catch {
      // ignore malformed stored profile
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      // ignore quota errors
    }
    const doc = document.documentElement;
    const c = doc.classList;
    c.toggle("dyslexia", has(state.conditions, "dyslexia"));
    c.toggle("calm", has(state.conditions, "spd", "asd", "ptsd", "panic"));
    c.toggle("focus-mode", has(state.conditions, "adhd", "ef"));
    c.toggle("dark", state.theme === "dark");
    c.toggle("high-contrast", state.theme === "high-contrast");
    doc.lang = state.language;
    doc.dir = state.language === "ar" ? "rtl" : "ltr";
  }, [state, ready]);

  const isOffline = state.offlineMode || !browserOnline;

  useEffect(() => {
    if (!ready || isOffline || typeof fetch !== "function") return;
    const unsent = state.parentAlerts.filter(
      (alert) =>
        alert.emailStatus === "sent" &&
        Boolean(alert.notifiedEmail) &&
        !dispatchedEmailAlertIds.current.has(alert.id),
    );
    for (const alert of unsent) {
      dispatchedEmailAlertIds.current.add(alert.id);
      const reg = findRegistrationForChild(state.parentRegistrations, alert.childName);
      void fetch("/api/notify-parent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childName: alert.childName,
          parentEmail: alert.notifiedEmail,
          parentName: reg?.parentName ?? "Parent",
          card: alert.card,
          at: alert.at,
        }),
      }).catch(() => {
        // local notification feed still persists even if network drops
      });
    }
  }, [ready, isOffline, state.parentAlerts, state.parentRegistrations]);

  const t = TRANSLATIONS[state.language] ?? TRANSLATIONS.en;
  const pendingCount =
    state.checkins.filter((c) => !c.synced).length +
    state.parentAlerts.filter((a) => !a.synced).length +
    state.therapistMessages.filter((m) => !m.synced).length;
  const unreadAlertsCount = state.parentAlerts.filter((a) => !a.acknowledged).length;
  const level = Math.min(5, Math.floor(state.xp / 100) + 1);
  const levelTitle = t.progress.levelTitles[level - 1] ?? t.progress.levelTitles[0]!;
  const nextLevelXp = level * 100;
  const activeStudent =
    state.activeStudentId !== null
      ? (state.students.find((s) => s.id === state.activeStudentId) ?? null)
      : null;

  return (
    <C.Provider
      value={{
        ...state,
        ready,
        browserOnline,
        isOffline,
        pendingCount,
        unreadAlertsCount,
        level,
        levelTitle,
        nextLevelXp,
        guardianUnlocked,
        guardianDrawerOpen,
        activeStudent,
        t,
        setGuardianDrawerOpen,
        unlockGuardian: (pin) => {
          const ok = pin.trim() === GUARDIAN_PIN;
          if (ok) setGuardianUnlocked(true);
          return ok;
        },
        lockGuardian: () => setGuardianUnlocked(false),
        signIn: (role, name, initialStudentId, organisationName) => {
          if (role === "child") setGuardianUnlocked(false);
          setGuardianDrawerOpen(false);
          setState((prev) => {
            const synced = syncActiveStudentToRoster(prev);
            const cleanOrg =
              organisationName !== undefined ? organisationName.trim() : synced.organisationName;
            let next: StoredState = {
              ...synced,
              signedIn: true,
              role,
              userName:
                (name ?? "").trim() ||
                (role === "child" ? "Aarav" : role === "parent" ? "Parent" : "Educator"),
              organisationName: cleanOrg,
            };

            if (role === "educator") {
              const targetId =
                initialStudentId !== undefined ? initialStudentId : synced.activeStudentId;
              if (targetId) {
                const target = next.students.find((s) => s.id === targetId);
                if (target) {
                  const time = formatNowTime();
                  const updatedTarget: StudentProfile = {
                    ...target,
                    organisationName: cleanOrg || target.organisationName,
                    lastLoggedInAt: `Today ${time}`,
                  };
                  next = applyStudentDataToWorkspace(
                    {
                      ...next,
                      students: next.students.map((s) => (s.id === target.id ? updatedTarget : s)),
                    },
                    updatedTarget,
                  );
                }
              } else if (initialStudentId === null) {
                next = { ...next, activeStudentId: null };
              }
            }
            return next;
          });
        },
        signOut: () => {
          setGuardianDrawerOpen(false);
          setGuardianUnlocked(false);
          setState((x) => {
            const synced = syncActiveStudentToRoster(x);
            return { ...synced, signedIn: false };
          });
        },
        setRole: (role) =>
          setState((x) => {
            const synced = syncActiveStudentToRoster(x);
            let next: StoredState = { ...synced, role, signedIn: true };
            if (role === "educator" && next.activeStudentId) {
              const active = next.students.find((s) => s.id === next.activeStudentId);
              if (active) next = applyStudentDataToWorkspace(next, active);
            }
            return next;
          }),
        setOrganisationName: (org) =>
          setState((x) => {
            const cleanOrg = org.trim();
            const nextStudents = x.students.map((s) =>
              s.id === x.activeStudentId && cleanOrg ? { ...s, organisationName: cleanOrg } : s,
            );
            return {
              ...x,
              organisationName: cleanOrg,
              students: nextStudents,
            };
          }),
        toggle: (id) =>
          setState((x) => {
            const next: StoredState = {
              ...x,
              conditions: x.conditions.includes(id)
                ? x.conditions.filter((c) => c !== id)
                : [...x.conditions, id],
            };
            return syncActiveStudentToRoster(next);
          }),
        setTheme: (theme) => setState((x) => ({ ...x, theme })),
        setLanguage: (language) => setState((x) => ({ ...x, language })),
        setDeviceMode: (deviceMode) => setState((x) => ({ ...x, deviceMode })),
        setOfflineMode: (offlineMode) => setState((x) => ({ ...x, offlineMode })),
        recordActivity: (stepId, points, checkin) =>
          setState((x) => {
            const steps = x.completedSteps.includes(stepId)
              ? x.completedSteps
              : [...x.completedSteps, stepId];
            const time = formatNowTime();
            const nextCheckins = checkin
              ? [
                  {
                    id: `c-${Date.now()}`,
                    at: `Today ${time}`,
                    mood: checkin.mood,
                    note: checkin.note,
                    synced: !isOffline,
                  },
                  ...x.checkins,
                ].slice(0, 12)
              : x.checkins;
            return syncActiveStudentToRoster({
              ...x,
              xp: x.xp + points,
              completedSteps: steps,
              checkins: nextCheckins,
            });
          }),
        notifyParent: (card) =>
          setState((x) => {
            const time = formatNowTime();
            const steps = x.completedSteps.includes("card")
              ? x.completedSteps
              : [...x.completedSteps, "card"];
            const childName = resolveChildNameForNotify(x);
            const registration = findRegistrationForChild(x.parentRegistrations, childName);
            const alert: ParentAlert = {
              id: `alert-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              card,
              at: `Today ${time}`,
              childName,
              acknowledged: false,
              synced: !isOffline,
              ...(registration ? { notifiedEmail: registration.email } : {}),
              emailStatus: registration ? (isOffline ? "queued-offline" : "sent") : "none",
            };
            return syncActiveStudentToRoster({
              ...x,
              xp: x.xp + 15,
              completedSteps: steps,
              parentAlerts: [alert, ...x.parentAlerts].slice(0, 12),
            });
          }),
        acknowledgeAlert: (id) =>
          setState((x) =>
            syncActiveStudentToRoster({
              ...x,
              parentAlerts: x.parentAlerts.map((a) =>
                a.id === id ? { ...a, acknowledged: true } : a,
              ),
            }),
          ),
        registerParentChildEmail: (childName, email, parentName) => {
          const cleanChild = childName.trim();
          const cleanEmail = email.trim().toLowerCase();
          if (!cleanChild || !EMAIL_RE.test(cleanEmail)) {
            return { ok: false, error: "invalid" };
          }
          const effectiveParent =
            (parentName ?? (state.role === "parent" ? state.userName : ""))?.trim() || "Parent";
          const parentKey = normalizePairKey(effectiveParent);
          const childKey = normalizePairKey(cleanChild);

          const existing = state.parentRegistrations.find(
            (r) =>
              normalizePairKey(r.parentName) === parentKey &&
              normalizePairKey(r.childName) === childKey,
          );
          const nowTime = `Today ${formatNowTime()}`;
          const entry: ParentChildRegistration = existing
            ? {
                ...existing,
                parentName: effectiveParent,
                childName: cleanChild,
                email: cleanEmail,
                registeredAt: nowTime,
              }
            : {
                id: `pcr-${Date.now()}`,
                parentName: effectiveParent,
                childName: cleanChild,
                email: cleanEmail,
                registeredAt: nowTime,
              };

          setState((x) => {
            const currentParent =
              (parentName ?? (x.role === "parent" ? x.userName : ""))?.trim() || "Parent";
            const pKey = normalizePairKey(currentParent);
            const cKey = normalizePairKey(cleanChild);
            const matchIdx = x.parentRegistrations.findIndex(
              (r) =>
                normalizePairKey(r.parentName) === pKey && normalizePairKey(r.childName) === cKey,
            );
            const nextList =
              matchIdx >= 0
                ? x.parentRegistrations.map((r, i) => (i === matchIdx ? entry : r))
                : [entry, ...x.parentRegistrations];
            return {
              ...x,
              parentRegistrations: nextList,
            };
          });

          return {
            ok: true,
            mode: existing ? "updated" : "created",
            registration: entry,
          };
        },
        removeParentRegistration: (id) =>
          setState((x) => ({
            ...x,
            parentRegistrations: x.parentRegistrations.filter((r) => r.id !== id),
          })),
        getRegisteredEmailForChild: (childName) => {
          const resolved = childName?.trim() || resolveChildNameForNotify(state);
          return findRegistrationForChild(state.parentRegistrations, resolved);
        },
        addTherapistExchange: (studentText, therapistReply) =>
          setState((x) => {
            const time = formatNowTime();
            const steps = x.completedSteps.includes("therapist")
              ? x.completedSteps
              : [...x.completedSteps, "therapist"];
            const now = Date.now();
            const userEntry: TherapistMessage = {
              id: `ts-${now}`,
              sender: "student",
              text: studentText,
              at: `Today ${time}`,
              synced: !isOffline,
            };
            const replyEntry: TherapistMessage = {
              id: `tr-${now + 1}`,
              sender: "therapist",
              text: therapistReply,
              at: `Today ${time}`,
              synced: !isOffline,
            };
            return syncActiveStudentToRoster({
              ...x,
              xp: x.xp + 20,
              completedSteps: steps,
              therapistMessages: [...x.therapistMessages, userEntry, replyEntry].slice(-14),
            });
          }),
        addCustomCard: (card) =>
          setState((x) => {
            const entry: CustomTapCard = {
              id: `custom-${Date.now()}`,
              label: card.label,
              photoDataUrl: card.photoDataUrl,
              ...(card.audioDataUrl ? { audioDataUrl: card.audioDataUrl } : {}),
              createdAt: formatNowTime(),
            };
            return syncActiveStudentToRoster({
              ...x,
              customCards: [...x.customCards, entry].slice(-12),
            });
          }),
        removeCustomCard: (id) =>
          setState((x) =>
            syncActiveStudentToRoster({
              ...x,
              customCards: x.customCards.filter((card) => card.id !== id),
            }),
          ),
        syncPending: () =>
          setState((x) => {
            const markAlertSynced = (a: ParentAlert): ParentAlert => ({
              ...a,
              synced: true,
              emailStatus:
                a.notifiedEmail && a.emailStatus === "queued-offline" ? "sent" : a.emailStatus,
            });
            const syncedState: StoredState = {
              ...x,
              offlineMode: false,
              checkins: x.checkins.map((item) => ({ ...item, synced: true })),
              parentAlerts: x.parentAlerts.map(markAlertSynced),
              therapistMessages: x.therapistMessages.map((m) => ({ ...m, synced: true })),
              students: x.students.map((st) => ({
                ...st,
                checkins: st.checkins.map((c) => ({ ...c, synced: true })),
                parentAlerts: st.parentAlerts.map(markAlertSynced),
                therapistMessages: st.therapistMessages.map((m) => ({ ...m, synced: true })),
              })),
            };
            return syncActiveStudentToRoster(syncedState);
          }),
        loginStudent: (studentId) =>
          setState((x) => {
            const synced = syncActiveStudentToRoster(x);
            const target = synced.students.find((s) => s.id === studentId);
            if (!target) return synced;
            const time = formatNowTime();
            const updatedTarget: StudentProfile = {
              ...target,
              organisationName: target.organisationName || synced.organisationName,
              lastLoggedInAt: `Today ${time}`,
            };
            const students = synced.students.map((s) => (s.id === studentId ? updatedTarget : s));
            return applyStudentDataToWorkspace({ ...synced, students }, updatedTarget);
          }),
        logoutStudent: () =>
          setState((x) => {
            const synced = syncActiveStudentToRoster(x);
            return { ...synced, activeStudentId: null };
          }),
        addAndLoginStudent: (input) =>
          setState((x) => {
            const cleanName = input.name.trim();
            if (!cleanName) return x;
            const synced = syncActiveStudentToRoster(x);
            const time = formatNowTime();
            const hasInitialMood = Boolean(input.initialMood?.mood);
            const orgName = (input.organisationName ?? synced.organisationName).trim();
            const newStudent: StudentProfile = {
              id: `student-${Date.now()}`,
              name: cleanName,
              studentCode: (input.studentCode ?? "").trim(),
              grade: (input.grade ?? "").trim(),
              organisationName: orgName,
              cue: (input.cue ?? "").trim() || "Gentle visual prompts",
              conditions: Array.isArray(input.conditions) ? input.conditions : [],
              xp: hasInitialMood ? 20 : 0,
              streak: 1,
              completedSteps: hasInitialMood ? ["checkin"] : [],
              checkins: hasInitialMood
                ? [
                    {
                      id: `c-${Date.now()}`,
                      at: `Today ${time}`,
                      mood: input.initialMood!.mood,
                      note: input.initialMood!.note || "Initial educator check-in",
                      synced: !isOffline,
                    },
                  ]
                : [],
              parentAlerts: [],
              therapistMessages: DEFAULT_THERAPIST_MESSAGES,
              customCards: [],
              educatorNotes: (input.educatorNotes ?? "").trim(),
              lastLoggedInAt: `Today ${time}`,
            };
            const students = [newStudent, ...synced.students];
            return applyStudentDataToWorkspace(
              { ...synced, organisationName: orgName || synced.organisationName, students },
              newStudent,
            );
          }),
        updateStudent: (studentId, patch) =>
          setState((x) => {
            const synced = syncActiveStudentToRoster(x);
            const students = synced.students.map((s) =>
              s.id === studentId
                ? {
                    ...s,
                    ...(patch.name !== undefined ? { name: patch.name.trim() || s.name } : {}),
                    ...(patch.studentCode !== undefined
                      ? { studentCode: patch.studentCode.trim() }
                      : {}),
                    ...(patch.grade !== undefined ? { grade: patch.grade.trim() } : {}),
                    ...(patch.organisationName !== undefined
                      ? { organisationName: patch.organisationName.trim() }
                      : {}),
                    ...(patch.cue !== undefined ? { cue: patch.cue.trim() } : {}),
                    ...(patch.educatorNotes !== undefined
                      ? { educatorNotes: patch.educatorNotes }
                      : {}),
                    ...(patch.conditions !== undefined ? { conditions: patch.conditions } : {}),
                  }
                : s,
            );
            const updatedTarget = students.find((s) => s.id === studentId);
            if (
              updatedTarget &&
              synced.role === "educator" &&
              synced.activeStudentId === studentId
            ) {
              return {
                ...synced,
                students,
                conditions: updatedTarget.conditions,
              };
            }
            return { ...synced, students };
          }),
        removeStudent: (studentId) =>
          setState((x) => {
            const synced = syncActiveStudentToRoster(x);
            const remaining = synced.students.filter((s) => s.id !== studentId);
            const nextActiveId =
              synced.activeStudentId === studentId ? null : synced.activeStudentId;
            return {
              ...synced,
              students: remaining,
              activeStudentId: nextActiveId,
            };
          }),
      }}
    >
      {children}
    </C.Provider>
  );
}

export const useProfile = () => useContext(C);
