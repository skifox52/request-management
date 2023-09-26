import { type TresigterSchema } from "../zod/registerSchema"

export interface UserT extends TresigterSchema {
  id?: string
}
