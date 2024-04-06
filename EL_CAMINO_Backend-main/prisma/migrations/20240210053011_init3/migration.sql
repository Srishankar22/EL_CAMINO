/*
  Warnings:

  - You are about to alter the column `rating` on the `Course` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,3)` to `Decimal(6,3)`.

*/
-- AlterTable
ALTER TABLE `Course` MODIFY `rating` DECIMAL(6, 3) NOT NULL;
