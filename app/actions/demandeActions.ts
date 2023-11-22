"use server"
import prismaClient from "../utils/prismaClient"
import {
  TDemandeIntervention,
  demandeInterventionFormSchema,
} from "../zod/demandeInterventionSchema"

export const demandeInterventionAction = async (data: TDemandeIntervention) => {
  try {
    const parsedData = demandeInterventionFormSchema.safeParse(data)
    if (!parsedData.success)
      throw new Error("Une erreur est survenue, veuillez réessayer")
    await prismaClient.demandeIntervention.create({
      data: {
        motif_demande: data.motif_demande,
        id_equipement: data.id_equipement.toString(),
        id_user: data.id_user,
      },
    })
  } catch (error: any) {
    throw new Error("Une erreur est survenue, veuillez réessayer")
  }
}
