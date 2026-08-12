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
    "isSubAssembly" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_finished_goods" ("batchCode", "calculatedCogs", "createdAt", "fragranceLoadPercent", "id", "laborCostPerUnit", "name", "overheadFlat", "overheadPercent", "quantityOnHand", "retailPrice", "sku", "updatedAt", "vesselSizeOz") SELECT "batchCode", "calculatedCogs", "createdAt", "fragranceLoadPercent", "id", "laborCostPerUnit", "name", "overheadFlat", "overheadPercent", "quantityOnHand", "retailPrice", "sku", "updatedAt", "vesselSizeOz" FROM "finished_goods";
DROP TABLE "finished_goods";
ALTER TABLE "new_finished_goods" RENAME TO "finished_goods";
CREATE UNIQUE INDEX "finished_goods_sku_key" ON "finished_goods"("sku");
CREATE TABLE "new_recipe_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "finishedGoodId" TEXT NOT NULL,
    "rawMaterialId" TEXT,
    "subAssemblyId" TEXT,
    "requiredQuantity" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    CONSTRAINT "recipe_items_finishedGoodId_fkey" FOREIGN KEY ("finishedGoodId") REFERENCES "finished_goods" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "recipe_items_rawMaterialId_fkey" FOREIGN KEY ("rawMaterialId") REFERENCES "raw_materials" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "recipe_items_subAssemblyId_fkey" FOREIGN KEY ("subAssemblyId") REFERENCES "finished_goods" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_recipe_items" ("finishedGoodId", "id", "rawMaterialId", "requiredQuantity", "unit") SELECT "finishedGoodId", "id", "rawMaterialId", "requiredQuantity", "unit" FROM "recipe_items";
DROP TABLE "recipe_items";
ALTER TABLE "new_recipe_items" RENAME TO "recipe_items";
CREATE UNIQUE INDEX "recipe_items_finishedGoodId_rawMaterialId_key" ON "recipe_items"("finishedGoodId", "rawMaterialId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
