import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

console.log("🔍 DATABASE_URL from env:", process.env.DATABASE_URL);
console.log("🔍 Current working directory:", process.cwd());

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Demo mode middleware - blocks all write operations using in-memory flag
prisma.$use(async (params, next) => {
  const writeOps = ["create", "createMany", "update", "updateMany", "delete", "deleteMany", "upsert"];
  
  if (writeOps.includes(params.action) && globalThis.isDemoMode === true) {
    console.log(`🛑 Demo mode blocked: ${params.model}.${params.action}`);
    
    if (params.action === "create" || params.action === "upsert") {
      return {};
    }
    if (params.action === "createMany") {
      return { count: 0 };
    }
    if (params.action === "update" || params.action === "updateMany") {
      return {};
    }
    if (params.action === "delete") {
      return {};
    }
    if (params.action === "deleteMany") {
      return { count: 0 };
    }
  }
  
  return next(params);
});