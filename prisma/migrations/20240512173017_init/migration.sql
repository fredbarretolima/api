-- CreateTable
CREATE TABLE "Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "balance" DECIMAL NOT NULL
);
