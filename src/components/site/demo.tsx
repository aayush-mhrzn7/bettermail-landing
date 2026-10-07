import { MailStage } from "./mail-stage";

const options = [
  { title: "Tone", body: "Professional, formal, casual, friendly, persuasive, concise or detailed." },
  { title: "Goal", body: "Fix typos only, rewrite the whole thing, or polish and refine what you have." },
  { title: "Humanizer", body: "Subtle, human or CEO: how much the rewrite sounds like a person talking." },
  { title: "Additional instructions", body: "Anything specific, like “keep it concise” or “be sharp”." },
];

const flow = [
  { title: "Original and rewritten, side by side", body: "See your draft above the new version, subject included, before anything changes." },
  { title: "Apply to Email", body: "One click puts the rewrite into your compose window. Nothing is sent for you." },
  { title: "Templates", body: "Save emails you send often and apply them to a draft in one click." },
];

export function Demo() {
  return (
    <section id="demo" className="demo">
      <div className="wrap">
        <div className="demo-head">
          <h2 className="display">Test it out</h2>
          <p>
            Click the BetterMail icon next to Send, choose a tone, and press Rewrite Email. The draft is made up and
            the rewrites are canned, so nothing is sent anywhere.
          </p>
        </div>

        <MailStage tall />

        <div className="features">
          <div>
            <h3 className="group-title">In the side panel</h3>
            <ul>
              {options.map((f) => (
                <li key={f.title}><h4>{f.title}</h4><p>{f.body}</p></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="group-title">Before you send</h3>
            <ul>
              {flow.map((f) => (
                <li key={f.title}><h4>{f.title}</h4><p>{f.body}</p></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
