-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "raw_materials" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "totalQuantity" REAL,
    "unit" TEXT,
    "costPerUnit" REAL,
    "reorderThreshold" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "raw_materials_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "finished_goods" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sku" TEXT,
    "batchCode" TEXT NOT NULL,
    "quantityOnHand" INTEGER NOT NULL DEFAULT 0,
    "retailPrice" REAL NOT NULL,
    "calculatedCogs" REAL NOT NULL DEFAULT 0.0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "recipe_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "finishedGoodId" TEXT NOT NULL,
    "rawMaterialId" TEXT NOT NULL,
    "requiredQuantity" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    CONSTRAINT "recipe_items_finishedGoodId_fkey" FOREIGN KEY ("finishedGoodId") REFERENCES "finished_goods" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "recipe_items_rawMaterialId_fkey" FOREIGN KEY ("rawMaterialId") REFERENCES "raw_materials" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "finished_goods_sku_key" ON "finished_goods"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_items_finishedGoodId_rawMaterialId_key" ON "recipe_items"("finishedGoodId", "rawMaterialId");
