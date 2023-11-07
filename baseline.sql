-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_dep" TEXT NOT NULL,
    "id_group" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "office_num" INTEGER NOT NULL,
    "function" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    CONSTRAINT "User_id_dep_fkey" FOREIGN KEY ("id_dep") REFERENCES "Departement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_id_group_fkey" FOREIGN KEY ("id_group") REFERENCES "Groupe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Groupe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "libelle" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Direction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "direction_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Departement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dir_id" TEXT NOT NULL,
    "dep_name" TEXT NOT NULL,
    CONSTRAINT "Departement_dir_id_fkey" FOREIGN KEY ("dir_id") REFERENCES "Direction" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Equipement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "id_equipement" TEXT NOT NULL,
    "caracteristique" TEXT,
    "date_aquisition" DATETIME NOT NULL,
    "date_fin_garantie" DATETIME NOT NULL,
    "date_sortie" DATETIME NOT NULL,
    CONSTRAINT "Equipement_id_equipement_fkey" FOREIGN KEY ("id_equipement") REFERENCES "TypeEquipement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Equipement_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TypeEquipement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "libelle" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Fournisseur" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "adresse_web" TEXT NOT NULL,
    "num_tel" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Decharge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_fournisseur" TEXT NOT NULL,
    "date_etablir" DATETIME NOT NULL,
    "date_de_sortie" DATETIME NOT NULL,
    "date_entree" DATETIME NOT NULL,
    CONSTRAINT "Decharge_id_fournisseur_fkey" FOREIGN KEY ("id_fournisseur") REFERENCES "Fournisseur" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Piece" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "modele" TEXT NOT NULL,
    "marque" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DemandePiece" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_magasin" TEXT NOT NULL,
    "modele" TEXT NOT NULL,
    "marque" TEXT NOT NULL,
    "etat_piece" TEXT NOT NULL,
    CONSTRAINT "DemandePiece_id_magasin_fkey" FOREIGN KEY ("id_magasin") REFERENCES "Magasin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Magasin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tel_magasin" INTEGER NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Reparation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "id_intervention" TEXT NOT NULL,
    "id_decharge" TEXT NOT NULL,
    "probleme" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "date_reparation" TEXT NOT NULL,
    CONSTRAINT "Reparation_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reparation_id_intervention_fkey" FOREIGN KEY ("id_intervention") REFERENCES "Intervention" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reparation_id_decharge_fkey" FOREIGN KEY ("id_decharge") REFERENCES "Decharge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Intervention" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_equipement" TEXT NOT NULL,
    "id_demande_intervention" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_demande" TEXT NOT NULL,
    "urgence" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type_panne" TEXT NOT NULL,
    "cat_panne" TEXT NOT NULL,
    "etat" TEXT NOT NULL,
    "date_fin_intervention" DATETIME,
    CONSTRAINT "Intervention_id_equipement_fkey" FOREIGN KEY ("id_equipement") REFERENCES "Equipement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Intervention_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Intervention_id_demande_intervention_fkey" FOREIGN KEY ("id_demande_intervention") REFERENCES "DemandeIntervention" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DemandeIntervention" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "motif_demande" TEXT NOT NULL,
    "date_deamdne" TEXT NOT NULL,
    CONSTRAINT "DemandeIntervention_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_DemandePieceToPiece" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_DemandePieceToPiece_A_fkey" FOREIGN KEY ("A") REFERENCES "DemandePiece" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DemandePieceToPiece_B_fkey" FOREIGN KEY ("B") REFERENCES "Piece" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_DemandeInterventionToEquipement" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_DemandeInterventionToEquipement_A_fkey" FOREIGN KEY ("A") REFERENCES "DemandeIntervention" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DemandeInterventionToEquipement_B_fkey" FOREIGN KEY ("B") REFERENCES "Equipement" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_dep_key" ON "User"("id_dep");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Decharge_id_fournisseur_key" ON "Decharge"("id_fournisseur");

-- CreateIndex
CREATE UNIQUE INDEX "DemandePiece_id_magasin_key" ON "DemandePiece"("id_magasin");

-- CreateIndex
CREATE UNIQUE INDEX "Reparation_id_intervention_key" ON "Reparation"("id_intervention");

-- CreateIndex
CREATE UNIQUE INDEX "Reparation_id_decharge_key" ON "Reparation"("id_decharge");

-- CreateIndex
CREATE UNIQUE INDEX "Intervention_id_demande_intervention_key" ON "Intervention"("id_demande_intervention");

-- CreateIndex
CREATE UNIQUE INDEX "_DemandePieceToPiece_AB_unique" ON "_DemandePieceToPiece"("A", "B");

-- CreateIndex
CREATE INDEX "_DemandePieceToPiece_B_index" ON "_DemandePieceToPiece"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DemandeInterventionToEquipement_AB_unique" ON "_DemandeInterventionToEquipement"("A", "B");

-- CreateIndex
CREATE INDEX "_DemandeInterventionToEquipement_B_index" ON "_DemandeInterventionToEquipement"("B");

