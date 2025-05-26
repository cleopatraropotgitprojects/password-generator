const OPTIONS = [
  { label: "Generate Password", key: "password" },
  { label: "Generate CNP", key: "cnp" },
  { label: "Validate CNP", key: "cnp validator" },
  { label: "Generate CUI", key: "cui" },
  // { label: "Validate CUI", key: "cui validator" },
  { label: "Generate Iban", key: "iban" },
  { label: "Generate Phone", key: "phone" },
];

export default function Header({
  activeType,
  onChange,
}: {
  activeType: string;
  onChange: (key: string) => void;
}) {
  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-xl bg-white/30 border-b border-white/20 shadow-[0_3px_24px_rgba(0,0,0,0.06)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 grid place-content-center shadow-md">
            🚀
          </div>
          <h1 className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
            Multi Generator
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center sm:justify-end gap-6">
          {OPTIONS.map((opt) => (
            <span
              key={opt.key}
              onClick={() => onChange(opt.key)}
              className={`relative text-sm font-medium uppercase tracking-widest cursor-pointer transition-all
            ${
              activeType === opt.key
                ? "text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600"
                : "text-gray-700 hover:text-black"
            } group`}
            >
              {opt.label}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full transform transition-transform duration-300 origin-left ${
                  activeType === opt.key
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}
