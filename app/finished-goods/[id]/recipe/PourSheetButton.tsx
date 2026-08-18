"use client";

import { useState } from "react";
import { Printer } from "lucide-react";
import PourSheet from "@/app/components/PourSheet";

interface PourSheetButtonProps {
  productName: string;
  batchCode: string;
  recipeItems: {
    id: string;
    name: string;
    requiredQuantity: number;
    unit: string;
    isSubAssembly?: boolean;
  }[];
  batchNotes?: string | null;
  calculatedCogs?: number;
}

export default function PourSheetButton({
  productName,
  batchCode,
  recipeItems,
  batchNotes,
  calculatedCogs = 0,
}: PourSheetButtonProps) {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowSheet(true)}
        className="ml-auto bg-[#4f8792] hover:bg-[#426f79] text-white text-sm font-medium px-4 py-2 rounded-full transition-colors shadow-md flex items-center gap-2"
      >
        <Printer className="w-4 h-4" />
        Pour Sheet
      </button>

      {showSheet && (
        <PourSheet
          productName={productName}
          batchCode={batchCode}
          recipeItems={recipeItems}
          batchNotes={batchNotes}
          calculatedCogs={calculatedCogs}
          onClose={() => setShowSheet(false)}
        />
      )}
    </>
  );
}
