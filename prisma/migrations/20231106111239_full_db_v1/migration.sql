/*
  Warnings:

  - A unique constraint covering the columns `[id_dep]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_group]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `id_group` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `id_group` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Groupe` (
    `id` VARCHAR(191) NOT NULL,
    `libelle` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departement` (
    `id` VARCHAR(191) NOT NULL,
    `dir_id` VARCHAR(191) NOT NULL,
    `dep_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Departement_dir_id_key`(`dir_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Direction` (
    `id` VARCHAR(191) NOT NULL,
    `direction_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Equipement` (
    `id` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `id_equipement` VARCHAR(191) NOT NULL,
    `caracteristique` VARCHAR(191) NULL,
    `date_aquisition` DATETIME(3) NOT NULL,
    `date_fin_garantie` DATETIME(3) NOT NULL,
    `date_sortie` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Equipement_id_user_key`(`id_user`),
    UNIQUE INDEX `Equipement_id_equipement_key`(`id_equipement`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TypeEquipement` (
    `id` VARCHAR(191) NOT NULL,
    `libelle` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fournisseur` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `adresse_web` VARCHAR(191) NOT NULL,
    `num_tel` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Decharge` (
    `id` VARCHAR(191) NOT NULL,
    `id_fournisseur` VARCHAR(191) NOT NULL,
    `date_etablir` DATETIME(3) NOT NULL,
    `date_de_sortie` DATETIME(3) NOT NULL,
    `date_entree` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Decharge_id_fournisseur_key`(`id_fournisseur`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Piece` (
    `id` VARCHAR(191) NOT NULL,
    `modele` VARCHAR(191) NOT NULL,
    `marque` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DemandePiece` (
    `id` VARCHAR(191) NOT NULL,
    `id_magasin` VARCHAR(191) NOT NULL,
    `modele` VARCHAR(191) NOT NULL,
    `marque` VARCHAR(191) NOT NULL,
    `etat_piece` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `DemandePiece_id_magasin_key`(`id_magasin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Magasin` (
    `id` VARCHAR(191) NOT NULL,
    `tel_magasin` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reparation` (
    `id` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `id_intervention` VARCHAR(191) NOT NULL,
    `id_decharge` VARCHAR(191) NOT NULL,
    `probleme` VARCHAR(191) NOT NULL,
    `solution` VARCHAR(191) NOT NULL,
    `date_reparation` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Reparation_id_user_key`(`id_user`),
    UNIQUE INDEX `Reparation_id_intervention_key`(`id_intervention`),
    UNIQUE INDEX `Reparation_id_decharge_key`(`id_decharge`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Intervention` (
    `id` VARCHAR(191) NOT NULL,
    `id_equipement` VARCHAR(191) NOT NULL,
    `id_demande_intervention` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `id_demande` VARCHAR(191) NOT NULL,
    `urgence` ENUM('basse', 'moyenne', 'haute') NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `type_panne` VARCHAR(191) NOT NULL,
    `cat_panne` VARCHAR(191) NOT NULL,
    `etat` VARCHAR(191) NOT NULL,
    `date_fin_intervention` DATETIME(3) NULL,

    UNIQUE INDEX `Intervention_id_equipement_key`(`id_equipement`),
    UNIQUE INDEX `Intervention_id_demande_intervention_key`(`id_demande_intervention`),
    UNIQUE INDEX `Intervention_id_user_key`(`id_user`),
    UNIQUE INDEX `Intervention_id_demande_key`(`id_demande`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DemandeIntervention` (
    `id` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `motif_demande` VARCHAR(191) NOT NULL,
    `date_deamdne` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DemandePieceToPiece` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_DemandePieceToPiece_AB_unique`(`A`, `B`),
    INDEX `_DemandePieceToPiece_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DemandeInterventionToEquipement` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_DemandeInterventionToEquipement_AB_unique`(`A`, `B`),
    INDEX `_DemandeInterventionToEquipement_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_id_dep_key` ON `User`(`id_dep`);

-- CreateIndex
CREATE UNIQUE INDEX `User_id_group_key` ON `User`(`id_group`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_id_dep_fkey` FOREIGN KEY (`id_dep`) REFERENCES `Departement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_id_group_fkey` FOREIGN KEY (`id_group`) REFERENCES `Groupe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Departement` ADD CONSTRAINT `Departement_dir_id_fkey` FOREIGN KEY (`dir_id`) REFERENCES `Direction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Equipement` ADD CONSTRAINT `Equipement_id_equipement_fkey` FOREIGN KEY (`id_equipement`) REFERENCES `TypeEquipement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Equipement` ADD CONSTRAINT `Equipement_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Decharge` ADD CONSTRAINT `Decharge_id_fournisseur_fkey` FOREIGN KEY (`id_fournisseur`) REFERENCES `Fournisseur`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DemandePiece` ADD CONSTRAINT `DemandePiece_id_magasin_fkey` FOREIGN KEY (`id_magasin`) REFERENCES `Magasin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reparation` ADD CONSTRAINT `Reparation_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reparation` ADD CONSTRAINT `Reparation_id_intervention_fkey` FOREIGN KEY (`id_intervention`) REFERENCES `Intervention`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reparation` ADD CONSTRAINT `Reparation_id_decharge_fkey` FOREIGN KEY (`id_decharge`) REFERENCES `Decharge`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Intervention` ADD CONSTRAINT `Intervention_id_equipement_fkey` FOREIGN KEY (`id_equipement`) REFERENCES `Equipement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Intervention` ADD CONSTRAINT `Intervention_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Intervention` ADD CONSTRAINT `Intervention_id_demande_intervention_fkey` FOREIGN KEY (`id_demande_intervention`) REFERENCES `DemandeIntervention`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DemandeIntervention` ADD CONSTRAINT `DemandeIntervention_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DemandePieceToPiece` ADD CONSTRAINT `_DemandePieceToPiece_A_fkey` FOREIGN KEY (`A`) REFERENCES `DemandePiece`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DemandePieceToPiece` ADD CONSTRAINT `_DemandePieceToPiece_B_fkey` FOREIGN KEY (`B`) REFERENCES `Piece`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DemandeInterventionToEquipement` ADD CONSTRAINT `_DemandeInterventionToEquipement_A_fkey` FOREIGN KEY (`A`) REFERENCES `DemandeIntervention`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DemandeInterventionToEquipement` ADD CONSTRAINT `_DemandeInterventionToEquipement_B_fkey` FOREIGN KEY (`B`) REFERENCES `Equipement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
