/*
  Warnings:

  - You are about to drop the `Decharge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DemandePiece` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fournisseur` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Magasin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Piece` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reparation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DemandePieceToPiece` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Decharge` DROP FOREIGN KEY `Decharge_id_fournisseur_fkey`;

-- DropForeignKey
ALTER TABLE `DemandeIntervention` DROP FOREIGN KEY `DemandeIntervention_id_equipement_fkey`;

-- DropForeignKey
ALTER TABLE `DemandePiece` DROP FOREIGN KEY `DemandePiece_id_magasin_fkey`;

-- DropForeignKey
ALTER TABLE `Reparation` DROP FOREIGN KEY `Reparation_id_decharge_fkey`;

-- DropForeignKey
ALTER TABLE `Reparation` DROP FOREIGN KEY `Reparation_id_intervention_fkey`;

-- DropForeignKey
ALTER TABLE `Reparation` DROP FOREIGN KEY `Reparation_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `_DemandePieceToPiece` DROP FOREIGN KEY `_DemandePieceToPiece_A_fkey`;

-- DropForeignKey
ALTER TABLE `_DemandePieceToPiece` DROP FOREIGN KEY `_DemandePieceToPiece_B_fkey`;

-- DropTable
DROP TABLE `Decharge`;

-- DropTable
DROP TABLE `DemandePiece`;

-- DropTable
DROP TABLE `Fournisseur`;

-- DropTable
DROP TABLE `Magasin`;

-- DropTable
DROP TABLE `Piece`;

-- DropTable
DROP TABLE `Reparation`;

-- DropTable
DROP TABLE `_DemandePieceToPiece`;

-- CreateTable
CREATE TABLE `_DemandeInterventionToEquipement` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_DemandeInterventionToEquipement_AB_unique`(`A`, `B`),
    INDEX `_DemandeInterventionToEquipement_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_DemandeInterventionToEquipement` ADD CONSTRAINT `_DemandeInterventionToEquipement_A_fkey` FOREIGN KEY (`A`) REFERENCES `DemandeIntervention`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DemandeInterventionToEquipement` ADD CONSTRAINT `_DemandeInterventionToEquipement_B_fkey` FOREIGN KEY (`B`) REFERENCES `Equipement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
