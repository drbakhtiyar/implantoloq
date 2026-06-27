"use client";

import { MessageCircle } from "lucide-react";
import PriceCounter from "@/components/calculator/ui/PriceCounter";
import type { LineItem } from "@/lib/calculator";

interface Props {
  lineItems: LineItem[];
  total: number;
  sym: string;
  whatsappHref: string;
  whatsappLabel: string;
  totalLabel: string;
  subtotalLabel: string;
  headerLabel?: string;
  showWhatsApp: boolean;
}

export default function LivePricePanel({
  lineItems,
  total,
  sym,
  whatsappHref,
  whatsappLabel,
  totalLabel,
  subtotalLabel,
  headerLabel = "CARİ QİYMƏT",
  showWhatsApp,
}: Props) {
  return (
    <aside
      aria-live="polite"
      aria-atomic="true"
      aria-label={headerLabel}
      className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm"
    >
      <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">
        {headerLabel}
      </p>

      <div className="mb-4">
        <PriceCounter
          value={total}
          sym={sym}
          className="font-bold text-[36px] leading-none text-[#0F4C81]"
        />
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-2">
        {lineItems.map((item, i) => (
          <div
            key={item.key}
            className="flex justify-between gap-3"
            style={{
              animation: `fadeSlideIn 200ms ease-out ${i * 50}ms both`,
            }}
          >
            <span className="text-sm text-gray-800 leading-snug">{item.label}</span>
            <span className="font-bold text-sm text-gray-800 shrink-0">
              {item.amount.toLocaleString("ru-RU")} {sym}
            </span>
          </div>
        ))}
      </div>

      {lineItems.length > 0 && (
        <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between">
          <span className="font-semibold text-sm text-gray-800">{subtotalLabel}</span>
          <span className="font-bold text-base text-[#0F4C81]">
            {total.toLocaleString("ru-RU")} {sym}
          </span>
        </div>
      )}

      {showWhatsApp && (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full flex items-center justify-center gap-2 py-3 font-bold text-[13px] text-white rounded-lg transition-colors"
          style={{ backgroundColor: "#25D366" }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1DAF57")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#25D366")}
        >
          <MessageCircle size={16} />
          {whatsappLabel}
        </a>
      )}

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </aside>
  );
}
