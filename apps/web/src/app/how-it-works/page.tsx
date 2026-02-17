import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Compass, MessageCircle, Coffee } from "lucide-react";

const steps = [
  {
    step: "1",
    icon: Compass,
    title: "Explore",
    description:
      "Browse who's nearby, check out events, or swipe through stories. Set your preferences once—age, vibe, what you're looking for—and explore without the noise.",
  },
  {
    step: "2",
    icon: MessageCircle,
    title: "Connect",
    description:
      "Like profiles, respond to stories, or join events you're into. Start the conversation when it feels right. Real interest, real intent.",
  },
  {
    step: "3",
    icon: Coffee,
    title: "Meet",
    description:
      "Turn plans into real meetups. Coffee, concerts, weekend hangouts—whatever you're both into. Swipe less, meet more.",
  },
];

export const metadata: Metadata = {
  title: "How it works — Oomphh",
  description:
    "Explore, connect, meet. Simple steps to find your people and make it happen.",
};

export default function HowItWorksPage() {
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
              How it works
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Simple. Intentional. Built for real connection.
            </p>
          </div>

          <div className="mt-20 space-y-16">
            {steps.map((item) => (
              <div
                key={item.step}
                className="relative flex flex-col items-center gap-8 sm:flex-row sm:gap-12"
              >
                <div className="flex shrink-0 items-center justify-center rounded-2xl bg-primary/15 p-6 text-primary sm:w-24">
                  <item.icon className="size-10" aria-hidden />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <span className="inline-block rounded-full bg-primary/20 px-3 py-1 text-sm font-semibold text-primary">
                    Step {item.step}
                  </span>
                  <h2 className="mt-4 text-2xl font-semibold text-foreground">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <p className="text-muted-foreground">
              Ready to get started?
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
