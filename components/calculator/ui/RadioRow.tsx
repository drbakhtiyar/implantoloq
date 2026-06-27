"use client";

interface Option {
  id: string;
  name: string;
  description?: string;
  pricePerUnit: number;
}

interface Props {
  option: Option;
  selected: boolean;
  onClick: () => void;
  sym: string;
  perImplantLabel: string;
  implantCount: number;
}

export default function RadioRow({ option, selected, onClick, sym, perImplantLabel, implantCount }: Props) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      tabIndex={selected ? 0 : -1}
      onClick={onClick}
      className={[
        "w-full px-5 py-4 flex items-start gap-4 cursor-pointer transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0F4C81]/40",
        selected ? "bg-blue-50" : "hover:bg-blue-50",
      ].join(" ")}
    >
      <div className="mt-0.5 shrink-0" aria-hidden="true">
        <div
          className={[
            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
            selected ? "border-[#0F4C81]" : "border-gray-200",
          ].join(" ")}
        >
          {selected && <div className="w-2 h-2 rounded-full bg-[#0F4C81]" />}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[15px] text-gray-800">{option.name}</p>
        {option.description && (
          <p className="text-sm text-gray-500 mt-0.5">{option.description}</p>
        )}
      </div>

      <div className="text-right shrink-0" aria-hidden="true">
        <p className="font-bold text-sm text-[#0F4C81]">
          + {(option.pricePerUnit * implantCount).toLocaleString("ru-RU")} {sym}
        </p>
        <p className="text-[11px] text-gray-500">{perImplantLabel}</p>
      </div>
    </button>
  );
}
