/*
  Warnings:

  - You are about to drop the `Intervention` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Intervention` DROP FOREIGN KEY `Intervention_id_demande_intervention_fkey`;

-- DropForeignKey
ALTER TABLE `Intervention` DROP FOREIGN KEY `Intervention_id_equipement_fkey`;

-- DropForeignKey
ALTER TABLE `Intervention` DROP FOREIGN KEY `Intervention_id_user_fkey`;

-- AlterTable
ALTER TABLE `DemandeIntervention` ADD COLUMN `status` ENUM('EN_ATTENTE', 'EN_COURS', 'REJETER') NOT NULL DEFAULT 'EN_ATTENTE';

-- DropTable
DROP TABLE `Intervention`;
