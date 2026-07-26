import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import BackgroundPreloader from "@/components/layout/BackgroundPreloader";
import InteractionGuard from "@/components/layout/InteractionGuard";
import { SITE } from "@/lib/site";
import "./globals.css";

/** public 폰트를 빌드에 포함 → basePath 와 무관하게 동작 */
const uhbee = localFont({
  src: "../../public/fonts/UhBeeQUEENJ.woff",
  variable: "--font-uhbee",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#fdf6f0",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.title,
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: SITE.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [SITE.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${uhbee.variable} h-full antialiased`}>
      <body className={`${uhbee.className} min-h-full bg-white`}>
        <BackgroundPreloader />
        <InteractionGuard />
        {children}
      </body>
    </html>
  );
}
