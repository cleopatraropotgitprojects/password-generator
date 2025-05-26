"use client";

import { useState } from "react";
import { generateIBAN } from "@/utils/iban/generateIBAN";
import BlurFade from "../magicui/blur-fade";

export default function IBANGenerator() {
  const [iban, setIban] = useState("");
  const [bank, setBank] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setCopied(false);
    const result = generateIBAN();
    setIban(result.iban);
    setBank(result.bank);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(iban);
    setCopied(true);
  };

  return (
    <BlurFade delay={0.04}>
      <section className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto rounded-2xl shadow-xl bg-white/40 backdrop-blur-md border border-violet-400/40 px-4 sm:px-6 py-6 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-900 tracking-tight">
          IBAN Generator
        </h2>

        <button
          onClick={generate}
          className="w-full bg-gradient-to-r from-violet-700 to-indigo-600 text-white rounded-full py-3 text-sm font-medium shadow hover:scale-[1.03] transition"
        >
          Generează IBAN
        </button>

        {iban && (
          <>
            <div className="text-center text-violet-700 font-mono text-lg break-all">
              {iban}{" "}
              <button
                onClick={copy}
                className="ml-2 text-sm underline text-black hover:text-violet-800 transition"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="text-center text-xs text-gray-600 italic">
              Banca: {bank}
            </p>
          </>
        )}
      </section>
    </BlurFade>
  );
}
