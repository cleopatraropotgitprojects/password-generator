"use client";

import { useState } from "react";
import { generateCUI } from "@/utils/cui/generateCUI";

export default function CUIGenerator() {
  const [includeRO, setIncludeRO] = useState(true);
  const [length, setLength] = useState(8);
  const [cui, setCui] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const newCUI = generateCUI(length, includeRO);
    setCui(newCUI);
    setCopied(false);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(cui);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="w-full max-w-md rounded-2xl shadow-xl bg-white/40 backdrop-blur-md border border-white/30 p-6 space-y-6 mx-auto">
      <h2 className="text-xl font-bold text-center">CUI Generator</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Include prefix RO:</label>
          <input
            type="checkbox"
            checked={includeRO}
            onChange={() => setIncludeRO(!includeRO)}
            className="w-5 h-5"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">
            Număr de cifre (6–10):
          </label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            min={6}
            max={10}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <button
          onClick={generate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 font-medium transition"
        >
          Generează CUI
        </button>

        {cui && (
          <div className="text-center text-blue-700 font-mono text-lg">
            {cui}{" "}
            <button
              onClick={copy}
              className="ml-2 text-sm underline text-black"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
