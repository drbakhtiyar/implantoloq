"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  sym: string;
  className?: string;
}

export default function PriceCounter({ value, sym, className = "" }: Props) {
  const [displayed, setDisplayed] = useState(value);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef(value);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = null;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Defer into a rAF so setState isn't called synchronously inside the effect.
      rafRef.current = requestAnimationFrame(() => {
        fromRef.current = value;
        setDisplayed(value);
      });
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }

    const from = fromRef.current;
    const to = value;
    const duration = 400;

    function tick(ts: number) {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(from + (to - from) * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value]);

  return (
    <span className={className} aria-label={`${value.toLocaleString("ru-RU")} ${sym}`}>
      {displayed.toLocaleString("ru-RU")} {sym}
    </span>
  );
}
