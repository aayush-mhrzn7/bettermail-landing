import Image from "next/image";
import Link from "next/link";
import { CHROME_STORE, SUPPORT_EMAIL } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="brand">
              <Image src="/logo-512.png" alt="" width={512} height={203} />
              BetterMail
            </span>
            <p className="footer-about">
              Emails that sound like you, only better, right inside your compose window. Built for Chrome and Chromium.
            </p>
          </div>

          <nav className="footer-cols" aria-label="Footer">
            <div>
              <h3 className="footer-head">Product</h3>
              <ul>
                <li><Link href="/#how">How it works</Link></li>
                <li><Link href="/#demo">Test it out</Link></li>
                <li><Link href="/#privacy">Privacy</Link></li>
                <li><Link href="/#install">Get it</Link></li>
                <li><Link href="/#faq">Questions</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="footer-head">Resources</h3>
              <ul>
                <li><a href={CHROME_STORE} target="_blank" rel="noreferrer">Add to Chrome</a></li>
                <li><a href={`mailto:${SUPPORT_EMAIL}`}>Contact</a></li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>Copyright ©{new Date().getFullYear()} BetterMail. All rights reserved.</p>
          <p className="footer-legal">
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms and conditions</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
