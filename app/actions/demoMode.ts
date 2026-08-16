"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const DB_PATH = "/Users/garryperez/andromeda-app/prisma/prisma/dev.db";
const BACKUP_PATH = "/Users/garryperez/andromeda-app/prisma/prisma/dev.db.real-backup";
const TEMPLATE_PATH = "/Users/garryperez/andromeda-app/prisma/prisma/demo.db.template";

export async function enterDemoModeAction() {
  const cookieStore = await cookies();
  cookieStore.set("demoMode", "true", {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  
  console.log("🔄 Backing up real database...");
  await execAsync(`cp "${DB_PATH}" "${BACKUP_PATH}"`);
  console.log("📋 Copying demo template...");
  await execAsync(`cp "${TEMPLATE_PATH}" "${DB_PATH}"`);
  console.log("✅ Demo mode entered successfully");
  
  revalidatePath("/", "layout");
}

export async function exitDemoModeAction() {
  const cookieStore = await cookies();
  cookieStore.set("demoMode", "", {
    path: "/",
    maxAge: 0,
  });
  
  console.log("🔄 Restoring real database...");
  await execAsync(`cp "${BACKUP_PATH}" "${DB_PATH}"`);
  console.log("✅ Demo mode exited successfully");
  
  revalidatePath("/", "layout");
}
