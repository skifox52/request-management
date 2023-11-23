/*
  Warnings:

  - You are about to drop the column `id_equipement` on the `DemandeIntervention` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `DemandeIntervention_id_equipement_fkey` ON `DemandeIntervention`;

-- AlterTable
ALTER TABLE `DemandeIntervention` DROP COLUMN `id_equipement`;
