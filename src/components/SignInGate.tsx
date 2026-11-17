import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Building2, Home, Sparkles, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { AmanahLogo, DoveMascot } from "@/components/BrandAndDove";
import { useProfile } from "@/lib/profile-context";
import type { Role } from "@/lib/profiles";
import { cn } from "@/lib/utils";

const SIGNIN_ICONS: { id: Role; Icon: typeof Sparkles }[] = [
  { id: "child", Icon: Sparkles },
  { id: "parent", Icon: Home },
  { id: "educator", Icon: BookOpen },
];

export function SignInGate() {
  const { signIn, addAndLoginStudent, students, activeStudentId, organisationName, t } =
    useProfile();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Role | null>(null);
  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState(organisationName);
  const [studentMode, setStudentMode] = useState<"existing" | "new">(
    students.length > 0 ? "existing" : "new",
  );
  const [selectedStudentId, setSelectedStudentId] = useState<string>(activeStudentId ?? "");

  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentCode, setNewStudentCode] = useState("");
  const [newStudentGrade, setNewStudentGrade] = useState("");
  const [newStudentCue, setNewStudentCue] = useState("");

  useEffect(() => {
    if (organisationName && !orgName) {
      setOrgName(organisationName);
    }
  }, [organisationName, orgName]);

  const educatorCopy = t.home.educatorRoster;
  const educatorValid =
    selected !== "educator" ||
    (orgName.trim().length > 0 && (studentMode === "existing" || newStudentName.trim().length > 0));

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    if (!selected || !educatorValid) return;

    if (selected === "educator") {
      if (studentMode === "new" && newStudentName.trim()) {
        signIn("educator", name, null, orgName);
        addAndLoginStudent({
          name: newStudentName,
          studentCode: newStudentCode,
          grade: newStudentGrade,
          organisationName: orgName,
          cue: newStudentCue,
        });
      } else {
        signIn("educator", name, selectedStudentId || null, orgName);
      }
      void navigate({ to: "/" });
      return;
    }

    signIn(selected, name);
    void navigate({ to: "/" });
  }

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-3xl items-center justify-center px-5 py-10">
      <form
        id="signin-gate"
        onSubmit={handleContinue}
        className="w-full rounded-[2rem] border bg-card p-7 shadow-[var(--shadow-soft)] sm:p-10"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AmanahLogo className="h-11 w-11" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-secondary">
                {t.signin.welcome}
              </p>
              <h1 className="text-2xl font-bold sm:text-3xl">{t.signin.who}</h1>
            </div>
          </div>
          <DoveMascot mood="happy" size="sm" interactive />
        </div>

        <div role="radiogroup" aria-label={t.signin.who} className="mt-6 grid gap-3 sm:grid-cols-3">
          {SIGNIN_ICONS.map(({ id, Icon }) => {
            const active = selected === id;
            const roleCopy = t.signin.roles[id];
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setSelected(id)}
                className={cn(
                  "flex flex-col items-start rounded-2xl border-2 p-5 text-start transition-colors duration-200",
                  active
                    ? "border-primary-strong bg-primary/30"
                    : "border-border bg-background hover:border-primary-strong",
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl",
                    active
                      ? "bg-primary-strong text-secondary-foreground"
                      : "bg-muted text-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="mt-3 text-base font-bold text-foreground">{roleCopy.title}</span>
                <span className="mt-1 text-xs text-muted-foreground">{roleCopy.short}</span>
              </button>
            );
          })}
        </div>

        {selected === "educator" && (
          <div className="mt-5 space-y-4 rounded-2xl border bg-background p-4 sm:p-5">
            <div>
              <label
                htmlFor="signin-org-name"
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary"
              >
                <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.signin.orgNameLabel} *</span>
              </label>
              <input
                id="signin-org-name"
                type="text"
                required
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder={t.signin.orgNamePlaceholder}
                className="mt-1.5 w-full rounded-xl border bg-card px-3.5 py-2.5 text-sm font-semibold text-foreground"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">{t.signin.orgRequiredHint}</p>
            </div>

            <div className="border-t pt-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t.signin.studentFeedHeading}
                </p>
                <div className="inline-flex rounded-xl border bg-card p-1 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setStudentMode("existing")}
                    className={cn(
                      "rounded-lg px-2.5 py-1 transition-colors",
                      studentMode === "existing"
                        ? "bg-primary-strong text-secondary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {t.signin.chooseExistingStudent}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStudentMode("new")}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-lg px-2.5 py-1 transition-colors",
                      studentMode === "new"
                        ? "bg-primary-strong text-secondary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <UserPlus className="h-3 w-3" aria-hidden="true" />
                    <span>{t.signin.orAddNewStudent}</span>
                  </button>
                </div>
              </div>

              {studentMode === "existing" ? (
                <div className="mt-2.5">
                  <label htmlFor="signin-student" className="sr-only">
                    {educatorCopy.startWithStudent}
                  </label>
                  <select
                    id="signin-student"
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="w-full rounded-xl border bg-card px-3.5 py-2.5 text-sm font-semibold text-foreground"
                  >
                    <option value="">{educatorCopy.rosterChoice}</option>
                    {students.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name}
                        {st.grade ? ` · ${st.grade}` : ""} · {st.xp} XP
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="signin-new-student-name"
                      className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      {educatorCopy.nameLabel} *
                    </label>
                    <input
                      id="signin-new-student-name"
                      type="text"
                      required
                      value={newStudentName}
                      onChange={(e) => setNewStudentName(e.target.value)}
                      placeholder={educatorCopy.namePlaceholder}
                      className="mt-1 w-full rounded-xl border bg-card px-3 py-2 text-sm text-foreground"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="signin-new-student-grade"
                      className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      {educatorCopy.gradeLabel}
                    </label>
                    <input
                      id="signin-new-student-grade"
                      type="text"
                      value={newStudentGrade}
                      onChange={(e) => setNewStudentGrade(e.target.value)}
                      placeholder={educatorCopy.gradePlaceholder}
                      className="mt-1 w-full rounded-xl border bg-card px-3 py-2 text-sm text-foreground"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="signin-new-student-code"
                      className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      {educatorCopy.studentCodeLabel}
                    </label>
                    <input
                      id="signin-new-student-code"
                      type="text"
                      value={newStudentCode}
                      onChange={(e) => setNewStudentCode(e.target.value)}
                      placeholder={educatorCopy.studentCodePlaceholder}
                      className="mt-1 w-full rounded-xl border bg-card px-3 py-2 text-sm text-foreground"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="signin-new-student-cue"
                      className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      {educatorCopy.cueLabel}
                    </label>
                    <input
                      id="signin-new-student-cue"
                      type="text"
                      value={newStudentCue}
                      onChange={(e) => setNewStudentCue(e.target.value)}
                      placeholder={educatorCopy.cuePlaceholder}
                      className="mt-1 w-full rounded-xl border bg-card px-3 py-2 text-sm text-foreground"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label
              htmlFor="signin-name"
              className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              {t.signin.firstNameOptional}
            </label>
            <input
              id="signin-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={
                selected ? t.signin.roles[selected].placeholder : t.signin.roles.parent.placeholder
              }
              className="mt-1.5 w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground"
            />
          </div>

          <button
            type="submit"
            disabled={!selected || !educatorValid}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 rounded-xl bg-primary-strong px-6 py-3 text-sm font-bold text-secondary-foreground transition-opacity hover:opacity-90 disabled:opacity-45"
          >
            <span>{t.signin.signInBtn}</span>
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
}
