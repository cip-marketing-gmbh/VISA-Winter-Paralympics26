import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VISA Quiz",
  description: "Interaktives Quiz für die Paralympics-Veranstaltung",
  appleWebApp: {
    capable: true,
    title: "VISA Quiz",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="VISA Quiz" />
      </head>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
