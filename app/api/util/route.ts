import { NextRequest, NextResponse } from "next/server"
import prismaClient from "@/app/utils/prismaClient"

export async function GET(req: NextRequest) {
  try {
    const departement = await prismaClient.departement.findMany({
      select: { id: true, dep_name: true },
    })
    const groupe = await prismaClient.groupe.findMany({
      select: { id: true, libelle: true },
    })
    return NextResponse.json({ departement, groupe })
  } catch (error: any) {
    throw new Error(error)
  }
}
