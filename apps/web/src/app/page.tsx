import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Heart,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,oklch(0.65_0.12_47_/_0.08),transparent_50%)]"
        aria-hidden
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,oklch(0.65_0.19_47_/_0.2),transparent_70%)]"
          aria-hidden
        />
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="size-4" aria-hidden />
            <span>Real connections, real moments</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl md:leading-tight">
            Find your <span className="text-primary">people</span>
            <br />
            where it matters.
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Events, stories, and the right filters. Swipe less, meet
            more—in the real world.
          </p>
          <div className="mt-12">
            <Button size="lg" className="gap-2 text-base" asChild>
              <Link href="/download">
                Download the app
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* App preview */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {[
              { src: "/Home.png", alt: "Oomphh home feed" },
              { src: "/Nearby.png", alt: "Who's Nearby - discover people around you" },
              { src: "/Events.png", alt: "Events and plans" },
              { src: "/Screen-1.png", alt: "Stories and connections" },
            ].map((img) => (
              <div
                key={img.src}
                className="relative w-full max-w-[220px] shrink-0 sm:max-w-[260px]"
              >
                <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 shadow-2xl shadow-primary/5 ring-1 ring-border/40">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={260}
                    height={520}
                    className="w-full rounded-2xl object-cover"
                    priority={img.src === "/Home.png"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border/50 py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-semibold text-foreground sm:text-3xl">
            Built for how you actually meet
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            No endless feeds. Events, location, and preferences that
            match the way you date and hang out.
          </p>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={MapPin}
              title="Near you"
              description="See who's around and up for the same things—distance and filters that make sense."
            />
            <FeatureCard
              icon={Calendar}
              title="Events & plans"
              description="Create or join events. From coffee to concerts, plans turn into real meetups."
            />
            <FeatureCard
              icon={Users}
              title="Filters that fit"
              description="Age, vibe, what you're looking for. One place, one profile, no guesswork."
            />
            <FeatureCard
              icon={Heart}
              title="Stories & albums"
              description="Share moments and albums with your circle. Less noise, more connection."
            />
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/features">See all features</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/50 py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Ready to add some oomph?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Download Oomphh and start meeting people who get it.
          </p>
          <Button size="lg" className="mt-10 gap-2" asChild>
            <Link href="/download">
              Download the app
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
        <Icon className="size-6" aria-hidden />
      </div>
      <h3 className="mt-5 font-semibold text-foreground">{title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
