import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VISA Paralympics Quiz",
  description: "Interactive Quiz for the Paralympics Event",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
