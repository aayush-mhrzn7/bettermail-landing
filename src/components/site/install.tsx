import { Chrome } from "lucide-react";
import { CompatibiltyButton } from "@/components/ui/compatibility-button";
import { CHROME_STORE } from "@/lib/site";

export function Install() {
  return (
    <section id="install" className="install">
      <div className="wrap">
        <div className="install-copy">
          <h2 className="display">Get BetterMail for Chrome</h2>
          <p className="install-lede">
            Add it from the Chrome Web Store, open a new message, and pick a tone.
          </p>
          <div className="install-actions">
            <a className="btn btn-gradient press" href={CHROME_STORE} target="_blank" rel="noreferrer">
              <Chrome size={18} />
              Add to Chrome
            </a>
            <CompatibiltyButton />
          </div>
        </div>
      </div>
    </section>
  );
}
