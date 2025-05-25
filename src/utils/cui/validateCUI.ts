export function validateCUI(cui: string): { valid: boolean; message: string } {
  const original = cui;
  const trimmed = cui.trim().toUpperCase();

  const hasPrefix = trimmed.startsWith("RO");
  const numericPart = hasPrefix ? trimmed.slice(2) : trimmed;

  if (!/^\d+$/.test(numericPart)) {
    return {
      valid: false,
      message: "CUI-ul trebuie să conțină doar cifre (după RO, dacă e cazul).",
    };
  }

  if (numericPart.length < 6 || numericPart.length > 10) {
    return {
      valid: false,
      message: "CUI-ul trebuie să aibă între 6 și 10 cifre.",
    };
  }

  return {
    valid: true,
    message: `CUI valid ✅${hasPrefix ? " (cu prefix RO)" : ""}`,
  };
}
