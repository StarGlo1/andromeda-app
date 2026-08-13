-- CreateTable
CREATE TABLE "lots" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lotNumber" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "quantity" REAL,
    "rawMaterialId" TEXT,
    "finishedGoodId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "lots_rawMaterialId_fkey" FOREIGN KEY ("rawMaterialId") REFERENCES "raw_materials" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "lots_finishedGoodId_fkey" FOREIGN KEY ("finishedGoodId") REFERENCES "finished_goods" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "lot_raw_materials" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "finishedGoodLotId" TEXT NOT NULL,
    "rawMaterialLotId" TEXT NOT NULL,
    "quantityUsed" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "lot_raw_materials_finishedGoodLotId_fkey" FOREIGN KEY ("finishedGoodLotId") REFERENCES "lots" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "lot_raw_materials_rawMaterialLotId_fkey" FOREIGN KEY ("rawMaterialLotId") REFERENCES "lots" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "lots_lotNumber_key" ON "lots"("lotNumber");

-- CreateIndex
CREATE UNIQUE INDEX "lot_raw_materials_finishedGoodLotId_rawMaterialLotId_key" ON "lot_raw_materials"("finishedGoodLotId", "rawMaterialLotId");
