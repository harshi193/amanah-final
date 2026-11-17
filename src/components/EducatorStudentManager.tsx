import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ClipboardCheck,
  LogIn,
  LogOut,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Trash2,
  UserCheck,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useProfile, type StudentProfile } from "@/lib/profile-context";
import { CONDITIONS } from "@/lib/profiles";
import { cn } from "@/lib/utils";

export function EducatorStudentManager({ compact = false }: { compact?: boolean }) {
  const {
    organisationName,
    setOrganisationName,
    students,
    activeStudent,
    loginStudent,
    logoutStudent,
    addAndLoginStudent,
    updateStudent,
    removeStudent,
    recordActivity,
    t,
  } = useProfile();

  const copy = t.home.educatorRoster;

  const [editingOrg, setEditingOrg] = useState(false);
  const [orgDraft, setOrgDraft] = useState(organisationName);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newGrade, setNewGrade] = useState("");
  const [newCue, setNewCue] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [newConditions, setNewConditions] = useState<string[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editCode, setEditCode] = useState("");
  const [editGrade, setEditGrade] = useState("");
  const [editCue, setEditCue] = useState("");
  const [editNotes, setEditNotes] = useState("");

  const [quickMood, setQuickMood] = useState(t.studio.moods[0]?.label ?? "Happy");
  const [quickNote, setQuickNote] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setOrgDraft(organisationName);
  }, [organisationName]);

  function handleSaveOrg(e: React.FormEvent) {
    e.preventDefault();
    if (!orgDraft.trim()) return;
    setOrganisationName(orgDraft);
    setEditingOrg(false);
  }

  function toggleNewCondition(id: string) {
    setNewConditions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }

  function handleCreateStudent(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    addAndLoginStudent({
      name: newName,
      studentCode: newCode,
      grade: newGrade,
      organisationName,
      cue: newCue,
      conditions: newConditions,
      educatorNotes: newNotes,
    });
    setNewName("");
    setNewCode("");
    setNewGrade("");
    setNewCue("");
    setNewNotes("");
    setNewConditions([]);
    setShowAddForm(false);
  }

  function startEditing(student: StudentProfile) {
    setEditingId(student.id);
    setEditName(student.name);
    setEditCode(student.studentCode);
    setEditGrade(student.grade);
    setEditCue(student.cue);
    setEditNotes(student.educatorNotes);
  }

  function saveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingId) return;
    updateStudent(editingId, {
      name: editName,
      studentCode: editCode,
      grade: editGrade,
      cue: editCue,
      educatorNotes: editNotes,
    });
    setEditingId(null);
  }

  function handleQuickCheckin(e: React.FormEvent) {
    e.preventDefault();
    if (!activeStudent) return;
    const noteText = quickNote.trim() || copy.quickNoteTitle;
    recordActivity("checkin", 20, { mood: quickMood, note: noteText });
    setQuickNote("");
  }

  if (compact) {
    return (
      <div className="space-y-3 rounded-2xl border bg-card p-4 shadow-[var(--shadow-soft)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/30 text-primary-strong">
              <UserCheck className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-secondary">
                {activeStudent ? copy.sessionBanner(activeStudent.name) : copy.noActiveTitle}
                {organisationName ? ` · ${organisationName}` : ""}
              </p>
              <p className="text-xs text-muted-foreground">
                {activeStudent
                  ? `${activeStudent.grade ? `${activeStudent.grade} · ` : ""}${activeStudent.studentCode ? `${activeStudent.studentCode} · ` : ""}${activeStudent.xp} XP · ${copy.needsCountLabel(activeStudent.conditions.length)} · ${activeStudent.cue}`
                  : copy.noActiveDesc}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="studio-student-switch" className="sr-only">
              {copy.switchStudent}
            </label>
            <select
              id="studio-student-switch"
              value={activeStudent?.id ?? ""}
              onChange={(e) => {
                if (e.target.value) loginStudent(e.target.value);
              }}
              className="rounded-xl border bg-background px-3 py-1.5 text-xs font-bold text-foreground"
            >
              <option value="" disabled>
                {copy.switchStudent}…
              </option>
              {students.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name}
                  {st.grade ? ` (${st.grade})` : ""} · {st.xp} XP
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setShowAddForm((o) => !o)}
              className="inline-flex items-center gap-1 whitespace-nowrap shrink-0 rounded-xl bg-primary-strong px-3 py-1.5 text-xs font-bold text-secondary-foreground"
            >
              <UserPlus className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{showAddForm ? copy.cancelBtn : copy.addBtn}</span>
            </button>

            {activeStudent && (
              <button
                type="button"
                onClick={logoutStudent}
                className="inline-flex items-center gap-1 whitespace-nowrap shrink-0 rounded-xl border bg-background px-3 py-1.5 text-xs font-bold text-foreground hover:border-primary-strong"
              >
                <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{copy.logoutBtn}</span>
              </button>
            )}
          </div>
        </div>

        {showAddForm && (
          <form
            onSubmit={handleCreateStudent}
            className="grid gap-2.5 border-t pt-3 sm:grid-cols-2 lg:grid-cols-[1fr_0.7fr_0.7fr_1fr_auto]"
          >
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={copy.namePlaceholder}
              aria-label={copy.nameLabel}
              className="rounded-xl border bg-background px-3 py-2 text-xs text-foreground"
            />
            <input
              type="text"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              placeholder={copy.studentCodePlaceholder}
              aria-label={copy.studentCodeLabel}
              className="rounded-xl border bg-background px-3 py-2 text-xs text-foreground"
            />
            <input
              type="text"
              value={newGrade}
              onChange={(e) => setNewGrade(e.target.value)}
              placeholder={copy.gradePlaceholder}
              aria-label={copy.gradeLabel}
              className="rounded-xl border bg-background px-3 py-2 text-xs text-foreground"
            />
            <input
              type="text"
              value={newCue}
              onChange={(e) => setNewCue(e.target.value)}
              placeholder={copy.cuePlaceholder}
              aria-label={copy.cueLabel}
              className="rounded-xl border bg-background px-3 py-2 text-xs text-foreground"
            />
            <button
              type="submit"
              disabled={!newName.trim()}
              className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-accent px-4 py-2 text-xs font-bold text-accent-foreground disabled:opacity-45"
            >
              <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{copy.saveAndLoginBtn}</span>
            </button>
          </form>
        )}
      </div>
    );
  }

  const filteredStudents = search.trim()
    ? students.filter((s) => {
        const q = search.trim().toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.cue.toLowerCase().includes(q) ||
          s.studentCode.toLowerCase().includes(q) ||
          s.grade.toLowerCase().includes(q)
        );
      })
    : students;

  return (
    <section
      aria-label={copy.title}
      className="space-y-6 rounded-[2rem] border bg-card p-6 shadow-[var(--shadow-soft)]"
    >
      {/* Header Row */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/30 text-primary-strong">
            <Users className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{copy.title}</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">{copy.subtitle}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm((o) => !o)}
          className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 rounded-xl bg-primary-strong px-4 py-2.5 text-sm font-bold text-secondary-foreground transition-opacity hover:opacity-90"
        >
          {showAddForm ? (
            <>
              <X className="h-4 w-4" aria-hidden="true" />
              <span>{copy.cancelBtn}</span>
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" aria-hidden="true" />
              <span>{copy.addBtn}</span>
            </>
          )}
        </button>
      </div>

      {/* Educator Organisation Name Bar */}
      <div className="rounded-2xl border bg-background p-4">
        {editingOrg || !organisationName ? (
          <form onSubmit={handleSaveOrg} className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label
                htmlFor="educator-org-input"
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary"
              >
                <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{copy.orgLabel}</span>
              </label>
              <input
                id="educator-org-input"
                type="text"
                required
                value={orgDraft}
                onChange={(e) => setOrgDraft(e.target.value)}
                placeholder={copy.orgPlaceholder}
                className="mt-1.5 w-full rounded-xl border bg-card px-3.5 py-2 text-sm text-foreground"
              />
              {!organisationName && (
                <p className="mt-1 text-xs text-muted-foreground">{copy.orgMissingPrompt}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {organisationName && (
                <button
                  type="button"
                  onClick={() => {
                    setOrgDraft(organisationName);
                    setEditingOrg(false);
                  }}
                  className="rounded-xl border bg-card px-3.5 py-2 text-xs font-bold text-foreground"
                >
                  {copy.cancelBtn}
                </button>
              )}
              <button
                type="submit"
                disabled={!orgDraft.trim()}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-accent px-4 py-2 text-xs font-bold text-accent-foreground disabled:opacity-45"
              >
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{copy.orgSaveBtn}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Building2 className="h-4 w-4 text-primary-strong" aria-hidden="true" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {copy.orgLabel}
                </p>
                <p className="text-sm font-bold text-foreground">{organisationName}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setEditingOrg(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border bg-card px-3 py-1.5 text-xs font-bold text-foreground hover:border-primary-strong"
            >
              <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{copy.orgEditBtn}</span>
            </button>
          </div>
        )}
      </div>

      {/* Add & Log In New Student Form */}
      {showAddForm && (
        <form
          onSubmit={handleCreateStudent}
          className="space-y-4 rounded-2xl border-2 border-primary-strong/50 bg-background p-5"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-secondary">
            {copy.detailsTitle}
            {organisationName ? ` · ${organisationName}` : ""}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="new-student-name"
                className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                {copy.nameLabel} *
              </label>
              <input
                id="new-student-name"
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={copy.namePlaceholder}
                className="mt-1.5 w-full rounded-xl border bg-card px-3.5 py-2.5 text-sm text-foreground"
              />
            </div>

            <div>
              <label
                htmlFor="new-student-grade"
                className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                {copy.gradeLabel}
              </label>
              <input
                id="new-student-grade"
                type="text"
                value={newGrade}
                onChange={(e) => setNewGrade(e.target.value)}
                placeholder={copy.gradePlaceholder}
                className="mt-1.5 w-full rounded-xl border bg-card px-3.5 py-2.5 text-sm text-foreground"
              />
            </div>

            <div>
              <label
                htmlFor="new-student-code"
                className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                {copy.studentCodeLabel}
              </label>
              <input
                id="new-student-code"
                type="text"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder={copy.studentCodePlaceholder}
                className="mt-1.5 w-full rounded-xl border bg-card px-3.5 py-2.5 text-sm text-foreground"
              />
            </div>

            <div>
              <label
                htmlFor="new-student-cue"
                className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                {copy.cueLabel}
              </label>
              <input
                id="new-student-cue"
                type="text"
                value={newCue}
                onChange={(e) => setNewCue(e.target.value)}
                placeholder={copy.cuePlaceholder}
                className="mt-1.5 w-full rounded-xl border bg-card px-3.5 py-2.5 text-sm text-foreground"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="new-student-notes"
              className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              {copy.notesLabel}
            </label>
            <input
              id="new-student-notes"
              type="text"
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              placeholder={copy.notesPlaceholder}
              className="mt-1.5 w-full rounded-xl border bg-card px-3.5 py-2.5 text-sm text-foreground"
            />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {copy.needsLabel}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {CONDITIONS.map((c) => {
                const selected = newConditions.includes(c.id);
                const label = t.conditions.items[c.id]?.label ?? c.label;
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleNewCondition(c.id)}
                    className={cn(
                      "rounded-xl border px-3 py-1.5 text-xs font-bold transition-colors",
                      selected
                        ? "border-primary-strong bg-primary/35 text-foreground"
                        : "border-border bg-card text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {selected ? "✓ " : ""}
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t pt-3">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="rounded-xl border bg-card px-4 py-2 text-xs font-bold text-foreground hover:bg-muted"
            >
              {copy.cancelBtn}
            </button>
            <button
              type="submit"
              disabled={!newName.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2 text-xs font-bold text-accent-foreground disabled:opacity-45"
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
              <span>{copy.saveAndLoginBtn}</span>
            </button>
          </div>
        </form>
      )}

      {/* Active Student Dashboard */}
      {activeStudent ? (
        <div className="space-y-4 rounded-2xl border-2 border-accent bg-accent/15 p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-lg bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{copy.activeBadge}</span>
                </span>
                {activeStudent.studentCode && (
                  <span className="rounded-lg border bg-card px-2 py-0.5 text-xs font-bold text-foreground tabular-nums">
                    {activeStudent.studentCode}
                  </span>
                )}
                {activeStudent.grade && (
                  <span className="rounded-lg border bg-card px-2 py-0.5 text-xs font-semibold text-secondary">
                    {activeStudent.grade}
                  </span>
                )}
                <span className="text-xs font-semibold text-muted-foreground tabular-nums">
                  {copy.lastLogin}: {activeStudent.lastLoggedInAt}
                </span>
              </div>
              <h3 className="mt-2 text-2xl font-bold text-foreground">{activeStudent.name}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{activeStudent.cue}</p>
              {activeStudent.educatorNotes && (
                <p className="mt-1.5 text-xs text-foreground/85">{activeStudent.educatorNotes}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                to="/studio"
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-primary-strong px-4 py-2 text-xs font-bold text-secondary-foreground"
              >
                <span>{copy.openStudioBtn}</span>
                <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={() => startEditing(activeStudent)}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl border bg-card px-3 py-2 text-xs font-bold text-foreground hover:border-primary-strong"
              >
                <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{copy.editBtn}</span>
              </button>
              <button
                type="button"
                onClick={logoutStudent}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl border bg-card px-3 py-2 text-xs font-bold text-foreground hover:border-primary-strong"
              >
                <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{copy.logoutBtn}</span>
              </button>
            </div>
          </div>

          {/* Inline Edit Form */}
          {editingId === activeStudent.id && (
            <form
              onSubmit={saveEdit}
              className="grid gap-3 rounded-2xl border bg-card p-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                aria-label={copy.nameLabel}
                placeholder={copy.namePlaceholder}
                className="rounded-xl border bg-background px-3 py-2 text-xs text-foreground"
              />
              <input
                type="text"
                value={editCode}
                onChange={(e) => setEditCode(e.target.value)}
                aria-label={copy.studentCodeLabel}
                placeholder={copy.studentCodePlaceholder}
                className="rounded-xl border bg-background px-3 py-2 text-xs text-foreground"
              />
              <input
                type="text"
                value={editGrade}
                onChange={(e) => setEditGrade(e.target.value)}
                aria-label={copy.gradeLabel}
                placeholder={copy.gradePlaceholder}
                className="rounded-xl border bg-background px-3 py-2 text-xs text-foreground"
              />
              <input
                type="text"
                value={editCue}
                onChange={(e) => setEditCue(e.target.value)}
                aria-label={copy.cueLabel}
                placeholder={copy.cuePlaceholder}
                className="rounded-xl border bg-background px-3 py-2 text-xs text-foreground"
              />
              <div className="flex items-center gap-2 sm:col-span-2">
                <input
                  type="text"
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  aria-label={copy.notesLabel}
                  placeholder={copy.notesPlaceholder}
                  className="min-w-0 flex-1 rounded-xl border bg-background px-3 py-2 text-xs text-foreground"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-accent px-3 py-2 text-xs font-bold text-accent-foreground"
                >
                  {copy.saveChangesBtn}
                </button>
              </div>
            </form>
          )}

          {/* Active Student Metrics & Needs Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <span className="inline-flex items-center gap-1 rounded-lg border bg-card px-2.5 py-1 text-primary-strong tabular-nums">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{activeStudent.xp} XP</span>
            </span>
            <span className="rounded-lg border bg-card px-2.5 py-1 text-foreground tabular-nums">
              {copy.checkinsCount(activeStudent.checkins.length)}
            </span>
            <span className="rounded-lg border bg-card px-2.5 py-1 text-foreground tabular-nums">
              {copy.alertsCount(activeStudent.parentAlerts.length)}
            </span>
            <span className="rounded-lg border bg-card px-2.5 py-1 text-foreground tabular-nums">
              {copy.cardsCount(activeStudent.customCards.length)}
            </span>
            {activeStudent.conditions.map((cid) => (
              <span
                key={cid}
                className="rounded-lg border border-primary-strong/40 bg-primary/25 px-2.5 py-1 text-foreground"
              >
                {t.conditions.items[cid]?.label ?? cid}
              </span>
            ))}
          </div>

          {/* Quick Observation / Check-in + Saved Data */}
          <div className="grid gap-4 border-t border-border/70 pt-4 lg:grid-cols-2">
            <form
              onSubmit={handleQuickCheckin}
              className="space-y-2.5 rounded-2xl border bg-card p-4"
            >
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary">
                <ClipboardCheck className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{copy.quickNoteTitle}</span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {t.studio.moods.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setQuickMood(m.label)}
                    className={cn(
                      "rounded-lg border px-2.5 py-1 text-xs font-bold",
                      quickMood === m.label
                        ? "border-primary-strong bg-primary/30 text-foreground"
                        : "bg-background text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {m.e} {m.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={quickNote}
                  onChange={(e) => setQuickNote(e.target.value)}
                  placeholder={copy.quickNotePlaceholder}
                  aria-label={copy.quickNoteTitle}
                  className="min-w-0 flex-1 rounded-xl border bg-background px-3 py-2 text-xs text-foreground"
                />
                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-accent px-3.5 py-2 text-xs font-bold text-accent-foreground"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{copy.saveCheckinBtn}</span>
                </button>
              </div>
            </form>

            <div className="rounded-2xl border bg-card p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {copy.recentDataTitle}
              </p>
              {activeStudent.checkins.length === 0 ? (
                <p className="mt-2 text-xs text-muted-foreground">{copy.noCheckins}</p>
              ) : (
                <ul className="mt-2 space-y-1.5">
                  {activeStudent.checkins.slice(0, 3).map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-xl border bg-background px-3 py-2 text-xs"
                    >
                      <span className="font-semibold text-foreground">
                        {item.mood} ·{" "}
                        <span className="font-normal text-muted-foreground">{item.note}</span>
                      </span>
                      <span className="text-[11px] text-muted-foreground tabular-nums">
                        {item.at}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-primary-strong/45 bg-background p-5 text-center">
          <p className="font-bold text-foreground">{copy.noActiveTitle}</p>
          <p className="mt-1 text-sm text-muted-foreground">{copy.noActiveDesc}</p>
        </div>
      )}

      {/* Classroom Student Roster Grid */}
      {students.length > 4 && (
        <div className="relative">
          <Search
            className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={copy.searchPlaceholder}
            aria-label={copy.searchPlaceholder}
            className="w-full rounded-xl border bg-background py-2.5 pe-4 ps-10 text-sm text-foreground"
          />
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => {
          const isActive = activeStudent?.id === student.id;
          const latest = student.checkins[0];
          return (
            <div
              key={student.id}
              className={cn(
                "flex flex-col justify-between rounded-2xl border-2 p-4 transition-colors",
                isActive ? "border-accent bg-accent/15" : "border-border bg-background",
              )}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-base font-bold text-foreground">{student.name}</p>
                    {(student.grade || student.studentCode) && (
                      <p className="text-[11px] font-semibold text-secondary">
                        {[student.studentCode, student.grade].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    <p className="mt-0.5 text-xs text-muted-foreground">{student.cue}</p>
                  </div>
                  {students.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStudent(student.id)}
                      aria-label={`${copy.removeBtn} ${student.name}`}
                      className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded-md border bg-card px-2 py-0.5 text-[11px] font-bold text-primary-strong tabular-nums">
                    {student.xp} XP
                  </span>
                  <span className="rounded-md border bg-card px-2 py-0.5 text-[11px] font-semibold text-muted-foreground tabular-nums">
                    {copy.checkinsCount(student.checkins.length)}
                  </span>
                  {student.conditions.slice(0, 2).map((cid) => (
                    <span
                      key={cid}
                      className="rounded-md bg-primary/25 px-2 py-0.5 text-[11px] font-semibold text-foreground"
                    >
                      {t.conditions.items[cid]?.label ?? cid}
                    </span>
                  ))}
                  {student.conditions.length > 2 && (
                    <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                      +{student.conditions.length - 2}
                    </span>
                  )}
                </div>

                {latest && (
                  <p className="mt-2.5 truncate text-xs text-muted-foreground">
                    <strong className="text-foreground">{latest.mood}</strong> · {latest.at}
                  </p>
                )}
              </div>

              <div className="mt-4">
                {isActive ? (
                  <span className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-accent px-3 py-2 text-xs font-bold text-accent-foreground">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{copy.activeBtn}</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => loginStudent(student.id)}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary-strong px-3 py-2 text-xs font-bold text-secondary-foreground transition-opacity hover:opacity-90"
                  >
                    <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{copy.loginBtn}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
