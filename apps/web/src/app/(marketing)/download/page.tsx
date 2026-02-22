import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Apple, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Download — Oomphh",
  description: "Download the Oomphh app for iOS and Android. Find your people.",
};

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,oklch(0.65_0.19_47_/_0.15),transparent_60%)]"
        aria-hidden
      />

      <main className="pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Download Oomphh
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Get the app and start meeting your people.
            </p>
          </div>

          <div className="mt-16 flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-12">
            <a
              href="https://apps.apple.com/app/oomphh"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-14 w-full max-w-[260px] items-center gap-4 rounded-xl border border-border/60 bg-card px-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 sm:w-auto sm:min-w-[220px]"
            >
              <Apple className="size-8 text-foreground" aria-hidden />
              <div className="text-left">
                <span className="block text-xs text-muted-foreground">
                  Download on the
                </span>
                <span className="font-semibold text-foreground">
                  App Store
                </span>
              </div>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.oomphh.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-14 w-full max-w-[260px] items-center gap-4 rounded-xl border border-border/60 bg-card px-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 sm:w-auto sm:min-w-[220px]"
            >
              <Smartphone className="size-8 text-foreground" aria-hidden />
              <div className="text-left">
                <span className="block text-xs text-muted-foreground">
                  Get it on
                </span>
                <span className="font-semibold text-foreground">
                  Google Play
                </span>
              </div>
            </a>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            App Store and Google Play links will be available when the
            app launches.{" "}
            <span className="text-foreground">Stay tuned.</span>
          </p>

          <div className="mt-16 grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {[
              "/Home.png",
              "/Nearby.png",
              "/Events.png",
              "/Screen-1.png",
              "/Other%20User%20Profile.png",
              "/Group%20Chat.png",
            ].map((src) => (
              <div
                key={src}
                className="relative w-full max-w-[160px] overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg sm:max-w-[180px]"
              >
                <Image
                  src={src}
                  alt="Oomphh app preview"
                  width={180}
                  height={360}
                  className="w-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-border/60 bg-card/50 p-8 text-center">
            <h2 className="text-xl font-semibold text-foreground">
              Coming soon to iOS and Android
            </h2>
            <p className="mt-2 text-muted-foreground">
              Oomphh is in development. Follow along for launch updates.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
