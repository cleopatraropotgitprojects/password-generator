"use client";

import { useState } from "react";
import PasswordGenerator from "@/components/generator/paasword-generator";
import TypeSelector from "@/components/ui/typeSelector";
import CNPGenerator from "@/components/generator/cnp-generator";

export default function UniversalGenerator() {
  const [activeType, setActiveType] = useState("password");

  return (
    <div className="w-full max-w-xl">
      <TypeSelector activeType={activeType} onChange={setActiveType} />
      {activeType === "password" && <PasswordGenerator />}
      {activeType === "cnp" && <CNPGenerator />}
    </div>
  );
}
