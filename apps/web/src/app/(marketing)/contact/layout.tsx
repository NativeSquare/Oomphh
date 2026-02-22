import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — OOmphh",
  description:
    "Get in touch with the OOmphh team. We'd love to hear from you.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
