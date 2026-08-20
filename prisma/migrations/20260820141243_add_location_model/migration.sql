-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

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
    "batchNotes" TEXT,
    "locationId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "finished_goods_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_finished_goods" ("batchCode", "batchNotes", "calculatedCogs", "createdAt", "fragranceLoadPercent", "id", "isCoreElement", "laborCostPerUnit", "name", "overheadFlat", "overheadPercent", "quantityOnHand", "retailPrice", "sku", "updatedAt", "vesselSizeOz") SELECT "batchCode", "batchNotes", "calculatedCogs", "createdAt", "fragranceLoadPercent", "id", "isCoreElement", "laborCostPerUnit", "name", "overheadFlat", "overheadPercent", "quantityOnHand", "retailPrice", "sku", "updatedAt", "vesselSizeOz" FROM "finished_goods";
DROP TABLE "finished_goods";
ALTER TABLE "new_finished_goods" RENAME TO "finished_goods";
CREATE UNIQUE INDEX "finished_goods_sku_key" ON "finished_goods"("sku");
CREATE TABLE "new_lots" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lotNumber" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "quantity" REAL,
    "rawMaterialId" TEXT,
    "finishedGoodId" TEXT,
    "locationId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "lots_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "lots_rawMaterialId_fkey" FOREIGN KEY ("rawMaterialId") REFERENCES "raw_materials" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "lots_finishedGoodId_fkey" FOREIGN KEY ("finishedGoodId") REFERENCES "finished_goods" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_lots" ("createdAt", "finishedGoodId", "id", "kind", "lotNumber", "quantity", "rawMaterialId", "updatedAt") SELECT "createdAt", "finishedGoodId", "id", "kind", "lotNumber", "quantity", "rawMaterialId", "updatedAt" FROM "lots";
DROP TABLE "lots";
ALTER TABLE "new_lots" RENAME TO "lots";
CREATE UNIQUE INDEX "lots_lotNumber_key" ON "lots"("lotNumber");
CREATE TABLE "new_raw_materials" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "barcode" TEXT,
    "categoryId" TEXT NOT NULL,
    "supplierId" TEXT,
    "totalQuantity" REAL,
    "quantity" REAL,
    "sizePerUnit" REAL,
    "unit" TEXT,
    "costPerUnit" REAL,
    "reorderThreshold" REAL,
    "committedQuantity" REAL DEFAULT 0,
    "onOrderQuantity" REAL DEFAULT 0,
    "imagePath" TEXT,
    "locationId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "raw_materials_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "raw_materials_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "raw_materials_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_raw_materials" ("barcode", "categoryId", "committedQuantity", "costPerUnit", "createdAt", "id", "imagePath", "name", "onOrderQuantity", "quantity", "reorderThreshold", "sizePerUnit", "supplierId", "totalQuantity", "unit", "updatedAt") SELECT "barcode", "categoryId", "committedQuantity", "costPerUnit", "createdAt", "id", "imagePath", "name", "onOrderQuantity", "quantity", "reorderThreshold", "sizePerUnit", "supplierId", "totalQuantity", "unit", "updatedAt" FROM "raw_materials";
DROP TABLE "raw_materials";
ALTER TABLE "new_raw_materials" RENAME TO "raw_materials";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
