"use client";

import RadioRow from "@/components/calculator/ui/RadioRow";
import type { CrownType } from "@/lib/calculator";

interface Props {
  crownTypes: CrownType[];
  selected: string;
  onChange: (id: string) => void;
  heading: string;
  subheading?: string;
  stepLabel: string;
  sym: string;
  perImplantLabel: string;
  implantCount: number;
}

export default function CrownSelectStep({
  crownTypes,
  selected,
  onChange,
  heading,
  subheading,
  stepLabel,
  sym,
  perImplantLabel,
  implantCount,
}: Props) {
  function handleKeyDown(e: React.KeyboardEvent) {
    const idx = crownTypes.findIndex((c) => c.id === selected);
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = crownTypes[(idx + 1) % crownTypes.length];
      onChange(next.id);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = crownTypes[(idx - 1 + crownTypes.length) % crownTypes.length];
      onChange(prev.id);
    }
  }

  return (
    <section id="step-panel-3" aria-labelledby="step-tab-3">
      <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-2">
        {stepLabel}
      </p>
      <h2 className="font-semibold text-[22px] text-[#0F4C81] mb-2">
        {heading}
      </h2>
      {subheading && (
        <p className="text-sm text-gray-500 mb-6">{subheading}</p>
      )}

      <div
        role="radiogroup"
        aria-label={heading}
        className="border border-gray-200 divide-y divide-gray-200 rounded-lg overflow-hidden"
        onKeyDown={handleKeyDown}
      >
        {crownTypes.map((crown) => (
          <RadioRow
            key={crown.id}
            option={crown}
            selected={selected === crown.id}
            onClick={() => onChange(crown.id)}
            sym={sym}
            perImplantLabel={perImplantLabel}
            implantCount={implantCount}
          />
        ))}
      </div>
    </section>
  );
}
