"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, ChevronUp, X } from "lucide-react";
import PriceCounter from "@/components/calculator/ui/PriceCounter";
import type { LineItem } from "@/lib/calculator";

interface Props {
  total: number;
  lineItems: LineItem[];
  sym: string;
  whatsappHref: string;
  whatsappLabel: string;
  totalLabel: string;
  showWhatsApp: boolean;
  expandLabel?: string;
}

export default function MobilePriceBar({
  total,
  lineItems,
  sym,
  whatsappHref,
  whatsappLabel,
  totalLabel,
  showWhatsApp,
  expandLabel = "Hamısını gör",
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (expanded) {
      sheetRef.current?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setExpanded(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [expanded]);

  return (
    <>
      {expanded && (
        <div
          className="fixed inset-0 z-30"
          style={{ backgroundColor: "rgba(15,76,129,0.3)" }}
          onClick={() => setExpanded(false)}
          aria-hidden="true"
        />
      )}

      {expanded && (
        <div
          id="mobile-price-sheet"
          ref={sheetRef}
          tabIndex={-1}
          className="fixed bottom-16 left-0 right-0 z-40 bg-white overflow-y-auto focus:outline-none"
          style={{
            maxHeight: "60vh",
            borderRadius: "12px 12px 0 0",
            animation: "slideUp 300ms cubic-bezier(0.4,0,0.2,1)",
          }}
          role="dialog"
          aria-modal="true"
          aria-label={totalLabel}
        >
          <div className="flex items-center justify-between px-5 pt-4 pb-1">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">
              {totalLabel}
            </span>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="p-1 text-gray-500 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]/40"
              aria-label="Bağla"
            >
              <X size={18} />
            </button>
          </div>
          <div className="px-5 pb-5 space-y-3">
            {lineItems.map((item) => (
              <div key={item.key} className="flex justify-between gap-3">
                <span className="text-sm text-gray-800">{item.label}</span>
                <span className="font-bold text-sm text-gray-800 shrink-0">
                  {item.amount.toLocaleString("ru-RU")} {sym}
                </span>
              </div>
            ))}

            <div className="border-t border-gray-200 pt-3 flex justify-between">
              <span className="font-semibold text-sm text-gray-800">{totalLabel}</span>
              <span className="font-bold text-base text-[#0F4C81]">
                {total.toLocaleString("ru-RU")} {sym}
              </span>
            </div>

            {showWhatsApp && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3.5 font-bold text-[13px] text-white rounded-lg"
                style={{ backgroundColor: "#25D366" }}
              >
                <MessageCircle className="inline mr-2" size={16} />
                {whatsappLabel}
              </a>
            )}
          </div>
        </div>
      )}

      <div
        className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between px-5 h-16"
        style={{ backgroundColor: "#0F4C81" }}
        aria-live="polite"
        aria-atomic="true"
      >
        <PriceCounter
          value={total}
          sym={sym}
          className="font-bold text-[18px] text-white"
        />
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1 text-xs font-semibold text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-expanded={expanded}
          aria-controls="mobile-price-sheet"
          aria-label={expanded ? "Qiymət siyahısını bağla" : "Qiymət siyahısını aç"}
        >
          {expandLabel}
          <ChevronUp
            size={14}
            aria-hidden="true"
            className="transition-transform"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </>
  );
}
