import type { Metadata } from "next";
import { Geist, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/nav";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Better Mail",
  description: "Write Mails that sound like you but better",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${dmSans.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Toaster className="w-fit" />
      </body>
    </html>
  );
}
