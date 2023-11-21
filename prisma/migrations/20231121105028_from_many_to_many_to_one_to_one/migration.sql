/*
  Warnings:

  - You are about to drop the `_DemandeInterventionToEquipement` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_equipement` to the `DemandeIntervention` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_DemandeInterventionToEquipement` DROP FOREIGN KEY `_DemandeInterventionToEquipement_A_fkey`;

-- DropForeignKey
ALTER TABLE `_DemandeInterventionToEquipement` DROP FOREIGN KEY `_DemandeInterventionToEquipement_B_fkey`;

-- AlterTable
ALTER TABLE `DemandeIntervention` ADD COLUMN `id_equipement` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_DemandeInterventionToEquipement`;

-- AddForeignKey
ALTER TABLE `DemandeIntervention` ADD CONSTRAINT `DemandeIntervention_id_equipement_fkey` FOREIGN KEY (`id_equipement`) REFERENCES `Equipement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
