import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import EquipmentClient from "@/app/component/client/EquipmentClient"
import prismaClient from "@/app/utils/prismaClient"
import { getServerSession } from "next-auth"
import React from "react"

interface pageProps {}

export type TUserEquipment = {
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
  image: string
}

const page: React.FC<pageProps> = async ({}) => {
  const session = await getServerSession(authOptions)
  const equipments = await prismaClient.equipement.findMany({
    where: { id_user: session?.user.id },
    include: { typeEquipement: { select: { libelle: true } } },
  })
  return (
    <React.Fragment>
      <EquipmentClient equipments={equipments} userId={session?.user.id} />
    </React.Fragment>
  )
}
export default page
