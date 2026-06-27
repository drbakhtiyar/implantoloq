"use client";

import { Check } from "lucide-react";

interface Step {
  label: string;
}

interface Props {
  steps: Step[];
  activeStep: number;
  mobileLabel?: string;
}

export default function ProgressBar({ steps, activeStep, mobileLabel }: Props) {
  return (
    <>
      <p className="lg:hidden text-xs text-gray-500 mb-6">
        {mobileLabel ?? `Addım ${activeStep} / ${steps.length}`}
      </p>

      <nav aria-label="Addımlar" className="hidden lg:block mb-8">
        <ol className="flex items-center list-none p-0 m-0">
          {steps.map((step, idx) => {
            const num = idx + 1;
            const isDone = num < activeStep;
            const isActive = num === activeStep;

            return (
              <li key={num} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <span
                    id={`step-tab-${num}`}
                    aria-current={isActive ? "step" : undefined}
                    aria-label={`${num}. addım: ${step.label}${isDone ? " (tamamlandı)" : isActive ? " (aktiv)" : ""}`}
                    className={[
                      "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs shrink-0",
                      isDone
                        ? "bg-[#0F4C81]"
                        : isActive
                        ? "bg-[#0F4C81]"
                        : "bg-gray-200",
                    ].join(" ")}
                  >
                    {isDone ? (
                      <Check size={14} className="text-white" aria-hidden="true" />
                    ) : (
                      <span className={isActive ? "text-white" : "text-gray-500"} aria-hidden="true">
                        {num}
                      </span>
                    )}
                  </span>
                  <span
                    className={[
                      "mt-1.5 text-[11px] whitespace-nowrap",
                      isActive ? "text-[#0F4C81] font-semibold" : "text-gray-500",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {step.label}
                  </span>
                </div>

                {idx < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className={[
                      "flex-1 h-0.5 mx-2 mb-5",
                      isDone ? "bg-[#0F4C81]" : "bg-gray-200",
                    ].join(" ")}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
