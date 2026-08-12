-- AlterTable
ALTER TABLE "raw_materials" ADD COLUMN "committedQuantity" REAL DEFAULT 0;
ALTER TABLE "raw_materials" ADD COLUMN "onOrderQuantity" REAL DEFAULT 0;
