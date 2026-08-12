"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { businessTemplates } from "./templates";
import { seedCategories } from "./actions";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );
  const router = useRouter();

  const businessTypes = Object.entries(businessTemplates).map(
    ([key, value]) => ({
      key,
      ...value,
    })
  );

  const selectedTemplate = selectedBusiness
    ? businessTemplates[selectedBusiness]
    : null;

  // When moving to step 3, pre-select all categories (except for "other")
  const goToStep3 = () => {
    if (selectedTemplate && selectedTemplate.categories.length > 0) {
      // Pre-select all preset categories
      setSelectedCategories(new Set(selectedTemplate.categories));
    } else {
      setSelectedCategories(new Set());
    }
    setStep(3);
  };

  const toggleCategory = (cat: string) => {
    const next = new Set(selectedCategories);
    if (next.has(cat)) {
      next.delete(cat);
    } else {
      next.add(cat);
    }
    setSelectedCategories(next);
  };

  const handleFinish = async () => {
    if (name.trim()) {
      localStorage.setItem("userName", name.trim());
    }

    // Only add the categories the user actually selected
    if (selectedCategories.size > 0) {
      await seedCategories(Array.from(selectedCategories));
    }

    router.push("/");
  };

  return (
    <main className="min-h-screen bg-bg text-text flex items-center justify-center p-8">
      <div className="max-w-lg w-full bg-surface-widget border border-default rounded-xl p-8 shadow-xl">
        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="space-y-6 text-center">
            <h1 className="text-3xl font-bold text-text-brand">
              Welcome to ANDROMEDA
            </h1>
            <p className="text-text-muted">
              Let’s set up your workspace. What should we call you?
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full px-4 py-3 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm"
            />
            <button
              onClick={() => setStep(2)}
              className="w-full bg-brand hover:bg-brand-hover text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Business type */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-text text-center">
              What do you make?
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {businessTypes.map((bt) => (
                <button
                  key={bt.key}
                  onClick={() => setSelectedBusiness(bt.key)}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                    selectedBusiness === bt.key
                      ? "border-brand bg-brand-muted dark:bg-brand-muted-dark"
                      : "border-default hover:border-text-muted"
                  }`}
                >
                  <span className="text-3xl">{bt.icon}</span>
                  <div>
                    <p className="font-semibold text-text">{bt.label}</p>
                    <p className="text-sm text-text-muted mt-1">
                      {bt.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-surface border border-default text-text font-medium px-4 py-2 rounded-lg hover:bg-brand-muted transition-colors"
              >
                Back
              </button>
              <button
                onClick={goToStep3}
                disabled={!selectedBusiness}
                className="flex-1 bg-brand hover:bg-brand-hover text-white font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Choose categories */}
        {step === 3 && selectedTemplate && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-text">Pick your categories</h2>
              <p className="text-text-muted">
                {name ? `${name}, ` : ""}
                we’ve prepared some suggestions for{" "}
                <strong className="text-text-brand">
                  {selectedTemplate.label}
                </strong>
                . Tap to select the ones you want.
              </p>
            </div>

            <div className="bg-surface border border-default rounded-lg p-4">
              {selectedTemplate.categories.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.categories.map((cat) => {
                    const isSelected = selectedCategories.has(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                          isSelected
                            ? "bg-slate-600 text-white border-slate-600"
                            : "bg-brand-muted dark:bg-brand-muted-dark text-text-brand dark:text-text-brand-dark border-default"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-text-muted text-sm">
                  No preset categories – you’ll start with a blank canvas and can add your own later.
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-surface border border-default text-text font-medium px-4 py-2 rounded-lg hover:bg-brand-muted transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 bg-brand hover:bg-brand-hover text-white font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}