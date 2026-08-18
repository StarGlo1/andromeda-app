"use client";

import { useState } from "react";
import { Camera, Package, Search, X } from "lucide-react";
import QRScanner from "./QRScanner";
import { useToast } from "@/app/context/ToastContext";

export default function ScanButton() {
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const { showToast } = useToast();

  const handleScan = async (code: string) => {
    console.log("Scanning code:", code);
    setShowScanner(false);
    
    try {
      const res = await fetch(`/api/barcode-lookup?code=${encodeURIComponent(code)}`);
      const data = await res.json();
      console.log("Lookup result:", data);

      if (data.found) {
        setScanResult(data);
        showToast(`${data.type === "material" ? "Material" : "Product"} found: ${data.item.name}`, "success");
      } else {
        setScanResult(null);
        showToast(data.message || "Item not found", "warning");
      }
    } catch (error) {
      showToast("Failed to lookup barcode.", "error");
    }
  };

  return (
    <>
      <button
        onClick={() => setShowScanner(true)}
        className="bg-[#4f8792] hover:bg-[#426f79] text-white text-sm font-medium px-4 py-2 rounded-full transition-colors shadow-md flex items-center gap-2"
      >
        <Camera className="w-4 h-4" />
        Scan
      </button>

      {showScanner && (
        <QRScanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )}

      {/* Scan result display */}
      {scanResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold">Scan Result</h3>
              <button onClick={() => setScanResult(null)} className="p-1 bg-black hover:bg-gray-800 rounded-lg">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3">
                {scanResult.type === "material" ? (
                  <Package className="w-8 h-8 text-teal-600" />
                ) : (
                  <Search className="w-8 h-8 text-teal-600" />
                )}
                <div>
                  <p className="font-medium text-lg">{scanResult.item.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {scanResult.type === "material"
                      ? `${scanResult.item.totalQuantity} ${scanResult.item.unit || ""} in stock`
                      : `${scanResult.item.quantityOnHand} in stock | $${scanResult.item.retailPrice.toFixed(2)}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
