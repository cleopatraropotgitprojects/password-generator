"use client";

import { useState } from "react";
import PasswordGenerator from "@/components/generator/paasword-generator";
import CNPGenerator from "@/components/generator/cnp-generator";
import CNPValidator from "@/components/generator/cnp-validator";
import CUIGenerator from "@/components/generator/cui-generator";
// import CUIValidator from "@/components/generator/cui-validator";
import IBANGenerator from "@/components/generator/iban-generator";
import PhoneGenerator from "@/components/generator/phone-generator";
import Header from "@/components/ui/header";

export default function UniversalGenerator() {
  const [activeType, setActiveType] = useState("password");

  return (
    <div className="w-full h-full">
      <Header activeType={activeType} onChange={setActiveType} />
      <div className="py-10">
        {activeType === "password" && <PasswordGenerator />}
        {activeType === "cnp" && <CNPGenerator />}
        {activeType === "cnp validator" && <CNPValidator />}
        {activeType === "cui" && <CUIGenerator />}
        {/*{activeType === "cui validator" && <CUIValidator />}*/}
        {activeType === "iban" && <IBANGenerator />}
        {activeType === "phone" && <PhoneGenerator />}
      </div>
    </div>
  );
}
