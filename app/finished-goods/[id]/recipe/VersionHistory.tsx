"use client";

import { useState } from "react";
import { History, X } from "lucide-react";

interface VersionHistoryProps {
  versions: {
    id: string;
    versionNumber: number;
    recipeSnapshot: string;
    createdAt: string;
  }[];
}

export default function VersionHistory({ versions }: VersionHistoryProps) {
  const [showHistory, setShowHistory] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null);

  const selected = selectedVersion !== null
    ? versions.find(v => v.versionNumber === selectedVersion)
    : null;

  const parseSnapshot = (snapshot: string) => {
    try {
      return JSON.parse(snapshot);
    } catch {
      return [];
    }
  };

  return (
    <>
      <button
        onClick={() => setShowHistory(true)}
        className="text-sm font-medium text-black bg-slate-400 hover:bg-slate-500 rounded-full px-4 py-2 shadow-md flex items-center gap-1 transition-colors"
      >
        <History className="w-4 h-4" />
        Version History ({versions.length})
      </button>

      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-slate-700 text-white rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-600">
              <h3 className="text-lg font-semibold">Recipe Version History</h3>
              <button onClick={() => setShowHistory(false)} className="p-1 bg-black hover:bg-gray-800 rounded-lg">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {versions.length === 0 ? (
                <p className="text-sm text-gray-300 text-center py-8">No versions yet. Changes will be tracked automatically.</p>
              ) : (
                <div className="space-y-2">
                  {versions.map((version) => (
                    <button
                      key={version.id}
                      onClick={() => setSelectedVersion(selectedVersion === version.versionNumber ? null : version.versionNumber)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedVersion === version.versionNumber
                          ? "border-teal-400 bg-teal-900/30"
                          : "border-gray-600 hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          Version {version.versionNumber}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(version.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {parseSnapshot(version.recipeSnapshot).length} ingredients
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selected && (
              <div className="border-t border-gray-600 p-4 max-h-48 overflow-y-auto">
                <h4 className="text-sm font-semibold mb-2">Version {selected.versionNumber} Snapshot</h4>
                <div className="space-y-1">
                  {parseSnapshot(selected.recipeSnapshot).map((item: any, idx: number) => (
                    <div key={idx} className="text-sm text-gray-300 flex justify-between">
                      <span>{item.rawMaterial?.name ?? item.subAssembly?.name ?? "Unknown"}</span>
                      <span>{item.requiredQuantity} {item.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
