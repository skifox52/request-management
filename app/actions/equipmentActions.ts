"use server"

import prismaClient from "../utils/prismaClient"
import { TaddEquipmentSchema } from "../zod/addEquipmentSchema"

export const addEquipmentAction = async (data: TaddEquipmentSchema) => {
  try {
    await prismaClient.equipement.create({
      data: {
        caracteristique: data.caracteristique,
        date_sortie: data.date_sortie,
        date_fin_garantie: data.date_fin_garantie,
        id_user: data.id_user,
        id_equipement: data.id_equipement,
        date_aquisition: data.date_aquisition,
        libelle: data.libelle,
        numero_de_serie: data.numero_de_serie,
        image: data.image as string,
      },
    })
  } catch (error: any) {
    throw new Error("Une erreur est survenue, veuillez réessayer")
  }
}
