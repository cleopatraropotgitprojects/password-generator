"use client";

import { useState } from "react";
import { validateCNP } from "@/utils/cnp/validateCNP";

export default function CNPValidator() {
  const [cnp, setCnp] = useState("");
  const [result, setResult] = useState<null | {
    valid: boolean;
    message: string;
  }>(null);

  const handleValidate = () => {
    const validation = validateCNP(cnp);
    setResult(validation);
  };

  return (
    <section className="w-full max-w-md rounded-2xl shadow-xl bg-white/40 backdrop-blur-md border border-white/30 p-6 space-y-6 mx-auto">
      <h2 className="text-xl font-bold text-center">CNP Validator</h2>

      <div className="space-y-4">
        <label className="block text-sm mb-1 font-medium">Introdu CNP:</label>
        <input
          type="text"
          value={cnp}
          onChange={(e) => setCnp(e.target.value.trim())}
          placeholder="Ex: 1970702412621"
          className="w-full border px-3 py-2 rounded-md font-mono"
          maxLength={13}
        />

        <button
          onClick={handleValidate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 font-medium transition"
        >
          Validează CNP
        </button>

        {result && (
          <div
            className={`text-center font-semibold ${
              result.valid ? "text-green-600" : "text-red-600"
            }`}
          >
            {result.message}
          </div>
        )}
      </div>
    </section>
  );
}
