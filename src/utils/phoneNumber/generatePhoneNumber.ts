export function generatePhoneNumber(): string {
  const prefix = "07";
  const middleDigit = Math.floor(Math.random() * 10); // 0–9
  const rest = generateDigits(7);

  return `${prefix}${middleDigit}${rest}`;
}

function generateDigits(count: number): string {
  let result = "";
  for (let i = 0; i < count; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
}
