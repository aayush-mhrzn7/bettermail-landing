"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Brain, CheckCircle, Loader2, Plus, Search, Send, X } from "lucide-react";
import { DRAFT, GOALS, HUMANIZERS, LOADING, REWRITES, TEMPLATES, TONES, type Template, type Tone } from "@/lib/samples";

type Phase = "idle" | "loading" | "done";

const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * A mock of the real thing: a Gmail compose window with the BetterMail icon beside Send,
 * and the extension's side panel (tone, goal, humanizer, Rewrite Email, Apply to Email).
 * Rewrites are canned, so this is a picture of the product, not a call to an AI.
 */
export function MailStage({ autoplay = false, tall = false }: { autoplay?: boolean; tall?: boolean }) {
  const [panelOpen, setPanelOpen] = useState(true);
  const [tone, setTone] = useState<Tone>("professional");
  const [goal, setGoal] = useState<string>("Rewrite");
  const [humanizer, setHumanizer] = useState<string>("subtle");
  const [extra, setExtra] = useState("");

  const [phase, setPhase] = useState<Phase>("idle");
  const [msg, setMsg] = useState(0);
  const [outSubject, setOutSubject] = useState("");
  const [outBody, setOutBody] = useState("");
  const [toast, setToast] = useState("");

  // Templates tab
  const [tab, setTab] = useState<"rewrite" | "templates">("rewrite");
  const [templates, setTemplates] = useState<Template[]>(TEMPLATES);
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [draftTpl, setDraftTpl] = useState({ name: "", subject: "", body: "" });

  // What the compose window currently shows
  const [subject, setSubject] = useState(DRAFT.subject);
  const [body, setBody] = useState(DRAFT.body);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const typer = useRef<ReturnType<typeof setInterval> | null>(null);
  const touched = useRef(false);
  const panelRef = useRef<HTMLElement>(null);

  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (typer.current) clearInterval(typer.current);
    typer.current = null;
  }, []);
  useEffect(() => clearAll, [clearAll]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const typeIn = (full: { subject: string; body: string }) => {
    if (reduceMotion()) {
      setOutSubject(full.subject);
      setOutBody(full.body);
      setPhase("done");
      return;
    }
    setOutSubject(full.subject);
    setOutBody("");
    let i = 0;
    typer.current = setInterval(() => {
      i += 3;
      if (i >= full.body.length) {
        setOutBody(full.body);
        setPhase("done");
        if (typer.current) clearInterval(typer.current);
      } else setOutBody(full.body.slice(0, i));
    }, 14);
  };

  const rewrite = useCallback((t: Tone, fast = false) => {
    clearAll();
    setToast("");
    setOutSubject("");
    setOutBody("");
    if (fast || reduceMotion()) {
      setPhase("loading");
      typeIn(REWRITES[t]);
      return;
    }
    setPhase("loading");
    setMsg(0);
    LOADING.forEach((_, i) => i > 0 && later(() => setMsg(i), i * 380));
    later(() => typeIn(REWRITES[t]), LOADING.length * 380);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearAll]);

  const apply = useCallback((t: Tone) => {
    setSubject(REWRITES[t].subject);
    setBody(REWRITES[t].body);
    setToast("Email applied successfully!");
    setPhase("idle");
    setOutSubject("");
    setOutBody("");
    later(() => setToast(""), 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyTemplate = (t: Template) => {
    touched.current = true;
    clearAll();
    setPhase("idle");
    setOutSubject("");
    setOutBody("");
    setSubject(t.subject);
    setBody(t.body);
    setToast("Email applied successfully!");
    later(() => setToast(""), 3000);
  };

  const saveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftTpl.name.trim() || !draftTpl.body.trim()) return;
    setTemplates((l) => [...l, { id: `t${Date.now()}`, ...draftTpl }]);
    setDraftTpl({ name: "", subject: "", body: "" });
    setCreating(false);
  };

  const shownTemplates = templates.filter((t) =>
    `${t.name} ${t.subject} ${t.body}`.toLowerCase().includes(query.trim().toLowerCase()),
  );


  // Hero only: play one rewrite, once, then stay put
  useEffect(() => {
    if (!autoplay) return;
    const start = setTimeout(() => {
      if (touched.current) return;
      setTone("professional");
      rewrite("professional", true);
      later(() => !touched.current && apply("professional"), 2600);
    }, 1200);
    return () => clearTimeout(start);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  // Hero preview: keep the part that is changing in view
  useEffect(() => {
    if (!autoplay || !panelRef.current) return;
    const el = panelRef.current;
    el.scrollTo({ top: phase === "done" ? el.scrollHeight : 0, behavior: reduceMotion() ? "auto" : "smooth" });
  }, [autoplay, phase]);

  const busy = phase === "loading";
  const progress = ((msg + 1) / LOADING.length) * 100;

  return (
    <div className="stage-wrap">
    <div className={`stage ${panelOpen ? "panel-open" : ""} ${tall ? "tall" : ""}`}>
      {/* Gmail-style compose window */}
      <div className="compose">
        <div className="compose-bar">
          <span>New Message</span>
          <span className="dots" aria-hidden="true"><i /><i /><i /></span>
        </div>
        <div className="compose-field"><span>To</span><span>{DRAFT.to}</span></div>
        <div className="compose-field"><span>Subject</span><span>{subject}</span></div>
        <div className="compose-body" aria-live="polite">{body}</div>
        <div className="compose-foot">
          <span className="send"><Send size={14} /> Send</span>
          <button
            type="button"
            className="bm-icon press"
            aria-label="Open Email Rewriter"
            aria-expanded={panelOpen}
            title="Open Email Rewriter"
            onClick={() => { touched.current = true; setPanelOpen((o) => !o); }}
          >
            <Image src="/icon128.png" alt="" width={28} height={28} />
          </button>
        </div>
      </div>

      {/* The extension's side panel */}
      {panelOpen && (
        <aside className="panel" ref={panelRef} aria-label="BetterMail side panel">
          <div className="panel-tabs" role="tablist">
            <button type="button" role="tab" aria-selected={tab === "rewrite"} className={tab === "rewrite" ? "on" : ""} onClick={() => { touched.current = true; setTab("rewrite"); }}>Rewrite</button>
            <button type="button" role="tab" aria-selected={tab === "templates"} className={tab === "templates" ? "on" : ""} onClick={() => { touched.current = true; setTab("templates"); }}>Templates</button>
          </div>
          {tab === "templates" ? (
            <div className="tpl">
              <div className="tpl-head">
                <h3>Templates</h3>
                <button type="button" className="tpl-add press" onClick={() => setCreating((c) => !c)} aria-expanded={creating}>
                  <Plus size={14} /> New
                </button>
              </div>
              {toast && <p className="ok" role="status"><CheckCircle size={14} /> {toast}</p>}
              {creating && (
                <form className="tpl-form" onSubmit={saveTemplate}>
                  <label>Template name
                    <input value={draftTpl.name} onChange={(e) => setDraftTpl({ ...draftTpl, name: e.target.value })} placeholder="e.g. Thank you note" />
                  </label>
                  <label>Subject
                    <input value={draftTpl.subject} onChange={(e) => setDraftTpl({ ...draftTpl, subject: e.target.value })} />
                  </label>
                  <label>Body
                    <textarea rows={4} value={draftTpl.body} onChange={(e) => setDraftTpl({ ...draftTpl, body: e.target.value })} />
                  </label>
                  <button type="submit" className="panel-btn press" disabled={!draftTpl.name.trim() || !draftTpl.body.trim()}>Save template</button>
                </form>
              )}
              <div className="tpl-search">
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search templates" aria-label="Search templates" />
                <Search size={14} />
              </div>
              <ul className="tpl-list">
                {shownTemplates.length ? shownTemplates.map((t) => (
                  <li key={t.id}>
                    <div className="tpl-top">
                      <h4>{t.name}</h4>
                      <button type="button" aria-label={`Delete ${t.name}`} className="tpl-x" onClick={() => setTemplates((l) => l.filter((x) => x.id !== t.id))}><X size={14} /></button>
                    </div>
                    <p className="tpl-sub">Subject: {t.subject}</p>
                    <p className="tpl-body">{t.body}</p>
                    <button type="button" className="panel-btn small press" onClick={() => applyTemplate(t)}><Send size={14} /> Apply to Email</button>
                  </li>
                )) : (
                  <li className="tpl-empty">{query ? "No templates match your search" : "Create your first template"}</li>
                )}
              </ul>
            </div>
          ) : (
          <>
          <h3>Optimize your drafts</h3>
          <p className="panel-sub">Select a tone and refine your message for an impact.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              touched.current = true;
              if (!busy) rewrite(tone);
            }}
          >
            <label>Tone
              <select value={tone} onChange={(e) => { touched.current = true; setTone(e.target.value as Tone); }}>
                {TONES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>
            <label>Additional Instructions (optional)
              <textarea
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
                placeholder="e.g.  keep it concise, be sharp .."
                rows={2}
              />
            </label>
            <div className="two">
              <label>Goal
                <select value={goal} onChange={(e) => setGoal(e.target.value)}>
                  {GOALS.map((g) => <option key={g}>{g}</option>)}
                </select>
              </label>
              <label>Humanizer
                <select value={humanizer} onChange={(e) => setHumanizer(e.target.value)}>
                  {HUMANIZERS.map((h) => <option key={h} value={h}>{h === "ceo" ? "CEO" : h}</option>)}
                </select>
              </label>
            </div>
            <button type="submit" className="panel-btn press" disabled={busy}>
              {busy ? <><Loader2 size={16} className="spin" /> Rewriting...</> : <><Brain size={16} /> Rewrite Email</>}
            </button>
          </form>

          {busy && !outSubject && (
            <div className="loading" role="status">
              <p>{LOADING[msg]}</p>
              <div className="bar"><div style={{ width: `${progress}%` }} /></div>
            </div>
          )}

          {toast && (
            <p className="ok" role="status"><CheckCircle size={14} /> {toast}</p>
          )}

          {(phase === "done" || outBody) && (
            <div className="result">
              <div className="divider"><span>Original</span></div>
              <p className="k">Subject:</p><p className="v">{DRAFT.subject}</p>
              <p className="k">Body:</p><p className="v clamp">{DRAFT.body}</p>

              <div className="divider"><span>Rewritten</span></div>
              <p className="k">Subject</p>
              <p className="field">{outSubject}</p>
              <p className="k">Body</p>
              <p className="field body">{outBody}</p>
              {phase === "done" && (
                <button type="button" className="panel-btn press" onClick={() => { touched.current = true; apply(tone); }}>
                  <Send size={16} /> Apply to Email
                </button>
              )}
            </div>
          )}
          </>
          )}
        </aside>
      )}
    </div>
    </div>
  );
}
