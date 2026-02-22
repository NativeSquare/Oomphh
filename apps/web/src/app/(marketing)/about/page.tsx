import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About — OOmphh",
  description:
    "OOmphh is a gay bisexual queer dating and lifestyle app. Bringing the OOmphh back in your daily lives.",
};

export default function AboutPage() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,oklch(0.65_0.12_47_/_0.06),transparent_50%)]"
        aria-hidden
      />

      <main className="pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              About
            </h1>
          </div>

          <div className="mt-16 mx-auto max-w-2xl space-y-6">
            <p className="text-muted-foreground text-lg leading-relaxed">
              The word <span className="font-semibold text-foreground">Oomph</span> spelt
              with a single &ldquo;h&rdquo; means exciting, energetic and sexually
              attractive. We add in an extra h because{" "}
              <span className="italic">you</span> bring in the hotness to it!
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed">
              <span className="font-semibold text-foreground">OOmphh</span> is a gay
              bisexual queer dating app which wishes to double up in addition as a
              lifestyle app. As the word suggests, we wish to bring the OOmphh back in
              your daily lives, your daily mediocre (bisch mode on) gay, queer bisexual
              lives. We want you to spice it up, take it a notch up and bring in all the
              qualities that the word suggests.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Look at your self in the mirror when you start your day and say{" "}
              <span className="font-semibold text-foreground">OOmphh</span>, I still have
              it in me (now don&rsquo;t be dirty &ndash; don&rsquo;t take it literally),
              before you leave your house!
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Record your OOmphh photo of the day, video of the day, your OOmphh moment
              of the day and share it on our app. OOmphh does not have to be all about
              you, you may find your OOmphh moment in anything that brings you excitement,
              energy and makes you feel alive! We would love to have you share that OOmphh
              moment with us and the world and let us know what this word means for you!
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed">
              With OOmphh we wish to offer several already familiar and some innovative
              features with a sleek modern interactive app. There will be &ldquo;Who&rsquo;s
              Nearby and far away&rdquo;, the usual chats, photo and album sharing and some
              new popular features like Stories, Events and a secret feature which you will
              need to find out by logging in.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed">
              The app will be available in the Free Version, Premium Version and Unlimited
              Version &ndash; at an extremely affordable price for Users Globally. The Free
              Version will be absolutely ad free and will give you a significant number of
              users you can browse without any limitations. We want you to connect with each
              other with an OOmphh and save your hard earned money to buy your date some
              flowers!
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Imagine telling your friends where you met your hot date and being proud of
              it when you go &ldquo;<span className="font-semibold text-foreground">OOmphh</span>&rdquo;!
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed italic">
              P.S: We are based and headquartered in Prague &ndash; the Bohemian Capital of
              the world! So come on in, join us and invite your friends, share the word,
              spread the love and be part of the OOmphh world!
            </p>
          </div>

          <div className="mt-24 text-center">
            <p className="text-muted-foreground">
              Ready to bring the OOmphh?
            </p>
            <Button size="lg" className="mt-6 gap-2" asChild>
              <Link href="/download">Download the app</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
