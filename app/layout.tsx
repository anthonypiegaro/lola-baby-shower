import type { Metadata } from "next";
import { Geist, Geist_Mono, Great_Vibes, Raleway } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"]
}) 

export const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"]
});

export const metadata: Metadata = {
  title: "Lola Lady",
  description: "Lola Lady's Baby Shower",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} ${raleway.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
