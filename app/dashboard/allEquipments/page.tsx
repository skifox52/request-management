import { EquipmentCard } from "@/app/component/client/EquipmentCard"
import prismaClient from "@/app/utils/prismaClient"
import React from "react"

interface pageProps {}

export type TEquipment = {
  typeEquipement: {
    libelle: string
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
  image: string | null
}

const page: React.FC<pageProps> = async ({}) => {
  const equipments = await prismaClient.equipement.findMany({
    include: { typeEquipement: { select: { libelle: true } } },
  })
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {equipments.map((eq) => (
        <EquipmentCard key={eq.id} equipment={eq} />
      ))}
    </div>
  )
}
export default page
