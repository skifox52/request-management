"use server"
import React from "react"
import { Card, CardBody } from "@nextui-org/react"
import { redirect } from "next/navigation"
import prismaClient from "@/app/utils/prismaClient"
import { TUser } from "@/app/api/users/all/route"

interface pageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

const Page: React.FC<pageProps> = async ({ searchParams }) => {
  if (
    !("user_id" in searchParams) ||
    !searchParams.user_id
      ?.toString()
      .match(
        /[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}/
      )
  )
    redirect("/home")

  const data: (TUser & { office_num: number }) | null =
    await prismaClient.user.findFirst({
      where: { id: searchParams?.user_id as string },
      include: {
        departement: { select: { dep_name: true } },
        group: { select: { libelle: true } },
      },
    })
  return (
    <Card shadow="md">
      <CardBody>
        <div className="flex justify-between border-b border-default py-4 px-2">
          <h2 className="uppercase text-white font-semibold">nom</h2>
          <p>{data?.lastname}</p>
        </div>
        <div className="flex justify-between border-b border-default py-4 px-2">
          <h2 className="uppercase text-white font-semibold">prénom</h2>
          <p>{data?.firstname}</p>
        </div>
        <div className="flex justify-between border-b border-default py-4 px-2">
          <h2 className="uppercase text-white font-semibold">
            nom d&apos;utilisateur
          </h2>
          <p>{data?.username}</p>
        </div>
        <div className="flex justify-between border-b border-default py-4 px-2">
          <h2 className="uppercase text-white font-semibold">adresse mail</h2>
          <p>{data?.email}</p>
        </div>

        <div className="flex justify-between border-b border-default py-4 px-2">
          <h2 className="uppercase text-white font-semibold">
            numéro de téléphone
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
        <div className="flex justify-between border-b border-default py-4 px-2">
          <h2 className="uppercase text-white font-semibold">fonction</h2>
          <p>{data?.function}</p>
        </div>
        <div className="flex justify-between border-b border-default py-4 px-2">
          <h2 className="uppercase text-white font-semibold">département</h2>
          <p>{data?.departement.dep_name}</p>
        </div>
        <div className="flex justify-between border-b border-default py-4 px-2">
          <h2 className="uppercase text-white font-semibold">groupe</h2>
          <p>{data?.group.libelle}</p>
        </div>
        <div className="flex justify-between py-4 px-2">
          <h2 className="uppercase text-white font-semibold">
            numéro de bureau
          </h2>
          <p>{data?.office_num}</p>
        </div>
      </CardBody>
    </Card>
  )
}
export default Page
