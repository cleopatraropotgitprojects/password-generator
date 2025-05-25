"use client";

import { useState } from "react";
import { generatePhoneNumber } from "@/utils/phoneNumber/generatePhoneNumber";
import BlurFade from "../magicui/blur-fade";

export default function PhoneGenerator() {
  const [phone, setPhone] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setPhone(generatePhoneNumber());
    setCopied(false);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <BlurFade delay={0.04}>
      <section className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto rounded-2xl shadow-xl bg-white/40 backdrop-blur-md border border-violet-400/40 px-4 sm:px-6 py-6 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-900 tracking-tight">
          Phone Number Generator
        </h2>

        {/* Generate button */}
        <button
          onClick={generate}
          className="w-full bg-gradient-to-r from-violet-700 to-indigo-600 text-white rounded-full py-3 text-sm font-medium shadow hover:scale-[1.03] transition"
        >
          Generează număr
        </button>

        {/* Result */}
        {phone && (
          <div className="text-center text-violet-700 font-mono text-lg break-all">
            {phone}{" "}
            <button
              onClick={copy}
              className="ml-2 text-sm underline text-black hover:text-violet-800 transition"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </section>
    </BlurFade>
  );
}
