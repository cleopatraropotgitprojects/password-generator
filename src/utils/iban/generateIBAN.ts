const BANKS = [
  { code: "BTRL", name: "Banca Transilvania" },
  { code: "RZBR", name: "Raiffeisen Bank" },
  { code: "BRDE", name: "BRD" },
  { code: "INGB", name: "ING Bank" },
  { code: "BCRL", name: "BCR" },
  { code: "CECE", name: "CEC Bank" },
  { code: "UNCR", name: "UniCredit Bank" },
  { code: "PIRB", name: "First Bank" },
];

export function generateIBAN(): { iban: string; bank: string } {
  const countryCode = "RO";
  const checkDigits = randomDigits(2);
  const selected = randomFromArray(BANKS);
  const accountNumber = randomDigits(16);

  return {
    iban: `${countryCode}${checkDigits}${selected.code}${accountNumber}`,
    bank: selected.name,
  };
}

function randomDigits(count: number): string {
  let result = "";
  for (let i = 0; i < count; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
}

function randomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
