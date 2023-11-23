import { z } from "zod"

export const demandeInterventionFormSchema = z.object({
  motif_demande: z
    .string()
    .min(6, "Le motif doit contenir au moins 6 caractères.")
    .max(191, "Trop long, veuillez réduire la taille de votre text"),
})

export type TDemandeInterventionFormSchema = z.infer<
  typeof demandeInterventionFormSchema
>
export type TDemandeIntervention = TDemandeInterventionFormSchema & {
  id_user: string
}
