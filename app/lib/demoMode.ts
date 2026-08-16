export function isDemoModeActive(): boolean {
  // Check in-memory flag first (faster and more reliable)
  if (globalThis.isDemoMode === true) {
    return true;
  }
  return false;
}