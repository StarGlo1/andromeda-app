-- CreateTable
CREATE TABLE "consignment_locations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'storefront',
    "address" TEXT,
    "contactName" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "consignment_batches" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "locationId" TEXT NOT NULL,
    "datePlaced" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expectedReturnDate" DATETIME,
    "returnedDate" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'active',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "consignment_batches_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "consignment_locations" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "consignment_batch_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "batchId" TEXT NOT NULL,
    "finishedGoodId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "consignment_batch_items_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "consignment_batches" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "consignment_batch_items_finishedGoodId_fkey" FOREIGN KEY ("finishedGoodId") REFERENCES "finished_goods" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT,
    "type" TEXT NOT NULL DEFAULT 'popup',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sales" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT,
    "saleDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalAmount" REAL NOT NULL,
    "discount" REAL NOT NULL DEFAULT 0,
    "tax" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'Paid',
    "notes" TEXT,
    "eventId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "sales_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "sales_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_sales" ("createdAt", "customerId", "discount", "id", "notes", "saleDate", "status", "tax", "totalAmount", "updatedAt") SELECT "createdAt", "customerId", "discount", "id", "notes", "saleDate", "status", "tax", "totalAmount", "updatedAt" FROM "sales";
DROP TABLE "sales";
ALTER TABLE "new_sales" RENAME TO "sales";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "consignment_batch_items_batchId_finishedGoodId_key" ON "consignment_batch_items"("batchId", "finishedGoodId");
