import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import {
  MapPin,
  Calendar,
  Users,
  Heart,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

const features: Array<{
  icon: React.ElementType;
  title: string;
  description: string;
  images?: string[];
}> = [
  {
    icon: MapPin,
    title: "Who's Nearby",
    description:
      "See who's around and up for the same things. Distance and location filters that actually make sense—no more endless scrolling through people miles away.",
    images: ["/Nearby.png"],
  },
  {
    icon: Heart,
    title: "Stories & connections",
    description:
      "Share moments through stories and albums. Swipe through profiles, like what resonates, and build real connections—not just matches in a void.",
    images: ["/Screen-1.png", "/Taps.png"],
  },
  {
    icon: Calendar,
    title: "Events & plans",
    description:
      "Create or join events—from coffee catch-ups to concerts. Plans turn into real meetups. See who's going and connect before you get there.",
    images: ["/Events.png", "/Event.png", "/Create%20Event.png"],
  },
  {
    icon: Users,
    title: "Profiles & filters",
    description:
      "Age, vibe, what you're looking for—all in one place, one profile. No guesswork, no endless questionnaires. Set it once and explore.",
    images: ["/Other%20User%20Profile.png"],
  },
  {
    icon: MessageCircle,
    title: "Chat & share",
    description:
      "Group chats for events, album sharing in conversations. Stay connected with your circle and share moments as they happen.",
    images: ["/Group%20Chat.png", "/Album%20share%20in%20chat.png"],
  },
];

export const metadata: Metadata = {
  title: "Features — Oomphh",
  description:
    "Explore features: Who's Nearby, events, stories, and smart filters. Built for real connection.",
};

export default function FeaturesPage() {
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
              Features
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to find your people and make it happen
              in the real world.
            </p>
          </div>

          <div className="mt-20 space-y-24">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className={`flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16 ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                    <feature.icon className="size-7" aria-hidden />
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold text-foreground sm:text-3xl">
                    {feature.title}
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                {feature.images && feature.images.length > 0 && (
                  <div className="flex shrink-0 flex-wrap justify-center gap-4 lg:w-96 lg:flex-nowrap">
                    {feature.images.map((img) => (
                      <div
                        key={img}
                        className="relative w-full max-w-[220px] overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-xl ring-1 ring-border/40 lg:max-w-[180px]"
                      >
                        <Image
                          src={img}
                          alt={`Oomphh app - ${feature.title}`}
                          width={220}
                          height={440}
                          className="w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/download">
                Download the app
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
