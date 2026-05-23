import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const FAVICON = "/favicon_io (17)";
const GTM_ID = "GTM-55LJVP5D";

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
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
