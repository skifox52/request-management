import { NextRequest, NextResponse } from "next/server"
import prismaClient from "@/app/utils/prismaClient"
import { hash } from "bcrypt"
import { registerSchema } from "@/app/zod/registerSchema"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    if (!registerSchema.safeParse(data).success)
      throw new Error("Unprocessable entity")
    await prismaClient.user.create({
      data: {
        email: data.email,
        firstname: data.firstname,
        function: data.function,
        id_dep: data.id_dep,
        lastname: data.lastname,
        office_num: data.office_num,
        password: await hash(data.password, 12),
        phone: +data.phone,
        role: data.role,
        username: data.username,
        id_group: data.id_group,
      },
    })
    return new NextResponse(
      JSON.stringify({ message: "user addes successfully" }),
      { status: 201 }
    )
  } catch (error: any) {
    throw new Error(error)
  }
}
