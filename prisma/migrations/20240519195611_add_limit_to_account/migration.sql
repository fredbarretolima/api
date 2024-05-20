-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "balance" DECIMAL NOT NULL DEFAULT 0,
    "limit" DECIMAL NOT NULL DEFAULT 0
);
INSERT INTO "new_Account" ("balance", "category", "id", "name") SELECT "balance", "category", "id", "name" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
