"use client";

import BrandCard from "@/components/calculator/ui/BrandCard";
import type { ImplantBrand } from "@/lib/calculator";

interface Props {
  brands: ImplantBrand[];
  selected: string;
  onChange: (id: string) => void;
  heading: string;
  subheading?: string;
  stepLabel: string;
  sym: string;
  perImplantLabel: string;
}

export default function BrandSelectStep({
  brands,
  selected,
  onChange,
  heading,
  subheading,
  stepLabel,
  sym,
  perImplantLabel,
}: Props) {
  function handleKeyDown(e: React.KeyboardEvent) {
    const idx = brands.findIndex((b) => b.id === selected);
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = brands[(idx + 1) % brands.length];
      onChange(next.id);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = brands[(idx - 1 + brands.length) % brands.length];
      onChange(prev.id);
    }
  }

  return (
    <section id="step-panel-2" aria-labelledby="step-tab-2">
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
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        onKeyDown={handleKeyDown}
      >
        {brands.map((brand) => (
          <BrandCard
            key={brand.id}
            brand={brand}
            selected={selected === brand.id}
            onClick={() => onChange(brand.id)}
            sym={sym}
            perImplantLabel={perImplantLabel}
          />
        ))}
      </div>
    </section>
  );
}
