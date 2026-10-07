// Made-up draft and canned rewrites for the on-page demo. Nothing here calls an AI service.
// The option lists match the extension's side panel.

export const TONES = ["professional", "formal", "casual", "friendly", "persuasive", "concise", "detailed"] as const;
export type Tone = (typeof TONES)[number];

export const GOALS = ["Fix Typos", "Rewrite", "Polish & Refine"] as const;
export const HUMANIZERS = ["subtle", "human", "ceo"] as const;

export const DRAFT = {
  to: "Maya Chen",
  subject: "report",
  body: "hey maya, can u send me the report asap? need it for tmrw meeting. thx",
};

export const REWRITES: Record<Tone, { subject: string; body: string }> = {
  professional: {
    subject: "Request: quarterly report for tomorrow's meeting",
    body: "Hi Maya,\n\nCould you send over the quarterly report when you have a moment? I need it for tomorrow's meeting, so by end of day would be ideal.\n\nThank you,\nSam",
  },
  formal: {
    subject: "Request for the quarterly report",
    body: "Dear Maya,\n\nI would be grateful if you could send me the quarterly report at your earliest convenience, as I require it for tomorrow's meeting.\n\nKind regards,\nSam",
  },
  casual: {
    subject: "Quick one: the report",
    body: "Hey Maya,\n\nCan you shoot me the report today? I need it for tomorrow's meeting. Thanks!\n\nSam",
  },
  friendly: {
    subject: "Quick favor: the quarterly report",
    body: "Hey Maya!\n\nQuick favor: could you send me the report today? I'm presenting it in tomorrow's meeting. Thanks a ton!\n\nSam",
  },
  persuasive: {
    subject: "Your report is the centerpiece of tomorrow's meeting",
    body: "Hi Maya,\n\nYour report is the centerpiece of tomorrow's meeting, and having it today lets me walk the team through the numbers properly. Could you send it by end of day?\n\nThanks,\nSam",
  },
  concise: {
    subject: "Report by end of day?",
    body: "Hi Maya,\n\nPlease send the report by end of day. I need it for tomorrow's meeting.\n\nThanks,\nSam",
  },
  detailed: {
    subject: "Quarterly report needed for tomorrow's meeting",
    body: "Hi Maya,\n\nCould you send me the latest quarterly report today? I'm presenting it in tomorrow's meeting and want time to review the numbers beforehand. If anything is still in progress, a draft is fine for now.\n\nThank you,\nSam",
  },
};

// Shown while "rewriting", taken from the extension
export const LOADING = [
  "Analyzing your email…",
  "Understanding context and intent…",
  "Identifying tone and structure…",
  "Extracting key points…",
  "Refining clarity and flow…",
  "Making it sound more natural…",
  "Finalizing your rewritten email…",
];

export type Template = { id: string; name: string; subject: string; body: string };

// Starter templates for the demo's Templates tab
export const TEMPLATES: Template[] = [
  {
    id: "follow-up",
    name: "Meeting follow-up",
    subject: "Follow-up from today's meeting",
    body: "Hi all,\n\nThanks for your time today. Here's a quick summary of what we agreed and the next steps.\n\nBest,\nSam",
  },
  {
    id: "ooo",
    name: "Out of office",
    subject: "Out of office until Monday",
    body: "Hi,\n\nThanks for your email. I'm out of the office until Monday and will reply when I'm back.\n\nBest,\nSam",
  },
  {
    id: "intro",
    name: "Intro request",
    subject: "Quick intro?",
    body: "Hi,\n\nI'd love to connect and learn more about what you're working on. Do you have 15 minutes this week?\n\nThanks,\nSam",
  },
];
