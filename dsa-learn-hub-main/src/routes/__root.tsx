import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportDSA Learning HubError } from "../lib/DSA Learning Hub-error-reporting";
import { Binary } from "lucide-react";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md rounded-2xl p-10 text-center">
        <h1 className="gradient-text text-7xl font-black">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page took a detour through a broken pointer.
        </p>
        <Link to="/" className="mt-6 inline-flex rounded-lg gradient-brand px-5 py-2.5 text-sm font-semibold text-white">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportDSA Learning HubError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md rounded-2xl p-10 text-center">
        <h1 className="text-xl font-semibold">Something broke</h1>
        <p className="mt-2 text-sm text-muted-foreground">An unexpected error occurred while rendering this page.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-lg gradient-brand px-5 py-2.5 text-sm font-semibold text-white"
          >Try again</button>
          <a href="/" className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold">Home</a>
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
      { title: "DSA Visual Learning Hub — Master Data Structures Visually" },
      { name: "description", content: "Interactive visualizations, real-world examples, and code in C/C++/Java/Python for every data structure." },
      { property: "og:title", content: "DSA Visual Learning Hub — Master Data Structures Visually" },
      { property: "og:description", content: "Interactive visualizations, real-world examples, and code in C/C++/Java/Python for every data structure." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "DSA Visual Learning Hub — Master Data Structures Visually" },
      { name: "twitter:description", content: "Interactive visualizations, real-world examples, and code in C/C++/Java/Python for every data structure." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1de259f7-7354-4ac2-a17f-09d9dee2d63e/id-preview-46b30823--069bb184-ad0e-4375-8bf0-59122b7c364f.DSA Learning Hub.app-1782057159390.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1de259f7-7354-4ac2-a17f-09d9dee2d63e/id-preview-46b30823--069bb184-ad0e-4375-8bf0-59122b7c364f.DSA Learning Hub.app-1782057159390.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" },
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
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl gradient-brand shadow-[var(--shadow-glow)]">
            <Binary className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight">DSA Hub</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Visual Learning</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {[
            { to: "/", label: "Dashboard" },
            { to: "/linear", label: "Linear" },
            { to: "/non-linear", label: "Non-Linear" },
            { to: "/about", label: "About" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              activeProps={{ className: "rounded-lg px-4 py-2 text-sm font-semibold text-foreground bg-white/5" }}
            >{l.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <Outlet />
      </main>
      <footer className="mt-16 border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        DSA Visual Learning Hub — Learn by seeing.
      </footer>
    </QueryClientProvider>
  );
}
