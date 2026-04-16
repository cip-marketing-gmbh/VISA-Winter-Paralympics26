import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VISA Paralympics Quiz",
  description: "Interaktives Quiz für die Paralympics-Veranstaltung",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
