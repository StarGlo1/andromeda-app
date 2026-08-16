// app/actions/getLogo.ts

import { prisma } from "@/lib/prisma";

export async function getLogo(): Promise<string | null> {
  try {
    const setting = await prisma.setting.findUnique({
      where: { key: "andromedaLogo" },
    });
    
    return setting?.value || null;
  } catch {
    return null;
  }
}