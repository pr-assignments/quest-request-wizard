import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
