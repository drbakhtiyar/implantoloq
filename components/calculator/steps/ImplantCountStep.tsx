"use client";

interface Props {
  value: number;
  onChange: (n: number) => void;
  heading: string;
  subheading?: string;
  stepLabel: string;
}

const QUICK_PICKS = [1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 20];

export default function ImplantCountStep({
  value,
  onChange,
  heading,
  subheading,
  stepLabel,
}: Props) {
  function clamp(n: number) {
    return Math.min(20, Math.max(1, n));
  }

  return (
    <section id="step-panel-1" aria-labelledby="step-tab-1">
      <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-2">
        {stepLabel}
      </p>
      <h2 className="font-semibold text-[22px] text-[#0F4C81] mb-6">
        {heading}
      </h2>
      {subheading && (
        <p className="text-sm text-gray-500 mb-8">{subheading}</p>
      )}

      <div className="mb-6">
        <input
          type="range"
          min={1}
          max={20}
          step={1}
          value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value)))}
          onKeyDown={(e) => {
            if (e.key === "PageUp") { e.preventDefault(); onChange(clamp(value + 5)); }
            if (e.key === "PageDown") { e.preventDefault(); onChange(clamp(value - 5)); }
          }}
          className="calc-range"
          style={{
            background: `linear-gradient(to right, #0F4C81 ${((value - 1) / 19) * 100}%, #E5E7EB ${((value - 1) / 19) * 100}%)`,
          }}
          aria-label="İmplant sayı"
          aria-valuemin={1}
          aria-valuemax={20}
          aria-valuenow={value}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1</span>
          <span>20</span>
        </div>
      </div>

      <div className="flex items-center justify-center mb-8">
        <button
          type="button"
          onClick={() => onChange(clamp(value - 1))}
          className="w-12 h-12 border-2 border-gray-200 hover:border-[#0F4C81] text-[#0F4C81] text-2xl font-bold flex items-center justify-center rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]/40"
          aria-label="Azalt"
        >
          −
        </button>
        <div className="mx-6 text-center">
          <div
            className="text-[64px] leading-none font-bold text-[#0F4C81]"
            aria-live="polite"
            aria-atomic="true"
          >
            {value}
          </div>
          <p className="text-xs text-gray-500 mt-1">implant</p>
        </div>
        <button
          type="button"
          onClick={() => onChange(clamp(value + 1))}
          className="w-12 h-12 border-2 border-gray-200 hover:border-[#0F4C81] text-[#0F4C81] text-2xl font-bold flex items-center justify-center rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]/40"
          aria-label="Artır"
        >
          +
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 justify-center">
        {QUICK_PICKS.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={[
              "w-9 h-9 text-xs font-bold border rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]/40",
              value === n
                ? "bg-[#0F4C81] text-white border-[#0F4C81]"
                : "border-gray-200 text-gray-500 hover:border-[#0F4C81]",
            ].join(" ")}
            aria-pressed={value === n}
          >
            {n}
          </button>
        ))}
      </div>

      <style>{`
        .calc-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          outline: none;
          cursor: pointer;
        }
        .calc-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #0F4C81;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(15,76,129,0.3);
        }
        .calc-range::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #0F4C81;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </section>
  );
}
