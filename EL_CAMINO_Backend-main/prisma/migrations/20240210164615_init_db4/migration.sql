/*
  Warnings:

  - You are about to alter the column `ownerId` on the `Course` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Course` MODIFY `ownerId` INTEGER NOT NULL,
    MODIFY `comments` VARCHAR(191) NOT NULL DEFAULT '';
