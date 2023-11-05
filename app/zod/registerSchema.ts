import { z } from "zod"

const phoneRegex = new RegExp(/^(00213|\+213|0)(5|6|7)[0-9]{8}$/)

export const registerSchema = z
  .object({
    id_dep: z.string().min(1, "Champ obligatoire"),
    id_group: z.string().min(1, "Champ obligatoire"),
    firstname: z.string().min(1, "Champ obligatoire"),
    lastname: z.string().min(1, "Champ obligatoire"),
    phone: z.string().regex(phoneRegex, "Numéro invalid"),
    email: z.string().email(),
    username: z.string().min(1, "Champ obligatoire"),
    password: z
      .string()
      .min(8, "Mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string(),
    office_num: z.coerce.number().min(1, "Champ obligatoire"),
    function: z.string().min(1, "Champ obligatoire"),
    role: z.enum(["admin", "user"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Vérifiez vos mot de passes",
    path: ["confirmPassword"],
  })

export type TresigterSchema = z.infer<typeof registerSchema>
