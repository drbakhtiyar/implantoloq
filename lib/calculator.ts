export interface ImplantBrand {
  id: string;
  name: string;
  country: string;
  tag: string;
  pricePerUnit: number;
}

export interface CrownType {
  id: string;
  name: string;
  description?: string;
  pricePerUnit: number;
}

export interface AddonConfig {
  boneGraft: { enabled: boolean; pricePerUnit: number; name: string };
  sinusLift: { enabled: boolean; price: number; name: string };
  xray: { enabled: boolean; price: number; name: string };
}

export interface CalcConfig {
  currency: string;
  currencySymbol: string;
  implants: ImplantBrand[];
  crowns: CrownType[];
  addons: AddonConfig;
  discounts: { minImplants: number; percentage: number; label: string }[];
  whatsapp: { number: string };
}

export interface Selections {
  implantCount: number;
  brandId: string;
  crownId: string;
  addons: { boneGraft: boolean; sinusLift: boolean; xray: boolean };
}

export interface LineItem {
  key: string;
  label: string;
  amount: number;
  isDiscount?: boolean;
}

export interface PriceCalc {
  lineItems: LineItem[];
  subtotal: number;
  discount: number;
  discountPct: number;
  total: number;
}

export function calculatePrice(selections: Selections, config: CalcConfig): PriceCalc {
  const brand = config.implants.find((i) => i.id === selections.brandId);
  const crown = config.crowns.find((c) => c.id === selections.crownId);

  if (!brand || !crown) {
    return { lineItems: [], subtotal: 0, discount: 0, discountPct: 0, total: 0 };
  }

  const lineItems: LineItem[] = [];

  lineItems.push({
    key: "implants",
    label: `${brand.name} × ${selections.implantCount}`,
    amount: brand.pricePerUnit * selections.implantCount,
  });

  lineItems.push({
    key: "crowns",
    label: `${crown.name} × ${selections.implantCount}`,
    amount: crown.pricePerUnit * selections.implantCount,
  });

  if (selections.addons.boneGraft && config.addons.boneGraft.enabled) {
    lineItems.push({
      key: "boneGraft",
      label: config.addons.boneGraft.name,
      amount: config.addons.boneGraft.pricePerUnit * selections.implantCount,
    });
  }

  if (selections.addons.sinusLift && config.addons.sinusLift.enabled) {
    lineItems.push({
      key: "sinusLift",
      label: config.addons.sinusLift.name,
      amount: config.addons.sinusLift.price,
    });
  }

  if (selections.addons.xray && config.addons.xray.enabled) {
    lineItems.push({
      key: "xray",
      label: config.addons.xray.name,
      amount: config.addons.xray.price,
    });
  }

  const subtotal = lineItems.reduce((sum, l) => sum + l.amount, 0);

  const applicableDiscount = [...config.discounts]
    .sort((a, b) => b.minImplants - a.minImplants)
    .find((d) => selections.implantCount >= d.minImplants);

  const discountPct = applicableDiscount?.percentage ?? 0;
  const discount = Math.round((subtotal * discountPct) / 100);

  return { lineItems, subtotal, discount, discountPct, total: subtotal - discount };
}

export function formatPrice(n: number, sym: string): string {
  return `${n.toLocaleString("ru-RU")} ${sym}`;
}

export function buildWhatsAppMessage(
  name: string,
  selections: Selections,
  config: CalcConfig,
  total: number
): string {
  const brand = config.implants.find((i) => i.id === selections.brandId);
  const crown = config.crowns.find((c) => c.id === selections.crownId);

  const addons = [
    selections.addons.boneGraft ? config.addons.boneGraft.name : "",
    selections.addons.sinusLift ? config.addons.sinusLift.name : "",
    selections.addons.xray ? config.addons.xray.name : "",
  ]
    .filter(Boolean)
    .join(", ");

  return [
    "Salam! Kalkulyatoru istifadə etdim.",
    `Adım: ${name}`,
    `Seçimim: ${selections.implantCount} implant, ${brand?.name ?? ""}, ${crown?.name ?? ""}`,
    `Əlavələr: ${addons || "Yoxdur"}`,
    `Təxmini qiymət: ${total.toLocaleString()} AZN`,
    "Pulsuz konsultasiya istəyirəm.",
  ].join("\n");
}
