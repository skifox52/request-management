import prismaClient from "@/app/utils/prismaClient"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const {
    params: { id },
  } = context
  const user = await prismaClient.user.findFirst({
    where: { id },
    select: { role: true, isActive: true },
  })
  return NextResponse.json(user)
}
