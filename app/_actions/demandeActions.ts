"use server"
import { InterventionStatus } from "@prisma/client"
import prismaClient from "../utils/prismaClient"
import {
  TDemandeIntervention,
  demandeInterventionFormSchema,
} from "../zod/demandeInterventionSchema"
import { revalidatePath } from "next/cache"

export const demandeInterventionAction = async (
  data: TDemandeIntervention,
  equipmentIds: string[]
) => {
  try {
    const parsedData = demandeInterventionFormSchema.safeParse(data)
    if (!parsedData.success)
      throw new Error("Une erreur est survenue, veuillez réessayer")
    await prismaClient.demandeIntervention.create({
      data: {
        motif_demande: data.motif_demande,
        id_user: data.id_user,
        equipement: {
          connect: [
            ...equipmentIds.map((id) => ({
              id,
            })),
          ],
        },
      },
    })
  } catch (error: any) {
    throw new Error("Une erreur est survenue, veuillez réessayer")
  }
}

export const changeInterventionStatus = async (
  status: InterventionStatus,
  id: string
) => {
  try {
    await prismaClient.demandeIntervention.update({
      where: { id: id },
      data: { status: status },
    })
    revalidatePath("/dashboard/allReclamations")
  } catch (error) {
    console.log(error)
    throw new Error("Une erreur est survenue, veuillez réessayer")
  }
}
