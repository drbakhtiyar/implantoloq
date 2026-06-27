"use client";

import { Check } from "lucide-react";
import type { ImplantBrand } from "@/lib/calculator";

interface Props {
  brand: ImplantBrand;
  selected: boolean;
  onClick: () => void;
  sym: string;
  perImplantLabel: string;
}

export default function BrandCard({ brand, selected, onClick, sym, perImplantLabel }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      role="radio"
      aria-checked={selected}
      tabIndex={selected ? 0 : -1}
      aria-label={`${brand.name} — ${brand.pricePerUnit.toLocaleString("ru-RU")} ${sym} ${perImplantLabel}, ${brand.country}`}
      className={[
        "relative text-left p-5 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]/40",
        selected
          ? "bg-[#0F4C81] text-white border-0 border-t-[3px] border-t-white/30"
          : "bg-gray-50 border border-gray-200 hover:bg-blue-50",
      ].join(" ")}
      style={{
        boxShadow: selected
          ? "0 4px 16px rgba(15,76,129,0.20)"
          : "0 1px 3px rgba(15,76,129,0.08)",
      }}
    >
      {selected && (
        <div aria-hidden="true" className="absolute top-3 right-3 w-5 h-5 bg-white rounded-full flex items-center justify-center">
          <Check size={11} className="text-[#0F4C81]" />
        </div>
      )}

      <div className="flex items-center justify-center w-12 h-12 mb-3 mx-auto">
        <div
          className={[
            "w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold",
            selected ? "bg-white/20 text-white" : "bg-[#0F4C81]/10 text-[#0F4C81]",
          ].join(" ")}
        >
          {brand.name.charAt(0)}
        </div>
      </div>

      <p
        className={[
          "font-semibold text-sm text-center mb-1",
          selected ? "text-white" : "text-gray-800",
        ].join(" ")}
      >
        {brand.name}
      </p>

      <p
        className={[
          "font-bold text-base text-center mb-1",
          selected ? "text-white/90" : "text-[#0F4C81]",
        ].join(" ")}
      >
        {brand.pricePerUnit.toLocaleString("ru-RU")} {sym}
      </p>

      <p
        className={[
          "text-[11px] text-center",
          selected ? "text-white/70" : "text-gray-500",
        ].join(" ")}
      >
        {perImplantLabel} · {brand.country}
      </p>

      <div className="mt-2 text-center">
        <span
          className={[
            "inline-block text-[10px] font-bold tracking-widest px-2 py-0.5 border",
            selected ? "border-white/60 text-white" : "border-[#0F4C81]/30 text-[#0F4C81]",
          ].join(" ")}
        >
          {brand.tag}
        </span>
      </div>
    </button>
  );
}
