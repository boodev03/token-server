-- CreateTable
CREATE TABLE `tokens` (
    `id` CHAR(36) NOT NULL,
    `logo` VARCHAR(255) NULL,
    `name` VARCHAR(100) NOT NULL,
    `symbol` VARCHAR(20) NOT NULL,
    `total_supply` BIGINT NULL,
    `price_usd` DECIMAL(18, 8) NULL,
    `description` TEXT NULL,
    `website` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
