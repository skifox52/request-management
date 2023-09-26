import { z } from "zod"

export const loginSchema = z.object({
  username: z.string(),
  password: z
    .string()
    .min(8, "Mot de passe doit contenir au moins 8 caractère"),
})

export type TloginSchema = z.infer<typeof loginSchema>
