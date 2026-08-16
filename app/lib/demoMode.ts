import { cookies } from "next/headers";

export function isDemoModeActive(): boolean {
  try {
    const cookieStore = cookies();
    const demoMode = cookieStore.get("demoMode");
    return demoMode?.value === "true";
  } catch {
    return false;
  }
}