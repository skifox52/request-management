import EquipmentPage from "@/app/component/client/EquipmentPage"
import prismaClient from "@/app/utils/prismaClient"
import React from "react"

interface pageProps {}

export type TEquipment = {
  typeEquipement: {
    libelle: string
  }
  user: {
    firstname: string
    lastname: string
  }
} & {
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
}
const page: React.FC<pageProps> = async ({}) => {
  const equipments = await prismaClient.equipement.findMany({
    orderBy: [{ libelle: "asc" }],
    include: {
      typeEquipement: { select: { libelle: true } },
      user: { select: { firstname: true, lastname: true } },
    },
  })

  return <EquipmentPage equipments={equipments} />
}
export default page
