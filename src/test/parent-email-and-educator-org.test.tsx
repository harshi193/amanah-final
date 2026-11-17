import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ParentNotificationSetup } from "@/components/ParentNotificationSetup";
import { ProfileProvider, useProfile } from "@/lib/profile-context";

function ParentAndEducatorHarness() {
  const {
    role,
    userName,
    organisationName,
    activeStudent,
    parentRegistrations,
    parentAlerts,
    isOffline,
    signIn,
    setRole,
    setOfflineMode,
    notifyParent,
    syncPending,
    addAndLoginStudent,
  } = useProfile();

  return (
    <div>
      <button type="button" onClick={() => signIn("parent", "Priya")}>
        Sign in Parent
      </button>
      <button type="button" onClick={() => signIn("child", "Aarav")}>
        Switch to Child Aarav
      </button>
      <button type="button" onClick={() => setRole("parent")}>
        Back to Parent
      </button>
      <button type="button" onClick={() => notifyParent("🙋 I need help")}>
        Send Card Notification
      </button>
      <button type="button" onClick={() => setOfflineMode(true)}>
        Go Offline
      </button>
      <button type="button" onClick={() => syncPending()}>
        Sync Now
      </button>
      <button
        type="button"
        onClick={() => {
          signIn("educator", "Ms. Fatima", null, "Al Noor Inclusive Academy");
          addAndLoginStudent({
            name: "Omar T.",
            studentCode: "STU-205",
            grade: "Grade 5 · B",
            cue: "Quiet front-left desk",
          });
        }}
      >
        Feed Educator Org And Student
      </button>

      {role === "parent" && <ParentNotificationSetup />}

      <div data-testid="role">{role ?? "none"}</div>
      <div data-testid="user-name">{userName}</div>
      <div data-testid="org-name">{organisationName}</div>
      <div data-testid="student-code">{activeStudent?.studentCode ?? ""}</div>
      <div data-testid="student-grade">{activeStudent?.grade ?? ""}</div>
      <div data-testid="reg-count">{parentRegistrations.length}</div>
      <div data-testid="reg-emails">{parentRegistrations.map((r) => r.email).join(",")}</div>
      <div data-testid="latest-alert-email">{parentAlerts[0]?.notifiedEmail ?? "none"}</div>
      <div data-testid="latest-alert-status">{parentAlerts[0]?.emailStatus ?? "none"}</div>
      <div data-testid="offline">{String(isOffline)}</div>
    </div>
  );
}

describe("Parent child notification email & Educator org/student details", () => {
  const fetchSpy = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ ok: true, delivery: "recorded" }),
  });

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    fetchSpy.mockClear();
    vi.stubGlobal("fetch", fetchSpy);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("registers child email without verification, enforces 1 email per pair, and notifies parent email on tap", async () => {
    render(
      <ProfileProvider>
        <ParentAndEducatorHarness />
      </ProfileProvider>,
    );

    fireEvent.click(screen.getByText("Sign in Parent"));

    const childInput = screen.getByLabelText("Child's name");
    const emailInput = screen.getByLabelText("Parent notification email ID");

    fireEvent.change(childInput, { target: { value: "Aarav" } });
    fireEvent.change(emailInput, { target: { value: "priya@family.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Register child email" }));

    expect(screen.getByTestId("reg-count").textContent).toBe("1");
    expect(screen.getByTestId("reg-emails").textContent).toBe("priya@family.com");
    expect(screen.getByText(/Active · No verification needed/)).toBeInTheDocument();

    // Registering again for same parent + child pair must update the single email, not duplicate
    fireEvent.change(screen.getByLabelText("Child's name"), { target: { value: "Aarav" } });
    fireEvent.change(screen.getByLabelText("Parent notification email ID"), {
      target: { value: "priya.updated@family.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Update pair email" }));

    expect(screen.getByTestId("reg-count").textContent).toBe("1");
    expect(screen.getByTestId("reg-emails").textContent).toBe("priya.updated@family.com");

    // Child sends a notification -> parent email is notified via /api/notify-parent
    fireEvent.click(screen.getByText("Switch to Child Aarav"));
    fireEvent.click(screen.getByText("Send Card Notification"));

    expect(screen.getByTestId("latest-alert-email").textContent).toBe("priya.updated@family.com");
    expect(screen.getByTestId("latest-alert-status").textContent).toBe("sent");

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    const [url, init] = fetchSpy.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/notify-parent");
    const body = JSON.parse(String(init.body)) as {
      childName: string;
      parentEmail: string;
      card: string;
    };
    expect(body.childName).toBe("Aarav");
    expect(body.parentEmail).toBe("priya.updated@family.com");
    expect(body.card).toBe("🙋 I need help");

    // Offline queueing -> Sync dispatches queued email
    fireEvent.click(screen.getByText("Go Offline"));
    fireEvent.click(screen.getByText("Send Card Notification"));
    expect(screen.getByTestId("latest-alert-status").textContent).toBe("queued-offline");
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText("Sync Now"));
    expect(screen.getByTestId("latest-alert-status").textContent).toBe("sent");
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(2);
    });
  });

  it("saves educator organisation name and fuller student details across reloads", () => {
    const { unmount } = render(
      <ProfileProvider>
        <ParentAndEducatorHarness />
      </ProfileProvider>,
    );

    fireEvent.click(screen.getByText("Feed Educator Org And Student"));
    expect(screen.getByTestId("org-name").textContent).toBe("Al Noor Inclusive Academy");
    expect(screen.getByTestId("student-code").textContent).toBe("STU-205");
    expect(screen.getByTestId("student-grade").textContent).toBe("Grade 5 · B");

    unmount();

    render(
      <ProfileProvider>
        <ParentAndEducatorHarness />
      </ProfileProvider>,
    );

    expect(screen.getByTestId("org-name").textContent).toBe("Al Noor Inclusive Academy");
    expect(screen.getByTestId("student-code").textContent).toBe("STU-205");
    expect(screen.getByTestId("student-grade").textContent).toBe("Grade 5 · B");
  });
});
