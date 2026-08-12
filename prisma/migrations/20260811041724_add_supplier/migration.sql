-- CreateTable
CREATE TABLE "suppliers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "contact" TEXT,
    "website" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_raw_materials" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "supplierId" TEXT,
    "totalQuantity" REAL,
    "unit" TEXT,
    "costPerUnit" REAL,
    "reorderThreshold" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "raw_materials_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "raw_materials_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_raw_materials" ("categoryId", "costPerUnit", "createdAt", "id", "name", "reorderThreshold", "totalQuantity", "unit", "updatedAt") SELECT "categoryId", "costPerUnit", "createdAt", "id", "name", "reorderThreshold", "totalQuantity", "unit", "updatedAt" FROM "raw_materials";
DROP TABLE "raw_materials";
ALTER TABLE "new_raw_materials" RENAME TO "raw_materials";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
