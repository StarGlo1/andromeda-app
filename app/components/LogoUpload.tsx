// app/components/LogoUpload.tsx

"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useLogo } from "@/app/context/LogoContext";
import { Upload, X, Check, Loader2 } from "lucide-react";

export function LogoUpload() {
  const { logoUrl, setLogoUrl, resetLogo } = useLogo();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file client-side
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a PNG, JPG, SVG, or WebP file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("File too large. Maximum size is 2MB.");
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-logo", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Upload failed");
      }

      const data = await response.json();
      setLogoUrl(data.imagePath);
      setSuccess(true);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload logo");
      console.error("Logo upload error:", err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveLogo = () => {
    resetLogo();
    setSuccess(false);
    setError(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-6">
        {/* Current Logo Display */}
        <div className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-800">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt="Current Logo"
              width={96}
              height={96}
              className="object-contain"
            />
          ) : (
            <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          )}
        </div>

        <div className="space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="logo-upload"
          />
          
          <div className="flex gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  {logoUrl ? "Change Logo" : "Upload Logo"}
                </>
              )}
            </button>

            {logoUrl && (
              <button
                onClick={handleRemoveLogo}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-sm font-medium"
              >
                <X className="w-4 h-4" />
                Remove
              </button>
            )}
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Recommended: 512x512px PNG with transparent background. Max size: 2MB.
          </p>
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
          <X className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
          <Check className="w-4 h-4 shrink-0" />
          Logo uploaded successfully!
        </div>
      )}
    </div>
  );
}