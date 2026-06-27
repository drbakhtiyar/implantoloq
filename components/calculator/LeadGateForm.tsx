"use client";

import { useState } from "react";
import { Calculator, Lock } from "lucide-react";

interface Props {
  onSubmit: (name: string, phone: string) => void;
  title?: string;
  subtitle?: string;
  namePlaceholder?: string;
  phonePlaceholder?: string;
  submitLabel?: string;
  privacyNote?: string;
}

export default function LeadGateForm({
  onSubmit,
  title = "Qiymət Kalkulyatoru",
  subtitle = "İmplant müalicəsinin təxmini dəyərini hesablamaq üçün əlaqə məlumatlarınızı daxil edin.",
  namePlaceholder = "Ad Soyad",
  phonePlaceholder = "Telefon nömrəsi",
  submitLabel = "Kalkulyatoru Aç →",
  privacyNote = "Məlumatlarınız təhlükəsizdir",
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  function validate(): boolean {
    let valid = true;
    if (!name.trim()) {
      setNameError("Ad daxil edin");
      valid = false;
    } else {
      setNameError("");
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 9) {
      setPhoneError("Düzgün telefon nömrəsi daxil edin");
      valid = false;
    } else {
      setPhoneError("");
    }
    return valid;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSubmit(name.trim(), phone.trim());
  }

  return (
    <div
      className="max-w-[480px] mx-auto bg-white border border-gray-200 shadow-sm"
      style={{ padding: "40px 32px" }}
    >
      <div className="flex justify-center mb-5">
        <div className="w-12 h-12 flex items-center justify-center bg-[#0F4C81] rounded-lg">
          <Calculator size={24} className="text-white" />
        </div>
      </div>

      <h2 className="font-bold text-[28px] text-[#0F4C81] text-center mb-3">
        {title}
      </h2>
      <p className="text-[15px] text-gray-500 text-center leading-relaxed mb-8">
        {subtitle}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="gate-name" className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">
            AD SOYAD *
          </label>
          <input
            id="gate-name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={namePlaceholder}
            aria-invalid={!!nameError}
            aria-describedby={nameError ? "name-error" : undefined}
            className={[
              "w-full h-12 px-4 text-sm text-gray-800 placeholder:text-gray-400 border rounded-md focus:outline-none",
              nameError
                ? "border-red-600 focus:ring-2 focus:ring-red-600/20"
                : "border-gray-200 focus:ring-2 focus:ring-[#0F4C81]/30",
            ].join(" ")}
          />
          {nameError && (
            <p
              id="name-error"
              role="alert"
              aria-live="assertive"
              className="mt-1 text-xs"
              style={{ color: "#DC2626" }}
            >
              {nameError}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="gate-phone" className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">
            TELEFON NÖMRƏSİ *
          </label>
          <div className="flex">
            <span aria-hidden="true" className="flex items-center px-3 border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 shrink-0 rounded-l-md">
              +994
            </span>
            <input
              id="gate-phone"
              type="tel"
              required
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={phonePlaceholder}
              aria-invalid={!!phoneError}
              aria-describedby={phoneError ? "phone-error" : undefined}
              className={[
                "flex-1 h-12 px-4 text-sm text-gray-800 placeholder:text-gray-400 border rounded-r-md focus:outline-none",
                phoneError
                  ? "border-red-600 focus:ring-2 focus:ring-red-600/20"
                  : "border-gray-200 focus:ring-2 focus:ring-[#0F4C81]/30",
              ].join(" ")}
            />
          </div>
          {phoneError && (
            <p
              id="phone-error"
              role="alert"
              aria-live="assertive"
              className="mt-1 text-xs"
              style={{ color: "#DC2626" }}
            >
              {phoneError}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full h-14 font-bold text-sm tracking-wider uppercase text-white rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F4C81]"
          style={{ backgroundColor: "#0F4C81" }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0d3d6b")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#0F4C81")}
        >
          {submitLabel}
        </button>
      </form>

      <div className="flex items-center justify-center gap-1.5 mt-4">
        <Lock size={11} className="text-gray-500" />
        <p className="text-xs text-gray-500 text-center">{privacyNote}</p>
      </div>
    </div>
  );
}
