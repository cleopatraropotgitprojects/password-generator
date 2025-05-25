"use client";

import { useState } from "react";
import { validateCUI } from "@/utils/cui/validateCUI";
import BlurFade from "../magicui/blur-fade";

export default function CUIValidator() {
  const [cui, setCui] = useState("");
  const [result, setResult] = useState<null | {
    valid: boolean;
    message: string;
  }>(null);

  const handleValidate = () => {
    const validation = validateCUI(cui.trim());
    setResult(validation);
  };

  return (
    <BlurFade delay={0.04}>
      <section className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto rounded-2xl shadow-xl bg-white/40 backdrop-blur-md border border-violet-400/40 px-4 sm:px-6 py-6 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-900 tracking-tight">
          CUI Validator
        </h2>

        <div className="space-y-4">
          {/* Input */}
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Introdu CUI:
          </label>
          <input
            type="text"
            value={cui}
            onChange={(e) => setCui(e.target.value)}
            placeholder="Ex: RO12345678"
            className="w-full bg-white/70 border border-violet-300 px-4 py-2 rounded-lg text-sm shadow-inner font-mono backdrop-blur-sm"
          />

          {/* Button */}
          <button
            onClick={handleValidate}
            className="w-full bg-gradient-to-r from-violet-700 to-indigo-600 text-white rounded-full py-3 text-sm font-medium shadow hover:scale-[1.03] transition"
          >
            Validează CUI
          </button>

          {/* Rezultat */}
          {result && (
            <div
              className={`text-center font-semibold text-sm ${
                result.valid ? "text-green-600" : "text-red-600"
              }`}
            >
              {result.message}
            </div>
          )}
        </div>
      </section>
    </BlurFade>
  );
}
