"use client";

import { useState, useRef } from "react";

export function PhotoUploader({
  currentImagePath,
  materialId,
  uploadAction,
  removeAction,
}: {
  currentImagePath: string | null;
  materialId: string;
  uploadAction: (formData: FormData) => Promise<void>;
  removeAction: (formData: FormData) => Promise<void>;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(selected);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("id", materialId);
    formData.append("photo", file);
    await uploadAction(formData);
    setUploading(false);
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = async () => {
    if (!confirm("Remove this photo permanently?")) return;
    setRemoving(true);
    const formData = new FormData();
    formData.append("id", materialId);
    await removeAction(formData);
    setRemoving(false);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start">
      {/* Preview / current image */}
      <div className="w-48 h-48 flex-shrink-0">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg border border-default"
          />
        ) : currentImagePath ? (
          <img
            src={currentImagePath}
            alt="Current"
            className="w-full h-full object-cover rounded-lg border border-default"
          />
        ) : (
          <div className="w-full h-full bg-surface border border-default rounded-lg flex items-center justify-center text-text-muted text-sm">
            No photo
          </div>
        )}
      </div>

      {/* Upload controls */}
      <div className="flex-1 space-y-3">
        <label
          htmlFor={`photo-upload-${materialId}`}
          className="block w-full text-center px-4 py-3 bg-surface border-2 border-dashed border-default rounded-lg cursor-pointer hover:border-text-muted transition-colors"
        >
          <span className="text-text-muted text-sm">
            {file ? file.name : currentImagePath ? "Choose a different photo" : "Click to choose a photo"}
          </span>
          <input
            ref={fileInputRef}
            id={`photo-upload-${materialId}`}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <div className="flex gap-2">
          {file && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-brand hover:bg-brand-hover text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {uploading ? "Uploading…" : currentImagePath ? "Replace Photo" : "Upload Photo"}
            </button>
          )}

          {currentImagePath && (
            <button
              onClick={handleRemove}
              disabled={removing}
              className="bg-error hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {removing ? "Removing…" : "Remove Photo"}
            </button>
          )}
        </div>

        <p className="text-text-muted text-xs">
          {currentImagePath
            ? "You can replace or remove the photo at any time."
            : "Add a photo to quickly identify this material."}
        </p>
      </div>
    </div>
  );
}