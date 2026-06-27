"use client";

import CheckboxRow from "@/components/calculator/ui/CheckboxRow";
import type { AddonConfig } from "@/lib/calculator";

interface AddonSelections {
  boneGraft: boolean;
  sinusLift: boolean;
  xray: boolean;
}

interface Props {
  addons: AddonConfig;
  selected: AddonSelections;
  onChange: (key: keyof AddonSelections, checked: boolean) => void;
  heading: string;
  subheading?: string;
  stepLabel: string;
  sym: string;
  implantCount: number;
  perImplantLabel: string;
  oneTimeLabel: string;
}

export default function AddonsStep({
  addons,
  selected,
  onChange,
  heading,
  subheading,
  stepLabel,
  sym,
  implantCount,
  perImplantLabel,
  oneTimeLabel,
}: Props) {
  return (
    <section id="step-panel-4" aria-labelledby="step-tab-4">
      <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-2">
        {stepLabel}
      </p>
      <h2 className="font-semibold text-[22px] text-[#0F4C81] mb-2">
        {heading}
      </h2>
      {subheading && (
        <p className="text-sm text-gray-500 mb-6">{subheading}</p>
      )}

      <div className="border border-gray-200 divide-y divide-gray-200 rounded-lg overflow-hidden">
        {addons.boneGraft.enabled && (
          <CheckboxRow
            option={{
              key: "boneGraft",
              name: addons.boneGraft.name,
              description: "Çənə sümüyü az olduqda lazım olur",
              amount: addons.boneGraft.pricePerUnit * implantCount,
              pricingNote: perImplantLabel,
            }}
            checked={selected.boneGraft}
            onChange={(v) => onChange("boneGraft", v)}
            sym={sym}
          />
        )}
        {addons.sinusLift.enabled && (
          <CheckboxRow
            option={{
              key: "sinusLift",
              name: addons.sinusLift.name,
              description: "Yuxarı çənə üçün",
              amount: addons.sinusLift.price,
              pricingNote: oneTimeLabel,
            }}
            checked={selected.sinusLift}
            onChange={(v) => onChange("sinusLift", v)}
            sym={sym}
          />
        )}
        {addons.xray.enabled && (
          <CheckboxRow
            option={{
              key: "xray",
              name: addons.xray.name,
              description: "Olmadıqda tövsiyə edilir",
              amount: addons.xray.price,
              pricingNote: oneTimeLabel,
            }}
            checked={selected.xray}
            onChange={(v) => onChange("xray", v)}
            sym={sym}
          />
        )}
      </div>
    </section>
  );
}
