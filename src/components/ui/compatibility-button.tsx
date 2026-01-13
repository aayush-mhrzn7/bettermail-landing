"use client";
import confetti from "canvas-confetti";
import { Button } from "./button";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
const isChromiumBrowser = () => {
  // @ts-ignore
  if (navigator.userAgentData) {
    // @ts-ignore
    return navigator.userAgentData.brands.some((b) =>
      b.brand.includes("Chrom")
    );
  }

  return typeof window !== "undefined" && !!(window as any).chrome?.runtime;
};

export const CompatibiltyButton = () => {
  const [loading, setIsLoading] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);
    await delay();
    const compatible = isChromiumBrowser();
    setIsLoading(false);
    if (!compatible) {
      toast("Browser not supported", {
        description: "Please use a Chromium-based browser like Chrome or Edge.",
        className: "font-dm-sans font-semibold",
        descriptionClassName: "text-xs opacity-80",
      });
      return;
    }
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
        colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors,
      });
      requestAnimationFrame(frame);
    };
    frame();
    toast("Browser Compatible", {
      description: "Your browser works perfectly with BetterMail 🚀",
      className: "font-dm-sans font-semibold",
      descriptionClassName: "text-xs opacity-80",
    });
  };

  const delay = async () => {
    await new Promise((res) => setTimeout(res, 2000));
  };
  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      className="my-4 cursor-pointer w-fit font-dm-sans justify-center"
    >
      {loading ? "Checking" : "Check"} Browser Compatibility
      {loading && <Loader2 className="animate-spin transition-all" />}
    </Button>
  );
};
