import { z } from "zod"

export const addEquipmentSchema = z.object({
  id_user: z
    .string()
    .min(1, "Champ obligatoire")
    .length(36, "Identifiant invalide"),
  id_equipement: z.string().min(1, "Champ obligatoire"),
  caracteristique: z.string().min(1, "Champ obligatoire"),
  libelle: z.string().min(1, "Champ obligatoire"),
  numero_de_serie: z.coerce
    .string()
    .min(12, "Numéro de serie invalide")
    .max(12, "Numéro de serie invalide"),
  date_fin_garantie: z.coerce.date(),
  date_aquisition: z.coerce.date(),
  date_sortie: z.coerce.date(),
  image: z.string().nullish(),
})

export type TaddEquipmentSchema = z.infer<typeof addEquipmentSchema>
