import type { Metadata } from "next";
import "./globals.css";

const FAVICON = "/favicon_io (17)";

export const metadata: Metadata = {
  title: "Vinayak 21 Acres – Luxurious Township in New Town, Kolkata",
  description: "Vinayak 21 Acres: Premium 2 & 3 BHK residences in New Town, Kolkata. 21 acres, 75% open-to-sky, 3-acre central park, G+21 towers. RERA registered.",
  icons: {
    icon: [
      { url: `${FAVICON}/favicon-16x16.png`, sizes: "16x16", type: "image/png" },
      { url: `${FAVICON}/favicon-32x32.png`, sizes: "32x32", type: "image/png" },
    ],
    shortcut: `${FAVICON}/favicon.ico`,
    apple: `${FAVICON}/apple-touch-icon.png`,
    other: [
      { rel: "android-chrome-192", url: `${FAVICON}/android-chrome-192x192.png` },
      { rel: "android-chrome-512", url: `${FAVICON}/android-chrome-512x512.png` },
    ],
  },
  manifest: `${FAVICON}/site.webmanifest`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
