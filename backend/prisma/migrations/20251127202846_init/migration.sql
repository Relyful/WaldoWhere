/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Leaderboard" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "timer" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Leaderboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaldoGame" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "xStart" INTEGER NOT NULL,
    "xEnd" INTEGER NOT NULL,
    "yStart" INTEGER NOT NULL,
    "yEnd" INTEGER NOT NULL,

    CONSTRAINT "WaldoGame_pkey" PRIMARY KEY ("id")
);
