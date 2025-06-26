import type { Metadata } from "next";
import "./globals.css";
import { Geologica } from "next/font/google";

const geologica = Geologica({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geologica",
});

export const metadata: Metadata = {
  title: "Quote Request Wizard",
  description:
    "Connect shipowners, brokers, and underwriters in a seamless platform for maritime service and insurance quote requests. Submit vessel and coverage details through a guided multi-step form and compare broker offers effortlessly.",
  openGraph: {
    title: "Maritime Quote Connect",
    description:
      "A digital platform simplifying the process of maritime service and insurance quoting. Designed for shipowners, brokers, and underwriters to collaborate efficiently.",
    siteName: "Quote Request Wizard",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geologica.variable}>
      <body>{children}</body>
    </html>
  );
}
