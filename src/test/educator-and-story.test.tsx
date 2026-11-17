import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { FirstThenBoard } from "@/components/StudioExtras";
import { ProfileProvider, useProfile } from "@/lib/profile-context";

function EducatorHarness() {
  const {
    role,
    activeStudent,
    students,
    xp,
    conditions,
    signIn,
    addAndLoginStudent,
    loginStudent,
    recordActivity,
  } = useProfile();

  return (
    <div>
      <button type="button" onClick={() => signIn("educator", "Ms. Fatima")}>
        Sign in Educator
      </button>
      <button
        type="button"
        onClick={() =>
          addAndLoginStudent({
            name: "Zayd R.",
            cue: "Visual schedule",
            conditions: ["dyslexia"],
          })
        }
      >
        Add Zayd
      </button>
      <button
        type="button"
        onClick={() => recordActivity("canvas", 25, { mood: "Proud", note: "Note 1" })}
      >
        Record Canvas
      </button>
      <button type="button" onClick={() => loginStudent("s-layla")}>
        Login Layla
      </button>
      <button type="button" onClick={() => loginStudent(students[0]?.id ?? "")}>
        Login First
      </button>
      <div data-testid="role">{role}</div>
      <div data-testid="active-name">{activeStudent?.name ?? "none"}</div>
      <div data-testid="xp">{xp}</div>
      <div data-testid="conditions">{conditions.join(",")}</div>
      <div data-testid="count">{students.length}</div>
    </div>
  );
}

describe("Educator individual student login & story refresh", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("persists individual student logins and data across reloads", () => {
    const { unmount } = render(
      <ProfileProvider>
        <EducatorHarness />
      </ProfileProvider>,
    );

    fireEvent.click(screen.getByText("Sign in Educator"));
    expect(screen.getByTestId("role").textContent).toBe("educator");
    expect(screen.getByTestId("active-name").textContent).toBe("Aarav K.");

    fireEvent.click(screen.getByText("Add Zayd"));
    expect(screen.getByTestId("active-name").textContent).toBe("Zayd R.");
    expect(screen.getByTestId("xp").textContent).toBe("0");
    expect(screen.getByTestId("conditions").textContent).toBe("dyslexia");

    fireEvent.click(screen.getByText("Record Canvas"));
    expect(screen.getByTestId("xp").textContent).toBe("25");

    fireEvent.click(screen.getByText("Login Layla"));
    expect(screen.getByTestId("active-name").textContent).toBe("Layla M.");
    expect(screen.getByTestId("xp").textContent).toBe("70");
    expect(screen.getByTestId("conditions").textContent).toBe("adhd,dyslexia");

    // Switch back to Zayd and confirm Zayd's 25 XP persisted
    fireEvent.click(screen.getByText("Login First"));
    expect(screen.getByTestId("active-name").textContent).toBe("Zayd R.");
    expect(screen.getByTestId("xp").textContent).toBe("25");

    unmount();

    // Re-mount simulating a browser reload
    render(
      <ProfileProvider>
        <EducatorHarness />
      </ProfileProvider>,
    );

    expect(screen.getByTestId("active-name").textContent).toBe("Zayd R.");
    expect(screen.getByTestId("xp").textContent).toBe("25");
    expect(screen.getByTestId("count").textContent).toBe("4");
  });

  it("changes the Noor Dove story when refreshed via Refresh Story", () => {
    render(
      <ProfileProvider>
        <EducatorHarness />
        <FirstThenBoard onGoToWriting={() => {}} onClaimReward={() => {}} />
      </ProfileProvider>,
    );

    fireEvent.click(screen.getByText("Sign in Educator"));
    fireEvent.click(screen.getByText("Open Noor Story (Educator)"));

    const firstHeading = screen.getByText(/Story \d+ of \d+/).nextElementSibling?.textContent;
    expect(firstHeading).toBeTruthy();

    act(() => {
      fireEvent.click(screen.getByText("Refresh Story"));
    });

    const secondHeading = screen.getByText(/Story \d+ of \d+/).nextElementSibling?.textContent;
    expect(secondHeading).toBeTruthy();
    expect(secondHeading).not.toBe(firstHeading);
  });
});
