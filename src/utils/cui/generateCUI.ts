export function generateCUI(length: number, includeRO: boolean): string {
  if (length < 6) length = 6;
  if (length > 10) length = 10;

  let number = "";
  for (let i = 0; i < length; i++) {
    const digit = Math.floor(Math.random() * 10);
    if (i === 0 && digit === 0) {
      number += Math.floor(Math.random() * 9 + 1);
    } else {
      number += digit;
    }
  }

  return includeRO ? `RO${number}` : number;
}
