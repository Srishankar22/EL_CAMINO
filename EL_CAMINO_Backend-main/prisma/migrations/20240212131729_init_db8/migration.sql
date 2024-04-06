/*
  Warnings:

  - You are about to alter the column `rating` on the `Course` table. The data in that column could be lost. The data in that column will be cast from `Decimal(6,3)` to `Decimal(6,4)`.

*/
-- AlterTable
ALTER TABLE `Course` MODIFY `rating` DECIMAL(6, 4) NOT NULL;
