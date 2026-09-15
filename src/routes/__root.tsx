import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { localBusinessJsonLd } from "@/lib/seo";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

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
      { title: "Kramp Enterprises | GSI Grain Bins, Yarbo & Steel — Brentford, SD" },
      {
        name: "description",
        content:
          "Family owned since 1985. GSI grain systems, Yarbo robotic mowers, and CNC plasma signs from 303 East 6th Street, Brentford, South Dakota. Call (605) 887-3456.",
      },
      { name: "theme-color", content: "#163528" },
      { name: "robots", content: "index,follow,max-image-preview:large" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "canonical", href: "https://www.krampenterprises.com/" },
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
        <JsonLd data={localBusinessJsonLd()} />
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
