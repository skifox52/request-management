import { PrismaClient } from "@prisma/client"

const prismaClient = new PrismaClient()

process.on("beforeExit", async () => {
  await prismaClient.$disconnect()
})

export default prismaClient
