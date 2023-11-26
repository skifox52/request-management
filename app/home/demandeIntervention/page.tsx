"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import InterventionClient from "@/app/component/client/InterventionClient"
import prismaClient from "@/app/utils/prismaClient"
import { InterventionStatus } from "@prisma/client"
import { getServerSession } from "next-auth"
import React from "react"

interface pageProps {}

export type TInterventionClient = {
  id: string
  id_user: string
  motif_demande: string
  status: InterventionStatus
  date_demande: Date
  equipement: {
    id: string
    id_user: string
    id_equipement: string
    numero_de_serie: string
    libelle: string
    caracteristique: string | null
    date_aquisition: Date
    date_fin_garantie: Date
    date_sortie: Date
    image: string
  }[]
}

const page: React.FC<pageProps> = async ({}) => {
  const userSession = await getServerSession(authOptions)
  const interventions = await prismaClient.demandeIntervention.findMany({
    where: { id_user: userSession?.user.id },
    include: { equipement: true },
  })
  return <InterventionClient interventions={interventions} />
}
export default page
