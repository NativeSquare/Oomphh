import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Heart, Globe, Zap } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Real connection",
    description:
      "We believe the best relationships happen when people actually meet. Oomphh is built to get you off the screen and into the moment.",
  },
  {
    icon: Globe,
    title: "Where it matters",
    description:
      "Location and context matter. Events, nearby discovery, and plans that turn into meetups—because connection happens in the real world.",
  },
  {
    icon: Zap,
    title: "Less noise, more oomph",
    description:
      "Swipe less, meet more. Smart filters, stories, and events help you focus on people and plans that actually fit.",
  },
];

export const metadata: Metadata = {
  title: "About — Oomphh",
  description:
    "We're building the app for people who want more out of connection.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,oklch(0.65_0.12_47_/_0.06),transparent_50%)]"
        aria-hidden
      />

      <main className="pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              About Oomphh
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We're building the app for people who want more out of
              connection.
            </p>
          </div>

          <div className="prose prose-neutral dark:prose-invert mt-16 mx-auto max-w-2xl">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Oomphh started with a simple idea: the best way to meet
              people is to meet them. Not through endless swiping or
              algorithm-driven feeds—but through real context: who's
              nearby, what's happening, and what you're both looking
              for.
            </p>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              We combined events, location-based discovery, stories,
              and smart filters into one place. So you can spend less
              time scrolling and more time connecting—in person.
            </p>
          </div>

          <div className="mt-24 grid gap-8 sm:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <value.icon className="size-6" aria-hidden />
                </div>
                <h3 className="mt-5 font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <p className="text-muted-foreground">
              Ready to find your people?
            </p>
            <Button size="lg" className="mt-6 gap-2" asChild>
              <Link href="/download">Download the app</Link>
            </Button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
