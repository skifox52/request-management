import prismaClient from "@/app/utils/prismaClient"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const users = await prismaClient.user.findMany({
      select: { id: true, firstname: true, lastname: true },
    })
    const equipement = await prismaClient.typeEquipement.findMany({
      select: { id: true, libelle: true },
    })
    return NextResponse.json({ users, equipement })
  } catch (error) {}
}
