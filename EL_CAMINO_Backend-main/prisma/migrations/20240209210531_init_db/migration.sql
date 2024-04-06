-- CreateTable
CREATE TABLE `Course` (
    `courseId` INTEGER NOT NULL AUTO_INCREMENT,
    `courseDomain` VARCHAR(191) NOT NULL,
    `courseName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `value` INTEGER NOT NULL,
    `rating` DECIMAL(5, 3) NOT NULL,
    `ownerId` VARCHAR(191) NOT NULL,
    `thumbnail` VARCHAR(191) NOT NULL,
    `video` VARCHAR(191) NOT NULL,
    `views` INTEGER NOT NULL DEFAULT 0,
    `likes` INTEGER NOT NULL DEFAULT 0,
    `comments` VARCHAR(191) NOT NULL,
    `keywords` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`courseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
