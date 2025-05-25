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
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div>
      <p></p>
      <h1 className="text-4xl font-semibold text-gray-900 my-5 mb-14 text-center">
        Generator CNP - Codul Numeric Personal
      </h1>

      <div className="flex flex-col lg:flex-row gap-10 justify-center items-start px-4 sm:px-6">
        {/* CARD */}
        <BlurFade delay={0.04}>
          <section
            className="w-[600px] md:w-[700px] lg:w-[540px] xl:w-[600px]
             rounded-2xl shadow-xl bg-white/40 backdrop-blur-md
             border border-violet-400/40 px-5 sm:px-6 py-6 sm:py-8 space-y-6"
          >
            <div className="space-y-5">
              {/* Sex */}
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

              {/* Data nașterii */}
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

              {/* Județ */}
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

              {/* Cod serial */}
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

            {/* Generează */}
            <button
              onClick={generate}
              className="w-full bg-gradient-to-r from-violet-700 to-indigo-600 text-white rounded-full py-3 text-sm font-medium shadow hover:scale-[1.03] transition"
            >
              Generează CNP
            </button>

            {/* Rezultat */}
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

        <BlurFade delay={0.08}>
          <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 text-sm leading-relaxed text-gray-800 space-y-4">
            <p>
              <strong>Codul Numeric Personal (CNP)</strong> este un
              identificator unic format din <strong>13 cifre</strong>, atribuit
              fiecărei persoane fizice din România. Acesta codifică informații
              esențiale despre <strong>sex</strong>,
              <strong> data nașterii</strong>, <strong>județul</strong> de
              proveniență și include o <strong>cifră de control</strong> pentru
              verificare.
            </p>

            <p>
              <strong>Cifra inițială</strong> determină sexul și secolul
              nașterii:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>1</strong> – bărbat născut între 1900–1999
              </li>
              <li>
                <strong>2</strong> – femeie născută între 1900–1999
              </li>
              <li>
                <strong>5</strong> – bărbat născut între 2000–2099
              </li>
              <li>
                <strong>6</strong> – femeie născută între 2000–2099
              </li>
              <li>
                <strong>7</strong> / <strong>8</strong> – persoane străine cu
                rezidență în România
              </li>
            </ul>

            <p>
              Următoarele <strong>6 cifre</strong> reprezintă data nașterii în
              format <em>YYMMDD</em>: an, lună și zi.
            </p>

            <p>
              Cifrele <strong>7 și 8</strong> codifică județul sau sectorul unde
              s-a înregistrat nașterea.
            </p>

            <p>
              Cifrele <strong>9–11</strong> sunt un cod secvențial care
              identifică ordinea înregistrării persoanelor în aceeași zi și
              județ.
            </p>

            <p>
              <strong>Cifra de control</strong> este ultima cifră a CNP-ului și
              se calculează printr-un algoritm special pentru a garanta
              validitatea numerelor precedente.
            </p>
          </section>
        </BlurFade>
      </div>
      <BlurFade delay={0.08}>
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 text-sm sm:text-[15px] leading-relaxed text-gray-800 space-y-6 pt-10">
          <h3 className="text-xl font-semibold text-gray-900">
            Unde se utilizează CNP-ul
          </h3>

          <p>
            Codul Numeric Personal este folosit ca{" "}
            <strong>identificator unic</strong> în majoritatea sistemelor
            administrative din România. Acesta permite autorităților să
            identifice fără echivoc o persoană, indiferent de nume, domiciliu
            sau alte informații variabile.
          </p>

          <ul className="list-disc pl-5 sm:pl-6 space-y-2">
            <li>
              <strong>Documente oficiale</strong> – apare pe cartea de
              identitate, pașaport și certificatul de naștere.
            </li>
            <li>
              <strong>Servicii medicale</strong> – identifică pacientul în
              dosarele de sănătate și rețete electronice.
            </li>
            <li>
              <strong>Relații de muncă</strong> – este cerut în contracte,
              dosarele de personal și evidențele ITM.
            </li>
            <li>
              <strong>Impozitare și taxe</strong> – identifică contribuabilii
              persoane fizice în sistemul ANAF.
            </li>
            <li>
              <strong>Educație</strong> – este folosit la înscriere, generarea
              diplomelor și gestionarea situației școlare.
            </li>
            <li>
              <strong>Formulare digitale</strong> – este frecvent solicitat în
              aplicații online sau proceduri administrative.
            </li>
          </ul>

          <p className="text-gray-600 text-xs sm:text-sm">
            CNP-ul este protejat de legislația în vigoare și poate fi prelucrat
            doar cu un temei legal clar și consimțământ explicit, conform
            Regulamentului General privind Protecția Datelor (GDPR).
          </p>
        </section>
      </BlurFade>
    </div>
  );
}
