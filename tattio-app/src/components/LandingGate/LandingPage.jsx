import { useEffect, useRef, useState } from "react";
import "./LandingPage.css";

import logoUrl from "./assets/logo.svg";
import howToUrl from "./assets/how-to-graphic.svg";

/**
 * Props:
 *  - onBegin: () => void   // called after fade-out finishes
 */
export default function LandingPage({ onBegin }) {
  const [mounted, setMounted] = useState(false);
  const [hiding, setHiding] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    // small delay avoids initial paint jump before transition
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!hiding) return;
    const el = wrapRef.current;
    if (!el) return;

    const handleEnd = (e) => {
      if (e.target === el) {
        onBegin?.(); // move to Step1 after the container finishes fading out
      }
    };
    el.addEventListener("transitionend", handleEnd);
    return () => el.removeEventListener("transitionend", handleEnd);
  }, [hiding, onBegin]);

  return (
    <section
      ref={wrapRef}
      className={[
        "landing-wrap",
        mounted ? "is-visible" : "",
        hiding ? "is-hiding" : "",
      ].join(" ")}
      aria-label="Tattio introduction"
    >
      <img
        className="landing-logo"
        src={logoUrl}
        alt="Tattio"
        draggable="false"
      />
      <img
        className="landing-howto"
        src={howToUrl}
        alt="How Tattio works: Step 1 choose styles, Step 2 choose options, Step 3 generate tattoo"
        draggable="false"
      />
      <button
        className="landing-button"
        type="button"
        onClick={() => setHiding(true)}
      >
        Begin
      </button>
    </section>
  );
}