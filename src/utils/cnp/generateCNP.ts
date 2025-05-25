import { RO_COUNTY } from "@/utils/cnp/county";

type CNPInput = {
  sex: "Masculin" | "Feminin";
  date: string;
  county: string;
  nnn: string;
};

export function generateCNPFromInput({
  sex,
  date,
  county,
  nnn,
}: CNPInput): string {
  const [yearFull, month, day] = date.split("-");
  const year = yearFull.slice(-2);

  const jj = RO_COUNTY.find((j) => j.name === county)?.code ?? "00";

  const s = getS(sex, parseInt(yearFull));
  const ll = month.padStart(2, "0");
  const zz = day.padStart(2, "0");

  const partial = `${s}${year}${ll}${zz}${jj}${nnn}`;
  const c = calculateC(partial);

  return `${partial}${c}`;
}

function getS(sex: string, year: number): string {
  const isMale = sex === "Masculin";
  if (year >= 1900 && year < 2000) return isMale ? "1" : "2";
  if (year >= 1800 && year < 1900) return isMale ? "3" : "4";
  if (year >= 2000 && year < 2100) return isMale ? "5" : "6";
  return "9";
}

function calculateC(cnp12: string): number {
  const key = "279146358279";
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnp12[i]) * parseInt(key[i]);
  }
  const rest = sum % 11;
  return rest === 10 ? 1 : rest;
}
