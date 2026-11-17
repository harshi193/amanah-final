import { QueryClient } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  rootRouteId,
} from "@tanstack/react-router";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { Header } from "@/components/Header";
import { SignInGate } from "@/components/SignInGate";
import { ProfileProvider, useProfile } from "@/lib/profile-context";
import { routeTree } from "@/routeTree.gen";

describe("App routing & log in / log out flow", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("matches all main Amanah pages including /signin instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    for (const path of ["/", "/about", "/studio", "/partnership", "/chat", "/signin"]) {
      const matches = router.matchRoutes(path);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    }
  });

  it("logs in via SignInGate to / and logs out via Header button to /signin", async () => {
    function HomeProbe() {
      const { role, signedIn } = useProfile();
      return (
        <div data-testid="home-screen">
          Signed in: {String(signedIn)} · {role}
        </div>
      );
    }

    function RootHarness() {
      const { signedIn } = useProfile();
      return (
        <div>
          <Header />
          <main>{signedIn ? <Outlet /> : <SignInGate />}</main>
        </div>
      );
    }

    const rootRoute = createRootRoute({ component: RootHarness });
    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/",
      component: HomeProbe,
    });
    const studioRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/studio",
      component: () => <div data-testid="studio-screen">Studio</div>,
    });
    const signinRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/signin",
      component: SignInGate,
    });
    const testTree = rootRoute.addChildren([indexRoute, studioRoute, signinRoute]);
    const router = createRouter({
      routeTree: testTree,
      history: createMemoryHistory({ initialEntries: ["/signin"] }),
    });

    render(
      <ProfileProvider>
        <RouterProvider router={router} />
      </ProfileProvider>,
    );

    // Log in button shown in Header when logged out
    await screen.findByText("Who is signing in?");
    expect(screen.getByRole("link", { name: "Log in" })).toBeInTheDocument();

    // Select Parent role and click Log in
    fireEvent.click(screen.getByRole("radio", { name: /Parent \/ Guardian/i }));
    fireEvent.click(screen.getByRole("button", { name: "Log in" }));

    await waitFor(() => {
      expect(screen.getByTestId("home-screen")).toBeInTheDocument();
      expect(router.state.location.pathname).toBe("/");
    });

    // Navigate to /studio, then click Log out -> leads to /signin sign-in page
    await router.navigate({ to: "/studio" });
    await screen.findByTestId("studio-screen");

    fireEvent.click(screen.getByRole("button", { name: "Log out" }));

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/signin");
      expect(screen.getByText("Who is signing in?")).toBeInTheDocument();
    });
  });
});
