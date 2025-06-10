import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";


const dm_sans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Assignment - By Shiv Chauhan",
  description: "Frontend Assignment for Gigagit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dm_sans.className}`}>
      <body
        className={`${dm_sans.className}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
