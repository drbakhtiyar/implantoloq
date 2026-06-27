"use client";

import { useReducer, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calculator } from "lucide-react";

import LeadGateForm from "@/components/calculator/LeadGateForm";
import ProgressBar from "@/components/calculator/ProgressBar";
import ImplantCountStep from "@/components/calculator/steps/ImplantCountStep";
import BrandSelectStep from "@/components/calculator/steps/BrandSelectStep";
import CrownSelectStep from "@/components/calculator/steps/CrownSelectStep";
import AddonsStep from "@/components/calculator/steps/AddonsStep";
import LivePricePanel from "@/components/calculator/LivePricePanel";
import MobilePriceBar from "@/components/calculator/MobilePriceBar";
import ResultScreen from "@/components/calculator/ResultScreen";

import {
  calculatePrice,
  buildWhatsAppMessage,
  type CalcConfig,
  type Selections,
} from "@/lib/calculator";

type Phase = "gate" | "wizard" | "result";

interface State {
  phase: Phase;
  lead: { name: string; phone: string };
  step: number;
  selections: Selections;
  submitting: boolean;
}

type Action =
  | { type: "GATE_SUBMIT"; name: string; phone: string }
  | { type: "SET_COUNT"; count: number }
  | { type: "SET_BRAND"; id: string }
  | { type: "SET_CROWN"; id: string }
  | { type: "SET_ADDON"; key: keyof Selections["addons"]; checked: boolean }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_DONE" }
  | { type: "RESET" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "GATE_SUBMIT":
      return { ...state, phase: "wizard", lead: { name: action.name, phone: action.phone } };
    case "SET_COUNT":
      return { ...state, selections: { ...state.selections, implantCount: action.count } };
    case "SET_BRAND":
      return { ...state, selections: { ...state.selections, brandId: action.id } };
    case "SET_CROWN":
      return { ...state, selections: { ...state.selections, crownId: action.id } };
    case "SET_ADDON":
      return {
        ...state,
        selections: {
          ...state.selections,
          addons: { ...state.selections.addons, [action.key]: action.checked },
        },
      };
    case "NEXT_STEP":
      return { ...state, step: Math.min(4, state.step + 1) };
    case "PREV_STEP":
      return { ...state, step: Math.max(1, state.step - 1) };
    case "SUBMIT_START":
      return { ...state, submitting: true };
    case "SUBMIT_DONE":
      return { ...state, submitting: false, phase: "result" };
    case "RESET":
      return initialState;
  }
}

const initialState: State = {
  phase: "gate",
  lead: { name: "", phone: "" },
  step: 1,
  selections: { implantCount: 1, brandId: "", crownId: "", addons: { boneGraft: false, sinusLift: false, xray: false } },
  submitting: false,
};

export interface CalculatorT {
  gateTitle: string;
  gateSubtitle: string;
  namePlaceholder: string;
  phonePlaceholder: string;
  gateBtn: string;
  privacyNote: string;
  step1Title: string;
  step1Sub: string;
  step2Title: string;
  step2Sub: string;
  step2Tag: string;
  step3Title: string;
  step3Sub: string;
  step4Title: string;
  step4Sub: string;
  addonBoneGraft: string;
  addonSinusLift: string;
  addonXray: string;
  addonPerImplant: string;
  addonOnetime: string;
  back: string;
  next: string;
  calculate: string;
  resultTitle: string;
  resultSub: string;
  lineImplants: string;
  lineCrowns: string;
  lineBoneGraft: string;
  lineSinusLift: string;
  lineXray: string;
  lineDiscount: string;
  totalLabel: string;
  resultNote: string;
  ctaWhatsApp: string;
  ctaCall: string;
  ctaBook: string;
  implants: string;
  implantCount: string;
  selected: string;
  currency: string;
  perUnit: string;
  perImplant: string;
}

interface Props {
  locale: string;
  config: CalcConfig;
  t: CalculatorT;
}

const STEP_LABELS = (t: CalculatorT) => [
  t.implantCount,
  t.step2Tag,
  t.lineCrowns,
  t.addonBoneGraft.split(" ")[0],
];

export default function CalculatorPage({ locale, config, t }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const stepHeadingRef = useRef<HTMLSpanElement>(null);

  const sym = config.currencySymbol;
  const priceCalc = calculatePrice(state.selections, config);
  const canProceed =
    state.step === 1
      ? state.selections.implantCount >= 1
      : state.step === 2
      ? Boolean(state.selections.brandId)
      : state.step === 3
      ? Boolean(state.selections.crownId)
      : true;

  const waMessage = buildWhatsAppMessage(
    state.lead.name,
    state.selections,
    config,
    priceCalc.total
  );
  const waHref = `https://wa.me/${config.whatsapp.number}?text=${encodeURIComponent(waMessage)}`;

  useEffect(() => {
    if (state.phase === "wizard") {
      stepHeadingRef.current?.focus();
    }
  }, [state.step, state.phase]);

  async function handleCalculate() {
    dispatch({ type: "SUBMIT_START" });

    const brand = config.implants.find((i) => i.id === state.selections.brandId);
    const crown = config.crowns.find((c) => c.id === state.selections.crownId);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.lead.name,
          phone: state.lead.phone,
          locale,
          implantCount: state.selections.implantCount,
          brandId: state.selections.brandId,
          brandName: brand?.name ?? state.selections.brandId,
          crownId: state.selections.crownId,
          crownName: crown?.name ?? state.selections.crownId,
          addons: state.selections.addons,
          totalPrice: priceCalc.total,
          discountPercentage: priceCalc.discountPct,
        }),
      });
    } catch {
      // Silent — lead submit is best-effort
    }

    dispatch({ type: "SUBMIT_DONE" });
  }

  if (state.phase === "gate") {
    return (
      <div className="min-h-[calc(100vh-68px)] flex items-center justify-center px-5 py-16 bg-gray-50">
        <LeadGateForm
          onSubmit={(name, phone) => dispatch({ type: "GATE_SUBMIT", name, phone })}
          title={t.gateTitle}
          subtitle={t.gateSubtitle}
          namePlaceholder={t.namePlaceholder}
          phonePlaceholder={t.phonePlaceholder}
          submitLabel={t.gateBtn}
          privacyNote={t.privacyNote}
        />
      </div>
    );
  }

  if (state.phase === "result") {
    return (
      <div className="bg-gray-50 min-h-[calc(100vh-68px)]">
        <ResultScreen
          name={state.lead.name}
          lineItems={priceCalc.lineItems}
          total={priceCalc.total}
          sym={sym}
          whatsappHref={waHref}
          phoneNumber={t.ctaCall}
          onReset={() => dispatch({ type: "RESET" })}
          heading={t.resultTitle}
          subtitle={t.resultSub}
          totalLabel={t.totalLabel}
          whatsappLabel={t.ctaWhatsApp}
          callLabel={t.ctaBook}
          resetLabel="Yenidən hesabla"
          disclaimer={t.resultNote}
        />
      </div>
    );
  }

  const stepLabels = STEP_LABELS(t);
  const steps = stepLabels.map((label) => ({ label }));
  const showPricePanel = state.step >= 1 && priceCalc.total > 0;

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-68px)]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12">
        <div className="flex gap-8 items-start">
          <div className="flex-1 min-w-0">
            <div className="bg-white border border-gray-200 p-6 lg:p-10 rounded-lg shadow-sm">
              <ProgressBar
                steps={steps}
                activeStep={state.step}
                mobileLabel={`Addım ${state.step} / 4`}
              />

              <span
                ref={stepHeadingRef}
                tabIndex={-1}
                className="sr-only"
              >
                {`Addım ${state.step} / 4: ${[t.step1Title, t.step2Title, t.step3Title, t.step4Title][state.step - 1] ?? ""}`}
              </span>

              <div
                key={state.step}
                style={{ animation: "stepIn 250ms ease-in-out" }}
              >
                {state.step === 1 && (
                  <ImplantCountStep
                    value={state.selections.implantCount}
                    onChange={(n) => dispatch({ type: "SET_COUNT", count: n })}
                    heading={t.step1Title}
                    subheading={t.step1Sub}
                    stepLabel={`Addım 1 / 4`}
                  />
                )}

                {state.step === 2 && (
                  <BrandSelectStep
                    brands={config.implants}
                    selected={state.selections.brandId}
                    onChange={(id) => dispatch({ type: "SET_BRAND", id })}
                    heading={t.step2Title}
                    subheading={t.step2Sub}
                    stepLabel={`Addım 2 / 4`}
                    sym={sym}
                    perImplantLabel={t.perImplant}
                  />
                )}

                {state.step === 3 && (
                  <CrownSelectStep
                    crownTypes={config.crowns}
                    selected={state.selections.crownId}
                    onChange={(id) => dispatch({ type: "SET_CROWN", id })}
                    heading={t.step3Title}
                    subheading={t.step3Sub}
                    stepLabel={`Addım 3 / 4`}
                    sym={sym}
                    perImplantLabel={t.perImplant}
                    implantCount={state.selections.implantCount}
                  />
                )}

                {state.step === 4 && (
                  <AddonsStep
                    addons={config.addons}
                    selected={state.selections.addons}
                    onChange={(key, checked) => dispatch({ type: "SET_ADDON", key, checked })}
                    heading={t.step4Title}
                    subheading={t.step4Sub}
                    stepLabel={`Addım 4 / 4`}
                    sym={sym}
                    implantCount={state.selections.implantCount}
                    perImplantLabel={t.addonPerImplant}
                    oneTimeLabel={t.addonOnetime}
                  />
                )}
              </div>

              <div className="flex items-center gap-3 mt-8">
                {state.step > 1 && (
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "PREV_STEP" })}
                    className="flex items-center gap-1.5 border border-gray-200 text-gray-500 font-semibold text-sm px-5 py-3 rounded-lg hover:border-[#0F4C81] hover:text-[#0F4C81] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]/40"
                  >
                    <ChevronLeft size={16} />
                    {t.back}
                  </button>
                )}

                <div className="flex-1" />

                {state.step < 4 ? (
                  <button
                    type="button"
                    disabled={!canProceed}
                    onClick={() => dispatch({ type: "NEXT_STEP" })}
                    className="flex items-center gap-1.5 font-bold text-sm px-8 py-3 text-white rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]/40"
                    style={{ backgroundColor: "#0F4C81" }}
                    onMouseOver={(e) => {
                      if (!e.currentTarget.disabled)
                        e.currentTarget.style.backgroundColor = "#0d3d6b";
                    }}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#0F4C81")}
                  >
                    {t.next}
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={state.submitting}
                    aria-busy={state.submitting}
                    aria-label={state.submitting ? "Hesablanır..." : undefined}
                    onClick={handleCalculate}
                    className="flex items-center gap-2 font-bold text-sm px-8 py-3 text-white rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]/40"
                    style={{ backgroundColor: "#0F4C81" }}
                    onMouseOver={(e) => {
                      if (!e.currentTarget.disabled)
                        e.currentTarget.style.backgroundColor = "#0d3d6b";
                    }}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#0F4C81")}
                  >
                    <Calculator size={16} aria-hidden="true" />
                    <span aria-hidden={state.submitting ? true : undefined}>
                      {state.submitting ? "..." : t.calculate}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-80 shrink-0 sticky top-[88px]">
            {showPricePanel ? (
              <LivePricePanel
                lineItems={priceCalc.lineItems}
                total={priceCalc.total}
                sym={sym}
                whatsappHref={waHref}
                whatsappLabel={t.ctaWhatsApp}
                totalLabel={t.totalLabel}
                subtotalLabel={t.totalLabel}
                showWhatsApp={state.step >= 1}
              />
            ) : (
              <div
                className="bg-white border border-gray-200 p-6 flex flex-col items-center justify-center gap-3 text-center rounded-lg shadow-sm"
                style={{ minHeight: 160 }}
              >
                <Calculator size={28} className="text-gray-400" />
                <p className="text-sm text-gray-500 leading-relaxed">
                  Seçim etdikcə qiymət burada görünəcək
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <MobilePriceBar
          total={priceCalc.total}
          lineItems={priceCalc.lineItems}
          sym={sym}
          whatsappHref={waHref}
          whatsappLabel={t.ctaWhatsApp}
          totalLabel={t.totalLabel}
          showWhatsApp={state.step >= 1 && priceCalc.total > 0}
          expandLabel="Hamısını gör ↑"
        />
      </div>

      <div className="lg:hidden h-16" aria-hidden="true" />

      <style>{`
        @keyframes stepIn {
          from { opacity: 0; transform: translateX(12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}
