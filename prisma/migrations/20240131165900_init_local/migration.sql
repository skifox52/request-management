-- CreateEnum
CREATE TYPE "InterventionStatus" AS ENUM ('EN_ATTENTE', 'EN_COURS', 'REJETER', 'TERMINER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
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
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Groupe" (
    "id" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "Groupe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Direction" (
    "id" TEXT NOT NULL,
    "direction_name" TEXT NOT NULL,

    CONSTRAINT "Direction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departement" (
    "id" TEXT NOT NULL,
    "dir_id" TEXT NOT NULL,
    "dep_name" TEXT NOT NULL,

    CONSTRAINT "Departement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipement" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_equipement" TEXT NOT NULL,
    "numero_de_serie" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "caracteristique" TEXT,
    "date_aquisition" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_fin_garantie" TIMESTAMP(3) NOT NULL,
    "date_sortie" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Equipement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeEquipement" (
    "id" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "TypeEquipement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DemandeIntervention" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "motif_demande" TEXT NOT NULL,
    "status" "InterventionStatus" NOT NULL DEFAULT 'EN_ATTENTE',
    "date_demande" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DemandeIntervention_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DemandeInterventionToEquipement" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_DemandeInterventionToEquipement_AB_unique" ON "_DemandeInterventionToEquipement"("A", "B");

-- CreateIndex
CREATE INDEX "_DemandeInterventionToEquipement_B_index" ON "_DemandeInterventionToEquipement"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_dep_fkey" FOREIGN KEY ("id_dep") REFERENCES "Departement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_group_fkey" FOREIGN KEY ("id_group") REFERENCES "Groupe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departement" ADD CONSTRAINT "Departement_dir_id_fkey" FOREIGN KEY ("dir_id") REFERENCES "Direction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipement" ADD CONSTRAINT "Equipement_id_equipement_fkey" FOREIGN KEY ("id_equipement") REFERENCES "TypeEquipement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipement" ADD CONSTRAINT "Equipement_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DemandeIntervention" ADD CONSTRAINT "DemandeIntervention_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemandeInterventionToEquipement" ADD CONSTRAINT "_DemandeInterventionToEquipement_A_fkey" FOREIGN KEY ("A") REFERENCES "DemandeIntervention"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemandeInterventionToEquipement" ADD CONSTRAINT "_DemandeInterventionToEquipement_B_fkey" FOREIGN KEY ("B") REFERENCES "Equipement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
