import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DieTailor — Personalized Nutrition, Delivered",
  description:
    "Build custom meal bowls, subscribe to healthy meal plans, and consult certified dietitians. DieTailor helps you eat right, every day.",
  keywords: [
    "diet",
    "meal plan",
    "healthy food",
    "custom bowl",
    "nutrition",
    "dietitian",
    "food subscription",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${outfit.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
