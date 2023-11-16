import { z } from "zod"

export const addEquipmentSchema = z.object({
  id_user: z
    .string()
    .min(1, "Champ obligatoire")
    .length(36, "Identifiant invalide"),
  id_equipement: z.string().min(1, "Champ obligatoire"),
  caracteristique: z.string().min(1, "Champ obligatoire"),
  date_fin_garantie: z.coerce.date(),
  date_sortie: z.coerce.date(),
  image: z.string().nullish(),
})

export type TaddEquipmentSchema = z.infer<typeof addEquipmentSchema>
