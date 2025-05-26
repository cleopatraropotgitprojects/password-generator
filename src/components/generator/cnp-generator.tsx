"use client";

import { useState } from "react";
import { format } from "date-fns";
import { RO_COUNTY } from "@/utils/cnp/county";
import { generateCNPFromInput } from "@/utils/cnp/generateCNP";
import BlurFade from "@/components/magicui/blur-fade";

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
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 justify-center items-start px-4 sm:px-6">
      <BlurFade delay={0.04}>
        <section
          className="w-[600px] md:w-[700px] lg:w-[540px] xl:w-[600px]
             rounded-2xl shadow-xl bg-white/40 backdrop-blur-md
             border border-violet-400/40 px-5 sm:px-6 py-6 sm:py-8 space-y-6"
        >
          <h1 className="text-4xl font-semibold text-gray-900 my-5 mb-14 text-center">
            CNP Generator
          </h1>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Sex:
              </label>
              <select
                value={sex}
                onChange={(e) =>
                  setSex(e.target.value as "Masculin" | "Feminin")
                }
                className="w-full bg-white/70 border border-violet-300 px-4 py-2 rounded-lg text-sm shadow-inner backdrop-blur-sm"
              >
                <option>Masculin</option>
                <option>Feminin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Data nașterii:
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white/70 border border-violet-300 px-4 py-2 rounded-lg text-sm shadow-inner backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Județul nașterii:
              </label>
              <select
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                className="w-full bg-white/70 border border-violet-300 px-4 py-2 rounded-lg text-sm shadow-inner backdrop-blur-sm"
              >
                {RO_COUNTY.map((j) => (
                  <option key={j.name}>{j.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Cod serial:
              </label>
              <input
                type="number"
                value={nnn}
                onChange={(e) => setNNN(e.target.value.padStart(3, "0"))}
                min="1"
                max="999"
                className="w-full bg-white/70 border border-violet-300 px-4 py-2 rounded-lg text-sm shadow-inner backdrop-blur-sm"
              />
            </div>
          </div>

          <button
            onClick={generate}
            className="w-full bg-gradient-to-r from-violet-700 to-indigo-600 text-white rounded-full py-3 text-sm font-medium shadow hover:scale-[1.03] transition"
          >
            Generează CNP
          </button>

          {cnp && (
            <div className="text-center text-violet-700 font-mono text-lg">
              {cnp}{" "}
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
    </div>
  );
}
