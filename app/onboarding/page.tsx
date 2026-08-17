"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { businessTemplates } from "./templates";
import { seedCategories } from "./actions";

const TOTAL_STEPS = 4;

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [isSkipping, setIsSkipping] = useState(false);
  const router = useRouter();

  const businessTypes = Object.entries(businessTemplates).map(([key, value]) => ({
    key,
    ...value,
  }));

  const selectedTemplate = selectedBusiness ? businessTemplates[selectedBusiness] : null;

  const handleSkip = () => {
    setIsSkipping(true);
    router.push("/");
  };

  const goToStep3 = () => {
    if (selectedTemplate && selectedTemplate.categories.length > 0) {
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
    setIsSkipping(true);
    if (name.trim()) {
      localStorage.setItem("userName", name.trim());
    }
    if (selectedBusiness) {
      localStorage.setItem("businessType", selectedBusiness);
    }
    if (selectedCategories.size > 0) {
      await seedCategories(Array.from(selectedCategories));
    }
    setIsSkipping(false);
    setStep(4);
  };

  return (
    <main className="min-h-screen bg-transparent text-text flex items-start justify-center pt-24 sm:pt-28 px-2 sm:px-4">
      <div className="max-w-4xl w-full min-h-[480px] sm:min-h-[550px] flex flex-col justify-center bg-[#c9bfb2]/60 dark:bg-gray-900/60 border border-default/20 rounded-xl p-8 sm:p-10 shadow-lg relative z-10">
        {/* Skip button - top right */}
        <button
          onClick={handleSkip}
          disabled={isSkipping}
          className="absolute top-4 right-4 z-20 text-text-muted hover:text-text text-sm font-medium transition-colors"
        >
          Skip
        </button>

        {/* Progress indicator - animated pill bubble */}
        <div className="mb-8 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-white/30 dark:bg-gray-800/30 border border-default/30 rounded-full px-5 py-2 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-[#4f8792] transition-all duration-500 ease-in-out"
              style={{
                width: `${(step / TOTAL_STEPS) * 100}%`,
              }}
            />
            <span className={`relative z-10 text-xs font-medium ${step >= 2 ? "text-white" : "text-text"}`}>
              Step {step} of {TOTAL_STEPS}
            </span>
          </div>
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="flex flex-col flex-1 text-center">
            <div className="h-6 sm:h-10"></div>
            <h1 className="text-text-brand">
              <span className="block text-4xl sm:text-5xl font-bold tracking-[0.15em] sm:tracking-[0.25em] text-gray-900 dark:text-gray-100 leading-none">
                ANDROMEDA
              </span>
              <span className="block text-lg sm:text-xl font-medium tracking-[0.2em] sm:tracking-[0.3em] text-gray-600 dark:text-gray-300 mt-1.5 sm:mt-2 uppercase">
                Studios
              </span>
            </h1>
            <div className="h-20 sm:h-28"></div>
            <p className="text-text-muted">
              Let&apos;s set up your workspace. What should we call you?
            </p>
            <div className="flex-1"></div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full px-4 py-3 bg-bg border border-default rounded-lg text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand text-sm mb-4 text-center placeholder:text-center"
              autoFocus
            />
            <button
              onClick={() => setStep(2)}
              className="mx-auto w-1/2 bg-[#4f8792] hover:bg-[#426f79] text-white font-medium px-4 py-2 rounded-full transition-colors shadow-md"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Business type */}
        {step === 2 && (
          <div className="flex flex-col flex-1 space-y-4 min-h-[550px] sm:min-h-[600px]">
            <h2 className="text-2xl font-bold text-text text-center">
              What do you make?
            </h2>
            <div className="flex-1 grid grid-cols-1 gap-3 overflow-y-auto pr-1 content-start">
              {businessTypes.map((bt) => (
                <button
                  key={bt.key}
                  onClick={() => setSelectedBusiness(bt.key)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center ${
                    selectedBusiness === bt.key
                      ? "border-brand bg-brand-muted dark:bg-brand-muted-dark"
                      : "border-default hover:border-brand hover:bg-brand-muted/50 dark:hover:bg-brand-muted-dark/50 hover:shadow-lg hover:scale-[1.02]"
                  }`}
                >
                  <span className="text-3xl shrink-0">{bt.icon}</span>
                  <div>
                    <p className="font-semibold text-text">{bt.label}</p>
                    <p className="text-sm text-text-muted mt-1">
                      {bt.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-auto pt-4">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 mx-auto bg-surface border border-default text-text font-medium px-4 py-2 rounded-full hover:bg-brand-muted transition-colors"
              >
                Back
              </button>
              <button
                onClick={goToStep3}
                disabled={!selectedBusiness}
                className="w-1/3 mx-auto bg-[#4f8792] hover:bg-[#426f79] text-white font-medium px-4 py-2 rounded-full transition-colors shadow-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Choose categories */}
        {step === 3 && selectedTemplate && (
          <div className="flex flex-col flex-1 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-text">Pick your categories</h2>
              <p className="text-text-muted">
                {name ? `${name}, ` : ""}
                we&apos;ve prepared some suggestions for{" "}
                <strong className="text-text-brand">
                  {selectedTemplate.label}
                </strong>
                . Tap to toggle the ones you want.
              </p>
            </div>

            <div className="flex justify-center mb-2">
              <button
                onClick={() => {
                  if (selectedCategories.size === selectedTemplate.categories.length) {
                    setSelectedCategories(new Set());
                  } else {
                    setSelectedCategories(new Set(selectedTemplate.categories));
                  }
                }}
                className="text-xs font-medium text-text-brand hover:text-text-brand-dark underline underline-offset-2 transition-colors"
              >
                {selectedCategories.size === selectedTemplate.categories.length
                  ? "Deselect All"
                  : "Select All"}
              </button>
            </div>

            <div className="bg-surface border border-default rounded-lg p-4 max-h-56 overflow-y-auto">
              {selectedTemplate.categories.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.categories.map((cat) => {
                    const isSelected = selectedCategories.has(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                          isSelected
                            ? "bg-brand text-white border-brand"
                            : "bg-brand-muted dark:bg-brand-muted-dark text-text-brand dark:text-text-brand-dark border-default hover:border-brand"
                        }`}
                      >
                        {isSelected ? "✓ " : ""}{cat}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-text-muted text-sm">
                  No preset categories – you&apos;ll start with a blank canvas and can add your own later.
                </p>
              )}
            </div>

            <p className="text-xs text-text-muted text-center">
              {selectedCategories.size} category{selectedCategories.size !== 1 ? "ies" : "y"} selected
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 mx-auto bg-surface border border-default text-text font-medium px-4 py-2 rounded-full hover:bg-brand-muted transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                disabled={isSkipping}
                className="w-1/3 mx-auto bg-[#4f8792] hover:bg-[#426f79] text-white font-medium px-4 py-2 rounded-full transition-colors shadow-md disabled:opacity-50"
              >
                {isSkipping ? "Setting up..." : "Get Started"}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="flex flex-col flex-1 items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-brand flex items-center justify-center">
              <span className="text-4xl text-white">✓</span>
            </div>
            <h2 className="text-3xl font-bold text-text">
              You&apos;re all set{name ? `, ${name}` : ""}!
            </h2>
            <p className="text-text-muted max-w-md">
              Your workspace has been created with{" "}
              <strong className="text-text-brand">{selectedCategories.size}</strong>{" "}
              categor{selectedCategories.size !== 1 ? "ies" : "y"} ready to go.
            </p>
            <p className="text-text-muted text-sm">
              Start adding materials, products, and making something amazing.
            </p>
            <button
              onClick={() => router.push("/")}
              className="mx-auto w-1/2 bg-[#4f8792] hover:bg-[#426f79] text-white font-medium px-4 py-2 rounded-full transition-colors shadow-md"
            >
              Enter Command Deck
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
