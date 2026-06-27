"use client";

import { CheckCircle, Phone, MessageCircle, RotateCcw } from "lucide-react";
import type { LineItem } from "@/lib/calculator";

interface Props {
  name: string;
  lineItems: LineItem[];
  total: number;
  sym: string;
  whatsappHref: string;
  phoneNumber?: string;
  onReset: () => void;
  heading?: string;
  subtitle?: string;
  totalLabel?: string;
  whatsappLabel?: string;
  callLabel?: string;
  callSubLabel?: string;
  resetLabel?: string;
  disclaimer?: string;
  caveat?: string;
  selectionHeader?: string;
}

export default function ResultScreen({
  lineItems,
  total,
  sym,
  whatsappHref,
  phoneNumber = "+994 10 501 01 07",
  onReset,
  heading = "Hesablama hazırdır!",
  subtitle = "Sizin üçün təxmini qiymət:",
  totalLabel = "Cəmi",
  whatsappLabel = "WhatsApp ilə nəticəni göndər",
  callLabel = "Pulsuz konsultasiya üçün zəng edin",
  callSubLabel = "",
  resetLabel = "Yenidən hesabla",
  disclaimer = "*Qiymətlər həkimlə konsultasiyadan sonra dəqiqləşdirilir.",
  caveat = "(təxmini, konsultasiyadan asılı ola bilər)",
  selectionHeader = "Seçimləriniz:",
}: Props) {
  return (
    <div className="max-w-[680px] mx-auto px-5 py-12">
      <div className="flex justify-center mb-5">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(15,76,129,0.10)" }}
        >
          <CheckCircle size={32} className="text-[#0F4C81]" />
        </div>
      </div>

      <h2 className="font-bold text-[28px] lg:text-[36px] text-[#0F4C81] text-center mb-2">
        {heading}
      </h2>
      <p className="text-[15px] text-gray-500 text-center mb-8">{subtitle}</p>

      <div className="bg-white border border-gray-200 p-8 mb-6 rounded-lg shadow-sm">
        <div className="text-center mb-6">
          <p
            className="font-bold leading-none mb-1 text-[#0F4C81]"
            style={{ fontSize: "48px" }}
          >
            {total.toLocaleString("ru-RU")} {sym}
          </p>
          <p className="text-xs text-gray-500 italic">{caveat}</p>
        </div>

        <div className="border-t border-gray-200 my-5" />

        <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">
          {selectionHeader}
        </p>

        <div className="space-y-3">
          {lineItems.map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              <span className="text-sm text-gray-800 flex-1">{item.label}</span>
              <span className="flex-1 border-b border-dotted border-gray-200 mx-2 self-center" />
              <span className="font-bold text-sm text-gray-800 shrink-0">
                {item.amount.toLocaleString("ru-RU")} {sym}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 mt-5 pt-4 flex items-center justify-between">
          <span className="font-bold text-sm text-gray-800">{totalLabel}</span>
          <span className="font-bold text-base text-[#0F4C81]">
            {total.toLocaleString("ru-RU")} {sym}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <a
          href={`tel:${phoneNumber.replace(/\s/g, "")}`}
          className="w-full flex flex-col items-center justify-center gap-1 py-5 text-white rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]/40"
          style={{ backgroundColor: "#0F4C81" }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0d3d6b")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#0F4C81")}
        >
          {callLabel && (
            <span className="text-xs text-white/80 mb-1">{callLabel}</span>
          )}
          <div className="flex items-center gap-2">
            <Phone size={18} className="text-white" />
            <span className="font-bold text-base text-white">{phoneNumber}</span>
          </div>
          {callSubLabel && (
            <span className="text-xs text-white/70">{callSubLabel}</span>
          )}
        </a>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-4 font-bold text-[13px] text-white rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-600"
          style={{ backgroundColor: "#25D366" }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1DAF57")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#25D366")}
        >
          <MessageCircle size={18} />
          {whatsappLabel}
        </a>

        <button
          type="button"
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 py-4 border border-gray-200 font-semibold text-sm text-gray-500 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]/40"
        >
          <RotateCcw size={15} />
          {resetLabel}
        </button>
      </div>

      <p className="text-[11px] text-gray-500 italic text-center mt-6">
        {disclaimer}
      </p>
    </div>
  );
}
