import { z } from "zod"

export const addEquipmentSchema = z.object({
  id_user: z
    .string()
    .min(1, "Champ obligatoire")
    .length(36, "Identifiant invalide"),
  id_equipement: z.string().min(1, "Champ obligatoire"),
  caracteristique: z.string().min(1, "Champ obligatoire"),
  date_fin_garantie: z.date(),
  date_sortie: z.date(),
  image: z.string().nullable(),
})

export type TaddEquipmentSchema = z.infer<typeof addEquipmentSchema>
