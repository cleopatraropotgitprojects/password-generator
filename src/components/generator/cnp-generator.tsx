"use client";

import { useState } from "react";
import { format } from "date-fns";
import { RO_COUNTY } from "@/utils/cnp/county";
import { generateCNPFromInput } from "@/utils/cnp/generateCNP";

export default function CNPGenerator() {
  const [sex, setSex] = useState<"Masculin" | "Feminin">("Masculin");
  const [date, setDate] = useState(() => format(new Date(), "yyyy-MM-dd"));
  const [county, setCounty] = useState("București");
  const [nnn, setNNN] = useState("001");
  const [cnp, setCnp] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setCopied(false);
    const formattedNNN = nnn.padStart(3, "0");
    const newCNP = generateCNPFromInput({
      sex,
      date,
      county,
      nnn: formattedNNN,
    });
    setCnp(newCNP);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(cnp);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="w-full max-w-md rounded-2xl shadow-xl bg-white/40 backdrop-blur-md border border-white/30 p-6 space-y-6 mx-auto">
      <h2 className="text-xl font-bold text-center">CNP Generator</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1 font-medium">Sex:</label>
          <select
            value={sex}
            onChange={(e) => setSex(e.target.value as "Masculin" | "Feminin")}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option>Masculin</option>
            <option>Feminin</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1 font-medium">
            Data nașterii:
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm mb-1 font-medium">
            Județul nașterii:
          </label>
          <select
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
          >
            {RO_COUNTY.map((j) => (
              <option key={j.name}>{j.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1 font-medium">Cod serial:</label>
          <input
            type="number"
            value={nnn}
            onChange={(e) => setNNN(e.target.value.padStart(3, "0"))}
            className="w-full border px-3 py-2 rounded-md"
            min="1"
            max="999"
          />
        </div>
      </div>
      <button
        onClick={generate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 font-medium transition"
      >
        Generează CNP
      </button>
      {cnp && (
        <div className="text-center text-blue-700 font-mono text-lg">
          {cnp}{" "}
          <button onClick={copy} className="ml-2 text-sm underline text-black">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </section>
  );
}
