import type { Metadata } from "next";
import { DM_Sans, Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "BetterMail: emails that sound like you, only better",
  description:
    "BetterMail is a Chrome extension that rewrites your Gmail and Outlook drafts in the tone you pick, from a side panel next to Send.",
  icons: { icon: "/icon32.png" },
};

// Resolve the theme before first paint (saved choice, else the system setting) so there's no flash
const themeScript = `(function(){var t=null;try{t=localStorage.getItem('bettermail-theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t==='dark'?'#0e0e11':'#fbf9f6'})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#fbf9f6" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster className="w-fit" />
        <Analytics />
      </body>
    </html>
  );
}
