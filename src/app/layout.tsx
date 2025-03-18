import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FixTeam",
  description: "O seu melhor amigo no desenvolvimento de sites, landing-pages e RPA's",
  openGraph: {
    title: "FixTeam",
    description: "O seu melhor amigo no desenvolvimento de sites, landing-pages e RPA's",
    url: "https://fixteam.uk/",
    siteName: "FixTeam",
    images: [
      {
        url: "/logo.png", 
        width: 1200,
        height: 630,
        alt: "Logo FixTeam",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FixTeam",
    description: "O seu melhor amigo no desenvolvimento de sites, landing-pages e RPA's",
    images: ["/logo.png"], 
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
        <Analytics />
        {children}
      </body>
    </html>
  );
}
