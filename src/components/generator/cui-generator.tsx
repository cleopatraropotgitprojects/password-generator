"use client";

import { useState } from "react";
import { generateCUI } from "@/utils/cui/generateCUI";
import BlurFade from "../magicui/blur-fade";

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
    <BlurFade delay={0.04}>
      <section className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto rounded-2xl shadow-xl bg-white/40 backdrop-blur-md border border-violet-400/40 px-4 sm:px-6 py-6 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-900 tracking-tight">
          CUI Generator
        </h2>

        <div className="space-y-4">
          {/* Switch pentru prefix RO */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-800">
              Include prefix RO:
            </label>
            <div
              onClick={() => setIncludeRO(!includeRO)}
              className={`w-11 h-6 flex items-center rounded-full px-[3px] py-[2px] cursor-pointer transition-all border
            ${
              includeRO
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 border-violet-700"
                : "bg-gray-200 hover:bg-gray-300/80 border-gray-300"
            }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-out ${
                  includeRO ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </div>

          {/* Număr de cifre */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Număr de cifre (6–10):
            </label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              min={6}
              max={10}
              className="w-full bg-white/70 border border-violet-300 px-4 py-2 rounded-lg text-sm shadow-inner backdrop-blur-sm"
            />
          </div>

          {/* Generează */}
          <button
            onClick={generate}
            className="w-full bg-gradient-to-r from-violet-700 to-indigo-600 text-white rounded-full py-3 text-sm font-medium shadow hover:scale-[1.03] transition"
          >
            Generează CUI
          </button>

          {/* Rezultat */}
          {cui && (
            <div className="text-center text-violet-700 font-mono text-lg">
              {cui}{" "}
              <button
                onClick={copy}
                className="ml-2 text-sm underline text-black hover:text-violet-800 transition"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          )}
        </div>
      </section>
    </BlurFade>
  );
}
