"use server"
import prismaClient from "../utils/prismaClient"
import { TregisterSchema, registerSchema } from "../zod/registerSchema"

export const registerUserAction = async (formData: TregisterSchema) => {
  try {
    const parsedBody = registerSchema.safeParse(formData)
    if (!parsedBody.success) throw new Error("Unprocessable entity")
    const { data } = parsedBody
    await prismaClient.user.create({
      data: {
        email: data.email,
        firstname: data.firstname,
        function: data.function,
        lastname: data.lastname,
        office_num: data.office_num,
        password: data.password,
        phone: +data.phone,
        role: data.role,
        username: data.username,
        id_dep: data.id_dep,
        id_group: data.id_group,
      },
    })
    console.log("user added successfully")
  } catch (error: any) {
    console.error("Error adding user")
    throw new Error(error.message ?? error)
  }
}
