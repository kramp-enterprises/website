import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

const APP_NAME = "Kramp Enterprises";

function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-24">
      <p className="font-display text-xs uppercase tracking-[0.22em] text-muted">404</p>
      <h1 className="mt-2 font-display text-5xl text-forest">That page is not here.</h1>
      <Button asChild className="mt-8">
        <Link to="/">Back to the shop</Link>
      </Button>
    </main>
  );
}

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Kramp Enterprises — GSI grain bins and handling, Yarbo yard robots, and custom CNC signs from Brentford, South Dakota.",
      },
      { name: "theme-color", content: "#163528" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;1,400&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-dvh flex-col bg-cream text-ink">
        <PreviewHostBridge />
        <AuthProvider>
          <SiteHeader />
          <div className="flex-1">
            <Outlet />
          </div>
          <SiteFooter />
          <Toaster position="bottom-right" />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
