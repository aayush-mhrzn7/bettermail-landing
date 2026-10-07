"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const KEY = "bettermail-theme";

const savedChoice = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const mq = matchMedia("(prefers-color-scheme: dark)");
    // Read the theme the inline script resolved before first paint
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(root.dataset.theme ? root.dataset.theme === "dark" : mq.matches);

    // Follow the system while the viewer hasn't picked a theme
    const onChange = () => {
      if (savedChoice()) return;
      setDark(mq.matches);
      root.dataset.theme = mq.matches ? "dark" : "light";
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !dark;
    setDark(next);
    root.classList.add("theme-changing");
    root.dataset.theme = next ? "dark" : "light";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next ? "#0e0e11" : "#fbf9f6");
    try {
      localStorage.setItem(KEY, root.dataset.theme);
    } catch {
      // Storage blocked: the choice lasts for this visit
    }
    setTimeout(() => root.classList.remove("theme-changing"), 320);
  };

  return (
    <button
      type="button"
      className="theme-toggle press"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      onClick={toggle}
    >
      <span className={`icon ${!dark ? "shown" : ""}`}>
        <Moon size={18} />
      </span>
      <span className={`icon ${dark ? "shown" : ""}`}>
        <Sun size={18} />
      </span>
    </button>
  );
}
