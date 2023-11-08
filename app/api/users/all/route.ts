import prismaClient from "@/app/utils/prismaClient"
import { User } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

type Users = User & {
  departement: { dep_name: string }
  group: { libelle: string }
}

export type TUser = Omit<
  Users,
  "password" | "office_num" | "id_dep" | "id_group"
>

export async function GET(request: NextRequest) {
  try {
    const users: Users[] = await prismaClient.user.findMany({
      include: {
        departement: { select: { dep_name: true } },
        group: { select: { libelle: true } },
      },
    })
    const returnedUsers = users.map(
      (u) =>
        ({
          id: u.id,
          role: u.role,
          lastname: u.lastname,
          firstname: u.firstname,
          departement: { dep_name: u.departement.dep_name },
          group: { libelle: u.group.libelle },
          phone: u.phone,
          username: u.username,
          isActive: u.isActive,
          function: u.function,
          email: u.email,
        } as const satisfies TUser)
    )
    return NextResponse.json(returnedUsers)
  } catch (error: any) {
    throw new Error(error)
  }
}
