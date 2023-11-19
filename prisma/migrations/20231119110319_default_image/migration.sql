/*
  Warnings:

  - Made the column `image` on table `Equipement` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Equipement` MODIFY `image` LONGTEXT NOT NULL;
