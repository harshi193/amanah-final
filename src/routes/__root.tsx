import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { AmanahLogo } from "@/components/BrandAndDove";
import { ComfortBar } from "@/components/ComfortBar";
import { DoveChat } from "@/components/DoveChat";
import { GuardianDrawer } from "@/components/GuardianDrawer";
import { Header } from "@/components/Header";
import { SignInGate } from "@/components/SignInGate";
import { reportLovableError } from "@/lib/lovable-error-reporting";
import { registerOfflineServiceWorker } from "@/lib/offline";
import { ProfileProvider, useProfile } from "@/lib/profile-context";
import { cn } from "@/lib/utils";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-primary-strong px-5 py-2.5 text-sm font-bold text-secondary-foreground"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page did not load
        </h1>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-xl bg-primary-strong px-4 py-2 text-sm font-bold text-secondary-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border bg-card px-4 py-2 text-sm font-bold text-foreground"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Amanah — Gentle support for every child" },
      {
        name: "description",
        content:
          "Accessible support connecting neurodivergent students with parents and educators across the UAE–India Vision 2030 partnership.",
      },
      { name: "theme-color", content: "#F7EEDB" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: "Amanah" },
      { property: "og:title", content: "Amanah" },
      {
        property: "og:description",
        content: "Accessible child support for Vision 2030 & SDG 3.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "icon", href: "/icon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/icon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Lexend:wght@400;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-screen flex-col">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function AppShellContent() {
  const { signedIn, deviceMode, t } = useProfile();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-card focus:px-4 focus:py-2 focus:font-bold"
      >
        {t.nav.skipToContent}
      </a>
      <Header />
      <ComfortBar />
      <main
        id="main"
        className={cn(
          "flex-1 transition-all duration-300",
          deviceMode === "tablet" &&
            "mx-auto my-6 w-full max-w-[768px] overflow-x-hidden rounded-[2rem] border-4 border-border bg-background shadow-[var(--shadow-soft)]",
          deviceMode === "mobile" &&
            "mx-auto my-6 w-full max-w-[400px] overflow-x-hidden rounded-[2.25rem] border-4 border-border bg-background shadow-[var(--shadow-soft)]",
        )}
      >
        {signedIn ? <Outlet /> : <SignInGate />}
      </main>
      <footer className="mt-12 border-t bg-card/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 text-sm text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <AmanahLogo className="h-6 w-6" />
            <span className="font-display font-bold text-foreground">{t.brand}</span>
            <span>·</span>
            <span>{t.home.footerTagline}</span>
          </div>
          {signedIn && (
            <div className="flex flex-wrap gap-5 font-semibold">
              <Link to="/about" className="hover:text-foreground">
                {t.nav.about}
              </Link>
              <Link to="/studio" className="hover:text-foreground">
                {t.nav.studio}
              </Link>
              <Link to="/partnership" className="hover:text-foreground">
                {t.nav.partnership}
              </Link>
              <Link to="/chat" className="hover:text-foreground">
                {t.hero.askNoor}
              </Link>
            </div>
          )}
        </div>
      </footer>
      <GuardianDrawer />
      {signedIn && <DoveChat mode="widget" />}
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    registerOfflineServiceWorker();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ProfileProvider>
        <AppShellContent />
      </ProfileProvider>
    </QueryClientProvider>
  );
}
