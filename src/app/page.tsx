import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { OpenHiggsfieldApp } from "@/openhiggsfield/openhiggsfield-app";

import "@/openhiggsfield/openhiggsfield.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-ohf-inter",
  display: "swap",
});

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function CreativeStudioPage() {
  return <OpenHiggsfieldApp fontClassName={inter.variable} />;
}
