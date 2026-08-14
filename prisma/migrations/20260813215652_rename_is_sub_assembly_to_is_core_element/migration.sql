/*
  Warnings:

  - You are about to drop the column `isSubAssembly` on the `finished_goods` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_finished_goods" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sku" TEXT,
    "batchCode" TEXT NOT NULL,
    "quantityOnHand" INTEGER NOT NULL DEFAULT 0,
    "retailPrice" REAL NOT NULL,
    "calculatedCogs" REAL NOT NULL DEFAULT 0.0,
    "vesselSizeOz" REAL,
    "fragranceLoadPercent" REAL,
    "laborCostPerUnit" REAL DEFAULT 0,
    "overheadFlat" REAL DEFAULT 0,
    "overheadPercent" REAL DEFAULT 0,
    "isCoreElement" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_finished_goods" ("batchCode", "calculatedCogs", "createdAt", "fragranceLoadPercent", "id", "laborCostPerUnit", "name", "overheadFlat", "overheadPercent", "quantityOnHand", "retailPrice", "sku", "updatedAt", "vesselSizeOz") SELECT "batchCode", "calculatedCogs", "createdAt", "fragranceLoadPercent", "id", "laborCostPerUnit", "name", "overheadFlat", "overheadPercent", "quantityOnHand", "retailPrice", "sku", "updatedAt", "vesselSizeOz" FROM "finished_goods";
DROP TABLE "finished_goods";
ALTER TABLE "new_finished_goods" RENAME TO "finished_goods";
CREATE UNIQUE INDEX "finished_goods_sku_key" ON "finished_goods"("sku");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
