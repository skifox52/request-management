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
        libelle: "",
        numero_de_serie: 9,
        image: data.image,
      },
    })
  } catch (error: any) {
    throw new Error("Une erreur est survenue, veuillez réessayer")
  }
}
