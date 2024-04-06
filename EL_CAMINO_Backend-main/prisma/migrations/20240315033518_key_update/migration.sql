-- DropForeignKey
ALTER TABLE `Course` DROP FOREIGN KEY `Course_courseId_fkey`;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
