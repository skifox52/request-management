"use server"

import { hash } from "bcrypt"
import prismaClient from "../utils/prismaClient"

export const disableUser = async (id: string) => {
  try {
    await prismaClient.user.update({ where: { id }, data: { isActive: false } })
    return { success: true }
  } catch (error) {
    return {
      success: false,
      message: "Une erreur est survenue, veuillez réessayer ultérieurement",
    }
  }
}

export const enableUser = async (id: string) => {
  try {
    await prismaClient.user.update({ where: { id }, data: { isActive: true } })
    return { success: true }
  } catch (error) {
    return {
      success: false,
      message: "Une erreur est survenue, veuillez réessayer ultérieurement",
    }
  }
}

export const deleteUser = async (id: string) => {
  try {
    await prismaClient.user.delete({ where: { id } })
    return { success: true }
  } catch (error) {
    return {
      success: false,
      message: "Une erreur est survenue, veuillez réessayer ultérieurement",
    }
  }
}

export const updatePasswordById = async (id: string, password: string) => {
  try {
    await prismaClient.user.update({
      where: { id },
      data: { password: await hash(password, 12) },
    })
    return { success: true }
  } catch (error: any) {
    throw new Error(
      "Une erreur est survenue, veuillez réessayer ultérieurement"
    )
  }
}
