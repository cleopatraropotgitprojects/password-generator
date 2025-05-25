import { RO_COUNTY } from "@/utils/cnp/county";

export function validateCNP(cnp: string): { valid: boolean; message: string } {
  if (!/^\d{13}$/.test(cnp)) {
    return {
      valid: false,
      message: "CNP-ul trebuie să conțină exact 13 cifre.",
    };
  }

  const s = parseInt(cnp[0]);
  const aa = parseInt(cnp.slice(1, 3));
  const ll = parseInt(cnp.slice(3, 5));
  const zz = parseInt(cnp.slice(5, 7));
  const jj = cnp.slice(7, 9);
  const nnn = cnp.slice(9, 12);
  const control = parseInt(cnp[12]);

  const yearPrefix =
    s === 1 || s === 2
      ? 1900
      : s === 3 || s === 4
        ? 1800
        : s === 5 || s === 6
          ? 2000
          : null;

  if (yearPrefix === null) {
    return { valid: false, message: "Cifra S (sex + secol) este invalidă." };
  }

  const fullYear = yearPrefix + aa;
  const dateStr = `${fullYear}-${ll.toString().padStart(2, "0")}-${zz.toString().padStart(2, "0")}`;
  const date = new Date(dateStr);

  if (
    isNaN(date.getTime()) ||
    date.getFullYear() !== fullYear ||
    date.getMonth() + 1 !== ll ||
    date.getDate() !== zz
  ) {
    return { valid: false, message: "Data nașterii este invalidă." };
  }

  const validJJ = RO_COUNTY.map((j) => j.code);
  if (!validJJ.includes(jj)) {
    return { valid: false, message: "Codul județului (JJ) este invalid." };
  }

  const key = "279146358279";
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnp[i]) * parseInt(key[i]);
  }
  const expectedControl = sum % 11 === 10 ? 1 : sum % 11;

  if (expectedControl !== control) {
    return { valid: false, message: "Cifra de control este greșită." };
  }

  return { valid: true, message: "CNP valid ✅" };
}
