"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, X } from "lucide-react";
import {
  BrowserMultiFormatReader,
  IScannerControls,
} from "@zxing/browser";
import {
  DecodeHintType,
  BarcodeFormat,
} from "@zxing/library";

interface QRScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
}

export default function QRScanner({ onScan, onClose }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(false);
  const [manualInput, setManualInput] = useState("");

  useEffect(() => {
    return () => {
      if (controlsRef.current) {
        controlsRef.current.stop();
      }
    };
  }, []);

  const startCamera = async () => {
    setError("");
    try {
      const hints = new Map();
      hints.set(DecodeHintType.TRY_HARDER, true);
      hints.set(DecodeHintType.POSSIBLE_FORMATS, [
        BarcodeFormat.QR_CODE,
        BarcodeFormat.EAN_13,
        BarcodeFormat.EAN_8,
        BarcodeFormat.UPC_A,
        BarcodeFormat.UPC_E,
        BarcodeFormat.CODE_128,
        BarcodeFormat.CODE_39,
        BarcodeFormat.CODE_93,
        BarcodeFormat.CODABAR,
        BarcodeFormat.ITF,
        BarcodeFormat.DATA_MATRIX,
        BarcodeFormat.PDF_417,
      ]);

      const reader = new BrowserMultiFormatReader(hints);

      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((d) => d.kind === "videoinput");
      const selectedDeviceId =
        videoDevices.length > 0
          ? (videoDevices.find((d) => d.label.toLowerCase().includes("back")) ||
              videoDevices[videoDevices.length - 1]
            ).deviceId
          : undefined;

      const constraints: MediaStreamConstraints = {
        video: selectedDeviceId
          ? {
              deviceId: { exact: selectedDeviceId },
              width: { ideal: 1920 },
              height: { ideal: 1080 },
              focusMode: "continuous" as any,
            }
          : {
              facingMode: { ideal: "environment" },
              width: { ideal: 1920 },
              height: { ideal: 1080 },
              focusMode: "continuous" as any,
            },
      };

      const controls = await reader.decodeFromConstraints(
        constraints,
        videoRef.current!,
        (result, error) => {
          if (result) {
            controlsRef.current?.stop();
            onScan(result.getText());
          }
          if (error) {
            if (
              error instanceof Error &&
              error.message.includes("No MultiFormat Readers")
            ) {
              return;
            }
            if (error.name !== "NotFoundException") {
              console.error("Scanner error:", error);
            }
          }
        }
      );

      controlsRef.current = controls;
      setScanning(true);
    } catch (err: any) {
      console.error("Camera error details:", err);
      setError(
        `Camera error: ${err.message || err}. You can type the code manually instead.`
      );
    }
  };

  const stopCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.stop();
      controlsRef.current = null;
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
          <button
            onClick={onClose}
            className="p-1 bg-black hover:bg-gray-800 rounded-lg"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="relative bg-black rounded-lg aspect-video flex items-center justify-center">
            <video
              ref={videoRef}
              className="w-full h-full rounded-lg object-cover"
              autoPlay
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
                  <p className="text-sm text-white font-medium">
                    Tap to Start Camera
                  </p>
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
