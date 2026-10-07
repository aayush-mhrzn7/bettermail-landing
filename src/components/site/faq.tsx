const faqs = [
  {
    q: "Where does BetterMail work?",
    a: "In Gmail and Outlook on Chrome. A BetterMail icon appears next to the Send button in your compose window and opens the side panel.",
  },
  {
    q: "Does it send emails for me?",
    a: "No. It rewrites the draft you wrote. You read it, change it if you like, and press send yourself.",
  },
  {
    q: "What happens to my email text?",
    a: "Only text you choose to rewrite is processed, and only to generate the new version. We don't store it long-term and we don't sell your data. The privacy section and policy have the details.",
  },
  {
    q: "Which tones can I choose?",
    a: "Professional, formal, casual, friendly, persuasive, concise and detailed. You can also set a goal (fix typos, rewrite, or polish and refine) and add your own instructions.",
  },
  {
    q: "Will it still sound like me?",
    a: "That's the aim. The Humanizer setting (subtle, human or CEO) controls how natural the rewrite sounds, and you can always compare it with your original before applying it.",
  },
  {
    q: "Which browsers does it work in?",
    a: "Chrome and other Chromium browsers. Use the compatibility check in the Get it section to see if yours qualifies.",
  },
  {
    q: "How do I install it?",
    a: "Use the Add to Chrome button on this site. It takes you to the Chrome Web Store listing so you can add BetterMail in one click.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="faq wrap" aria-labelledby="faq-title">
      <h2 id="faq-title" className="display">Questions</h2>
      <div className="faq-list">
        {faqs.map((f, i) => (
          // name= makes this an exclusive accordion: opening one closes the others
          <details key={f.q} name="faq" open={i === 0}>
            <summary>
              <span>{f.q}</span>
              <span className="toggle" aria-hidden="true" />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
