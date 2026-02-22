"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

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
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Have a question, feedback, or just want to say hi? We&rsquo;d love
              to hear from you.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-3xl gap-12 sm:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[#FF9A56]">
                  General inquiries
                </h2>
                <a
                  href="mailto:hello@oomphh.com"
                  className="mt-2 block text-lg text-foreground transition-colors hover:text-[#FF9A56]"
                >
                  hello@oomphh.com
                </a>
              </div>

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[#FF9A56]">
                  Support
                </h2>
                <a
                  href="mailto:support@oomphh.com"
                  className="mt-2 block text-lg text-foreground transition-colors hover:text-[#FF9A56]"
                >
                  support@oomphh.com
                </a>
              </div>

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[#FF9A56]">
                  Press &amp; media
                </h2>
                <a
                  href="mailto:press@oomphh.com"
                  className="mt-2 block text-lg text-foreground transition-colors hover:text-[#FF9A56]"
                >
                  press@oomphh.com
                </a>
              </div>

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[#FF9A56]">
                  Location
                </h2>
                <p className="mt-2 text-lg text-muted-foreground">
                  Prague, Czech Republic
                </p>
              </div>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-[#FF9A56]/20 bg-[#FF6B2C]/[0.06] p-8 text-center">
                <div className="mb-3 text-3xl">✓</div>
                <h3 className="text-lg font-semibold text-foreground">
                  Message sent!
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Thanks for reaching out. We&rsquo;ll get back to you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-medium text-[#FF9A56] transition-opacity hover:opacity-80"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const data = new FormData(form);
                  const name = data.get("name") as string;
                  const email = data.get("email") as string;
                  const message = data.get("message") as string;

                  const mailtoLink = `mailto:hello@oomphh.com?subject=${encodeURIComponent(`Contact from ${name}`)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
                  window.open(mailtoLink, "_blank");
                  setSubmitted(true);
                }}
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-white/30 focus:border-[#FF9A56]/50 focus:outline-none focus:ring-1 focus:ring-[#FF9A56]/50"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-white/30 focus:border-[#FF9A56]/50 focus:outline-none focus:ring-1 focus:ring-[#FF9A56]/50"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-white/30 focus:border-[#FF9A56]/50 focus:outline-none focus:ring-1 focus:ring-[#FF9A56]/50"
                    placeholder="How can we help?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-[14px] bg-gradient-to-br from-[#FF6B2C] to-[#FF9A56] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(255,107,44,0.3)] transition-opacity hover:opacity-90"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
