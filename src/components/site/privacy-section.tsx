import Link from "next/link";

// Drawn from the privacy policy page; keep the two in step.
const handles = [
  {
    name: "Text you choose to rewrite",
    body: "Sent to an AI service to produce the new version. It's processed temporarily and not stored long-term.",
  },
  {
    name: "Basic, anonymous usage",
    body: "Things like which features get used and error logs, so we can fix bugs and improve the extension.",
  },
  {
    name: "Sign-in details, if you sign in",
    body: "Your email address or an authentication identifier.",
  },
];

const doesnt = [
  {
    name: "We don't sell your data",
    body: "No selling, renting or trading personal data. It's shared only to provide the service or when the law requires it.",
  },
  {
    name: "It doesn't send for you",
    body: "BetterMail rewrites a draft. You decide whether it goes out.",
  },
  {
    name: "Uninstall any time",
    body: "Removing the extension stops it completely.",
  },
];

export function PrivacySection() {
  return (
    <section id="privacy" className="privacy" aria-labelledby="privacy-title">
      <div className="wrap">
        <div className="head">
          <h2 id="privacy-title" className="display">Privacy</h2>
          <p>Your drafts are yours. Here&apos;s what BetterMail handles, and what it won&apos;t do.</p>
        </div>
        <div className="cols">
          <div>
            <h3>What it handles</h3>
            <dl>
              {handles.map((a) => (
                <div className="row" key={a.name}>
                  <dt>{a.name}</dt>
                  <dd>{a.body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3>What it doesn&apos;t do</h3>
            <dl>
              {doesnt.map((a) => (
                <div className="row" key={a.name}>
                  <dt>{a.name}</dt>
                  <dd>{a.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <p className="more"><Link href="/privacy">Read the full privacy policy</Link></p>
      </div>
    </section>
  );
}
