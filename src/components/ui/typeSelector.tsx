const TYPES = ["password", "cnp", "cui", "iban", "name", "phone"];

export default function TypeSelector({
  activeType,
  onChange,
}: {
  activeType: string;
  onChange: (type: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-6">
      {TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`capitalize px-4 py-2 rounded-md text-sm transition ${
            activeType === type
              ? "bg-black text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
