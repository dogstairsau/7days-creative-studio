import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { CreativeStudioDashboard } from "@/studio/creative-studio-dashboard";

import "@/openhiggsfield/openhiggsfield.css";
import "@/studio/studio.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-ohf-inter",
  display: "swap",
});

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function CreativeStudioPage() {
  return <CreativeStudioDashboard fontClassName={inter.variable} />;
}
