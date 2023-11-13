"use server"
import prismaClient from "../utils/prismaClient"
import { TregisterSchema, registerSchema } from "../zod/registerSchema"
import { hash } from "bcrypt"

export const registerUserAction = async (formData: TregisterSchema) => {
  try {
    const parsedBody = registerSchema.safeParse(formData)
    if (!parsedBody.success) throw new Error("Unprocessable entity")
    const { data } = parsedBody
    const usernameExist = await prismaClient.user.findFirst({
      where: { OR: [{ username: data.username }, { email: data.email }] },
    })
    if (!!usernameExist) throw new Error("L'utilisateur existe déjà")
    await prismaClient.user.create({
      data: {
        email: data.email,
        firstname: data.firstname,
        function: data.function,
        lastname: data.lastname,
        office_num: data.office_num,
        password: await hash(data.password, 12),
        phone: +data.phone,
        role: data.role,
        username: data.username,
        id_dep: data.id_dep,
        id_group: data.id_group,
      },
    })
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error?.message }
  }
}

export const fetchUser = async () => {
  return await prismaClient.user.findMany({
    select: { username: true, role: true, isActive: true },
  })
}
