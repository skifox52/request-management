import { NextRequest, NextResponse } from "next/server"
import { type TresigterSchema, registerSchema } from "@/app/zod/registerSchema"
import { PrismaClient, User } from "@prisma/client"
import { hash } from "bcrypt"

const client = new PrismaClient()

export async function POST(request: NextRequest) {
  const parsedBody = registerSchema.safeParse(await request.json())
  if (!parsedBody.success) {
    return NextResponse.json({
      error: "Validation failed",
      details: parsedBody.error.errors,
    })
  } else {
    const user: TresigterSchema = parsedBody.data
    const newUser: User = await client.user.create({
      data: {
        email: user.email,
        firstname: user.firstname,
        function: user.function,
        id_dep: user.id_dep,
        lastname: user.lastname,
        office_num: user.office_num,
        password: await hash(user.password, 12),
        phone: user.phone,
        role: user.role,
        username: user.username,
        id_group: user.id_group,
      },
    })
    return NextResponse.json(
      { response: "User created successfully", newUser },
      { status: 200 }
    )
  }
}
