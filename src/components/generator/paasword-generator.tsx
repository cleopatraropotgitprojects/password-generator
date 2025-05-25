"use client";

import { useEffect, useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { generatePassword } from "@/utils/password/generate-password";
import { evaluateStrength } from "@/utils/password/evaluate-strength";

const BLUR_FADE_DELAY = 0.04;

export default function PasswordGenerator() {
  const [length, setLength] = useState(13);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const [settings, setSettings] = useState({
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });

  const strength = evaluateStrength(password);
  const strengthText = {
    Weak: "Weak: Too easy to guess.",
    Moderate: "Moderate: Not bad, but not Fort Knox either.",
    Strong: "Strong: Now we're talking!",
  };
  const strengthColor = {
    Weak: "text-red-600",
    Moderate: "text-yellow-600",
    Strong: "text-green-600",
  };

  useEffect(() => {
    const pwd = generatePassword({ length, ...settings });
    setPassword(pwd);
  }, [length, settings]);

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const copyToClipboard = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 60000);
  };

  return (
    <BlurFade delay={BLUR_FADE_DELAY}>
      <section className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto rounded-2xl shadow-xl bg-white/40 backdrop-blur-md border border-white/30 px-4 sm:px-6 py-6 space-y-4 min-h-[470px]">
        <BlurFadeText
          delay={BLUR_FADE_DELAY}
          className="text-xl font-bold text-center"
          text="Password generator"
        />
        <BlurFadeText
          delay={BLUR_FADE_DELAY + 0.03}
          className="text-sm text-center text-muted-foreground"
          text="Generate strong unique passwords"
        />

        <div className="bg-yellow-100 rounded-md px-4 py-3 flex items-center gap-3 justify-between min-h-[56px]">
          <div className="flex-1 pr-2">
            <span
              className="font-mono text-lg break-all text-left block"
              style={{ wordBreak: "break-word" }}
            >
              {password}
            </span>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={copyToClipboard}
              className="bg-black text-white px-3 py-1 text-sm rounded-md"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={() => {
                setCopied(false);
                setPassword(generatePassword({ length, ...settings }));
              }}
              className="bg-gray-200 p-1 rounded-md"
            >
              ↻
            </button>
          </div>
        </div>

        <p className={`text-xs text-center italic ${strengthColor[strength]}`}>
          {strengthText[strength]}
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm block mb-1">
              Password length: <span className="font-medium">{length}</span>
            </label>
            <input
              type="range"
              min={4}
              max={20}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-[2px] accent-black"
            />
          </div>

          <Toggle
            label="Include Uppercase Letters"
            checked={settings.includeUppercase}
            onChange={() => toggle("includeUppercase")}
            delay={BLUR_FADE_DELAY + 0.05}
          />
          <Toggle
            label="Include Lowercase Letters"
            checked={settings.includeLowercase}
            onChange={() => toggle("includeLowercase")}
            delay={BLUR_FADE_DELAY + 0.1}
          />
          <Toggle
            label="Include Numbers"
            checked={settings.includeNumbers}
            onChange={() => toggle("includeNumbers")}
            delay={BLUR_FADE_DELAY + 0.15}
          />
          <Toggle
            label="Include Symbols"
            checked={settings.includeSymbols}
            onChange={() => toggle("includeSymbols")}
            delay={BLUR_FADE_DELAY + 0.2}
          />
        </div>
      </section>
    </BlurFade>
  );
}

function Toggle({
  label,
  checked,
  onChange,
  delay,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  delay: number;
}) {
  return (
    <BlurFade delay={delay}>
      <label className="flex items-center justify-between text-sm text-black">
        {label}
        <div
          onClick={onChange}
          className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-all ${
            checked ? "bg-black" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
              checked ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </div>
      </label>
    </BlurFade>
  );
}
