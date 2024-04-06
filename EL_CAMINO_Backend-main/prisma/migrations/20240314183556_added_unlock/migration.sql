-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
