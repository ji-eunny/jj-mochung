import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
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
  maximumScale: 1,
  userScalable: false,
  themeColor: "#fdf6f0",
};

export const metadata: Metadata = {
  title: "모바일 청첩장",
  description: "소중한 분들을 결혼식에 초대합니다.",
  openGraph: {
    title: "모바일 청첩장",
    description: "소중한 분들을 결혼식에 초대합니다.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${uhbee.variable} h-full antialiased`}>
      <body className={`${uhbee.className} min-h-full bg-wedding-cream`}>
        {children}
      </body>
    </html>
  );
}
