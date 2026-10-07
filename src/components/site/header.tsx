import Image from "next/image";
import Link from "next/link";
import { Chrome } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { CHROME_STORE } from "@/lib/site";

export function Header() {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link href="/" className="brand" aria-label="BetterMail home">
          <Image src="/logo-512.png" alt="" width={512} height={203} priority />
          BetterMail
        </Link>
        <nav aria-label="Primary">
          <Link href="/#how">How it works</Link>
          <Link href="/#demo">Test it out</Link>
          <Link href="/#privacy">Privacy</Link>
          <Link href="/#install">Get it</Link>
          <Link href="/#faq">Questions</Link>
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <a className="btn btn-gradient small press" href={CHROME_STORE} target="_blank" rel="noreferrer">
            <Chrome size={18} />
            Add to Chrome
          </a>
        </div>
      </div>
    </header>
  );
}
