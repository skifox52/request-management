import { z } from "zod"

export const registerSchema = z
  .object({
    id_dep: z.string(),
    id_group: z.string().nullable(),
    firstname: z.string(),
    lastname: z.string(),
    phone: z.number(),
    email: z.string().email(),
    username: z.string(),
    password: z
      .string()
      .min(8, "Mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string(),
    office_num: z.number(),
    function: z.string(),
    role: z.enum(["admin", "user"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Vérifiez vos mot de passes",
    path: ["confirmPassword"],
  })

export type TresigterSchema = z.infer<typeof registerSchema>
