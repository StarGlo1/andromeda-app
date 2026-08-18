-- CreateTable
CREATE TABLE "recipe_versions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "finishedGoodId" TEXT NOT NULL,
    "versionNumber" INTEGER NOT NULL,
    "recipeSnapshot" TEXT NOT NULL,
    "changeNote" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "recipe_versions_finishedGoodId_fkey" FOREIGN KEY ("finishedGoodId") REFERENCES "finished_goods" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "recipe_versions_finishedGoodId_versionNumber_key" ON "recipe_versions"("finishedGoodId", "versionNumber");
