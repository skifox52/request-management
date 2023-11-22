import ReclamationDashboard from "@/app/component/client/ReclamationDashboard"
import prismaClient from "@/app/utils/prismaClient"
import React from "react"

interface pageProps {}

export interface TClaims {
  id: string
  id_user: string
  motif_demande: string
  date_demande: Date
  id_equipement: string
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
    image: string
  }
}

const page: React.FC<pageProps> = async ({}) => {
  const claims = await prismaClient.demandeIntervention.findMany({
    include: {
      equipement: {
        select: {
          libelle: true,
          image: true,
          id: true,
          date_fin_garantie: true,
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
  })
  return <ReclamationDashboard claims={claims} />
}
export default page
