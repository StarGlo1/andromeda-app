-- CreateTable
CREATE TABLE "adjustments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "materialId" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "reason" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "adjustments_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "raw_materials" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
