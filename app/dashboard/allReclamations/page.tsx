import ReclamationDashboard from "@/app/component/client/ReclamationDashboard"
import prismaClient from "@/app/utils/prismaClient"
import React from "react"

export const dynamic = "force-dynamic"

interface pageProps {}

export interface TClaims {
  id: string
  id_user: string
  motif_demande: string
  status: "EN_ATTENTE" | "EN_COURS" | "REJETER" | "TERMINER"
  date_demande: Date
  personne: {
    id: string
    firstname: string
    lastname: string
    username: string
    office_num: number
  }
  equipement: {
    id: string
    libelle: string
    date_fin_garantie: Date
    numero_de_serie: string
  }[]
}

const page: React.FC<pageProps> = async ({}) => {
  const claims = await prismaClient.demandeIntervention.findMany({
    include: {
      equipement: {
        select: {
          libelle: true,
          id: true,
          date_fin_garantie: true,
          numero_de_serie: true,
        },
      },
      personne: {
        select: {
          id: true,
          firstname: true,
          lastname: true,
          office_num: true,
          username: true,
        },
      },
    },
    orderBy: [{ date_demande: "desc" }],
  })
  return <ReclamationDashboard claims={claims} />
}
export default page
