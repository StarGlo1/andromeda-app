"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function enterDemoModeAction() {
  const cookieStore = cookies();
  cookieStore.set("demoMode", "true", {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  revalidatePath("/", "layout");
}

export async function exitDemoModeAction() {
  const cookieStore = cookies();
  cookieStore.set("demoMode", "", {
    path: "/",
    maxAge: 0,
  });
  revalidatePath("/", "layout");
}