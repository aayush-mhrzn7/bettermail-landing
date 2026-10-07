import { Chrome } from "lucide-react";
import { Demo } from "@/components/site/demo";
import { Faq } from "@/components/site/faq";
import { HeroStage } from "@/components/site/hero-stage";
import { Install } from "@/components/site/install";
import { PrivacySection } from "@/components/site/privacy-section";
import { CHROME_STORE } from "@/lib/site";

const steps = [
  {
    title: "Write your draft in Gmail or Outlook",
    body: "Type it rough and unfinished. Don't worry about tone, typos or structure.",
  },
  {
    title: "Click the BetterMail icon beside Send",
    body: "A side panel opens. Choose a tone and a goal, add any instructions, and press Rewrite Email.",
  },
  {
    title: "Review, then apply",
    body: "Compare your original with the rewrite, then press Apply to Email. You still send it yourself.",
  },
];

export default function Page() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>Write emails that sound like you. Only better.</h1>
          <p className="hero-sub">
            Pick a tone and BetterMail rewrites your draft, right inside Gmail and Outlook.
          </p>
          <div className="cta">
            <a className="btn btn-accent press" href="#demo">Try the demo</a>
            <a className="btn btn-quiet press" href={CHROME_STORE} target="_blank" rel="noreferrer">
              <Chrome size={18} />
              Add to Chrome
            </a>
          </div>
        </div>
        <HeroStage />
      </section>

      <section id="how" className="how wrap">
        <div className="how-head">
          <h2 className="display">How it works</h2>
          <p className="sung how-lede">Write it rough. Send it right.</p>
        </div>
        <ol className="how-steps">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="step-num" aria-hidden="true">{i + 1}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Demo />
      <PrivacySection />
      <Install />
      <Faq />
    </>
  );
}
