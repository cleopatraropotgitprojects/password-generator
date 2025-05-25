export function evaluateStrength(
  password: string,
): "Weak" | "Moderate" | "Strong" {
  const length = password.length;

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const score = [hasUpper, hasLower, hasNumber, hasSymbol].filter(
    Boolean,
  ).length;

  if (length >= 12 && score === 4) return "Strong";
  if (length >= 8 && score >= 2) return "Moderate";
  return "Weak";
}
