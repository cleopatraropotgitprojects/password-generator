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
  };

  return (
    <BlurFade delay={BLUR_FADE_DELAY}>
      <section className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto rounded-2xl shadow-xl bg-white/40 backdrop-blur-md border border-violet-400/40 px-4 sm:px-6 py-6 space-y-6 min-h-[470px]">
        <BlurFadeText
          delay={BLUR_FADE_DELAY}
          className="text-2xl font-semibold text-center text-gray-900"
          text="Password generator"
        />
        <BlurFadeText
          delay={BLUR_FADE_DELAY + 0.03}
          className="text-sm text-center text-gray-600"
          text="Generate strong unique passwords"
        />

        <div className="bg-violet-50/80 rounded-xl px-4 py-4 flex items-center justify-between gap-4 min-h-[64px] border border-violet-200 shadow-inner">
          <div className="flex-1 font-mono text-lg break-words text-left pr-2 select-all">
            {password}
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={copyToClipboard}
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-violet-700 to-indigo-600 text-white shadow hover:scale-[1.03] transition"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={() => {
                setCopied(false);
                setPassword(generatePassword({ length, ...settings }));
              }}
              className="p-2 rounded-full bg-white/50 hover:bg-white/70 border border-violet-300 backdrop-blur-md transition"
            >
              ↻
            </button>
          </div>
        </div>

        <p className={`text-xs text-center italic ${strengthColor[strength]}`}>
          {strengthText[strength]}
        </p>

        <div className="space-y-2">
          <label className="text-sm block font-medium text-gray-700">
            Password length: <span className="font-semibold">{length}</span>
          </label>
          <input
            type="range"
            min={4}
            max={20}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 rounded-full accent-violet-700 bg-violet-200"
          />
        </div>

        <div className="space-y-4 pt-2">
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
      <label className="flex items-center justify-between text-sm font-medium text-gray-900">
        {label}
        <div
          onClick={onChange}
          className={`w-11 h-6 flex items-center rounded-full px-[3px] py-[2px] cursor-pointer transition-all shadow-inner border ${
            checked
              ? "bg-gradient-to-r from-violet-600 to-indigo-600 border-violet-700"
              : "bg-gray-200 hover:bg-gray-300/80 border-gray-300"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-out ${
              checked ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      </label>
    </BlurFade>
  );
}
