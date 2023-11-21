/*
  Warnings:

  - You are about to drop the column `date_deamdne` on the `DemandeIntervention` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `DemandeIntervention` DROP COLUMN `date_deamdne`,
    ADD COLUMN `date_demande` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
