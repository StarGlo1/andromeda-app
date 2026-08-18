"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, X } from "lucide-react";
import { BrowserMultiFormatReader } from "@zxing/browser";

interface QRScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
}

export default function QRScanner({ onScan, onClose }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(false);
  const [manualInput, setManualInput] = useState("");

  useEffect(() => {
    return () => {
      if (readerRef.current) {
        readerRef.current.stopDecodeFromVideoDevice();
      }
    };
  }, []);

  const startCamera = async () => {
    setError("");
    try {
      const reader = new BrowserMultiFormatReader();
      readerRef.current = reader;

      await reader.decodeFromVideoDevice(
        undefined,
        videoRef.current!,
        (result, error) => {
          if (result) {
            reader.stopDecodeFromVideoDevice();
            onScan(result.getText());
          }
          if (error && !(error instanceof Error && error.message.includes("No MultiFormat Readers"))) {
            // Ignore "no code found" errors - they're normal during scanning
          }
        }
      );
      setScanning(true);
    } catch (err: any) {
      setError("Camera access denied. You can type the code manually instead.");
    }
  };

  const stopCamera = () => {
    if (readerRef.current) {
      readerRef.current.stopDecodeFromVideoDevice();
      readerRef.current = null;
    }
    setScanning(false);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      onScan(manualInput.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-slate-700 text-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-600">
          <h3 className="font-semibold flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Scan QR / Barcode
          </h3>
          <button onClick={onClose} className="p-1 bg-black hover:bg-gray-800 rounded-lg">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="relative bg-black rounded-lg aspect-video flex items-center justify-center">
            <video
              ref={videoRef}
              className="w-full h-full rounded-lg object-cover"
              playsInline
              muted
            />
            {!scanning && (
              <button
                onClick={startCamera}
                className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/40 transition-colors"
              >
                <div className="text-center">
                  <Camera className="w-12 h-12 mx-auto mb-2 text-white" />
                  <p className="text-sm text-white font-medium">Tap to Start Camera</p>
                </div>
              </button>
            )}
            {scanning && (
              <button
                onClick={stopCamera}
                className="absolute top-2 right-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full"
              >
                Stop
              </button>
            )}
          </div>

          {error && (
            <p className="text-sm text-yellow-400 text-center">{error}</p>
          )}

          <form onSubmit={handleManualSubmit} className="flex gap-2">
            <input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="Or type code manually..."
              className="flex-1 px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-sm text-white placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-[#4f8792] hover:bg-[#426f79] text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
            >
              Lookup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
