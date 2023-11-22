"use server"
import React from "react"
import { Card, CardBody } from "@nextui-org/react"
import { getServerSession } from "next-auth"
import prismaClient from "@/app/utils/prismaClient"
import { TUser } from "@/app/api/users/all/route"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

interface pageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const Page: React.FC<pageProps> = async ({ searchParams }) => {
  const session = await getServerSession(authOptions)
  const data: (TUser & { office_num: number }) | null =
    await prismaClient.user.findFirst({
      where: { id: session?.user.id },
      include: {
        departement: { select: { dep_name: true } },
        group: { select: { libelle: true } },
      },
    })
  return (
    <Card
      shadow="md"
      className="max-w-screen-sm bg-content1 mx-auto shadow-lg shadow-content2 border border-default/30"
    >
      <CardBody>
        <div className="flex justify-between border-b border-default p-2">
          <h2 className="text-gray-300 font-semibold text-medium tracking-tight">
            Nom
          </h2>
          <p>{data?.lastname}</p>
        </div>
        <div className="flex justify-between border-b border-default p-3">
          <h2 className="text-gray-300 tracking-tight font-semibold">Prénom</h2>
          <p>{data?.firstname}</p>
        </div>
        <div className="flex justify-between border-b border-default p-3">
          <h2 className="text-gray-300 tracking-tight font-semibold">
            Nom d&apos;utilisateur
          </h2>
          <p>{data?.username}</p>
        </div>
        <div className="flex justify-between border-b border-default p-3">
          <h2 className="text-gray-300 tracking-tight font-semibold">
            Adresse mail
          </h2>
          <p>{data?.email}</p>
        </div>

        <div className="flex justify-between border-b border-default p-3">
          <h2 className="text-gray-300 tracking-tight font-semibold">
            Numéro de téléphone
          </h2>
          <p>
            0
            {data?.phone.toString().substring(0, 3) +
              "-" +
              data?.phone.toString().substring(3, 6) +
              "-" +
              data?.phone.toString().substring(6, data.phone.toString().length)}
          </p>
        </div>
        <div className="flex justify-between border-b border-default p-3">
          <h2 className="text-gray-300 tracking-tight font-semibold">
            Fonction
          </h2>
          <p>{data?.function}</p>
        </div>
        <div className="flex justify-between border-b border-default p-3">
          <h2 className="text-gray-300 tracking-tight font-semibold">
            Département
          </h2>
          <p>{data?.departement.dep_name}</p>
        </div>
        <div className="flex justify-between border-b border-default p-3">
          <h2 className="text-gray-300 tracking-tight font-semibold">Groupe</h2>
          <p>{data?.group.libelle}</p>
        </div>
        <div className="flex justify-between p-3">
          <h2 className="text-gray-300 tracking-tight font-semibold">
            Numéro de bureau
          </h2>
          <p>{data?.office_num}</p>
        </div>
      </CardBody>
    </Card>
  )
}
export default Page
