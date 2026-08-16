import { PrismaClient } from "@prisma/client";

const globalForPrismaDemo = globalThis as unknown as {
  prismaDemo: PrismaClient | undefined;
};

export const prismaDemo =
  globalForPrismaDemo.prismaDemo ??
  new PrismaClient({
    datasources: {
      db: {
        url: "file:./prisma/demo.db",
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrismaDemo.prismaDemo = prismaDemo;
}
