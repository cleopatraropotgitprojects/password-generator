type GenerateOptions = {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
};

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

export function generatePassword(options: GenerateOptions): string {
  let characters = "";
  let guaranteed = "";

  if (options.includeUppercase) {
    characters += UPPERCASE;
    guaranteed += randomChar(UPPERCASE);
  }
  if (options.includeLowercase) {
    characters += LOWERCASE;
    guaranteed += randomChar(LOWERCASE);
  }
  if (options.includeNumbers) {
    characters += NUMBERS;
    guaranteed += randomChar(NUMBERS);
  }
  if (options.includeSymbols) {
    characters += SYMBOLS;
    guaranteed += randomChar(SYMBOLS);
  }

  if (!characters) return "";

  let remaining = "";
  for (let i = 0; i < options.length - guaranteed.length; i++) {
    remaining += randomChar(characters);
  }

  const full = (guaranteed + remaining).split("");
  return shuffle(full).join("");
}

function randomChar(str: string) {
  return str[Math.floor(Math.random() * str.length)];
}

function shuffle(arr: string[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
