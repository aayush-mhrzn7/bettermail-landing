"use client";
import confetti from "canvas-confetti";
import { Button } from "./button";
import { toast } from "sonner";

export const CompatibiltyButton = () => {
  const handleClick = () => {
    const end = Date.now() + 2 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
    toast("Browser Compatible", {
      closeButton: true,
      className: "font-dm-sans w-fit font-semibold",
      description: "Your browser is compatible with better mail.",
      descriptionClassName: "text-xs opacity-80",
      style: {
        "--normal-bg": "...",
        "--normal-text":
          "light-dark(var(--color-green-600), var(--color-green-400))",
        "--normal-border": "...",
      } as React.CSSProperties,
    });
  };

  return (
    <Button
      onClick={handleClick}
      className="my-4 w-fit font-dm-sans justify-center"
    >
      Check Browser Compatibility
    </Button>
  );
};
