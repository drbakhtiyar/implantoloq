"use client";

import { Check } from "lucide-react";

interface Option {
  key: "boneGraft" | "sinusLift" | "xray";
  name: string;
  description?: string;
  amount: number;
  pricingNote: string;
}

interface Props {
  option: Option;
  checked: boolean;
  onChange: (checked: boolean) => void;
  sym: string;
}

export default function CheckboxRow({ option, checked, onChange, sym }: Props) {
  return (
    <label
      className={[
        "flex items-start gap-4 px-5 py-4 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#0F4C81]/40",
        checked ? "bg-blue-50" : "hover:bg-blue-50",
      ].join(" ")}
    >
      <div className="mt-0.5 shrink-0">
        <div
          className={[
            "w-5 h-5 border-2 flex items-center justify-center transition-colors",
            checked ? "bg-[#0F4C81] border-[#0F4C81]" : "border-gray-200",
          ].join(" ")}
        >
          {checked && <Check size={12} className="text-white" />}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[15px] text-gray-800">{option.name}</p>
        {option.description && (
          <p className="text-sm text-gray-500 mt-0.5">{option.description}</p>
        )}
      </div>

      <div className="text-right shrink-0">
        <p className="font-bold text-sm text-[#0F4C81]">
          + {option.amount.toLocaleString("ru-RU")} {sym}
        </p>
        <p className="text-[11px] text-gray-500">{option.pricingNote}</p>
      </div>

      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={option.name}
      />
    </label>
  );
}
