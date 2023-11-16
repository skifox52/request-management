/*
  Warnings:

  - Added the required column `libelle` to the `Equipement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero_de_serie` to the `Equipement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Equipement` ADD COLUMN `libelle` VARCHAR(191) NOT NULL,
    ADD COLUMN `numero_de_serie` INTEGER NOT NULL;
