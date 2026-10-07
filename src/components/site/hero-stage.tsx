"use client";

import { MailStage } from "./mail-stage";

// Decorative preview: it plays on its own and can't be focused. The real one is in "Test it out".
export function HeroStage() {
  return (
    <div className="hero-stage" aria-hidden="true" {...{ inert: true }}>
      <MailStage autoplay tall />
    </div>
  );
}
