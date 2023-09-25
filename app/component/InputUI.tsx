import React from "react"

import { Input } from "@nextui-org/react"

interface TInputUI {
  label: string
  type: string
  size: "sm" | "md" | "lg"
}

export default function InputUI({ label, type, size }: TInputUI) {
  return (
    <Input
      type={type}
      label={label}
      size={size}
      variant="underlined"
      color="secondary"
    />
  )
}
