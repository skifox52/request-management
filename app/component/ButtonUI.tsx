import React from "react"

import { Button } from "@nextui-org/react"

interface TButtonUI {
  value: string
  color:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined
  isDisabled?: boolean
  type?: "button" | "submit" | "reset" | undefined
  style?: string
}

export default function ButtonUI({
  value,
  color,
  isDisabled,
  type,
  style,
}: TButtonUI) {
  return (
    <Button
      isDisabled={isDisabled}
      variant="solid"
      type={type}
      color={color}
      className={style}
    >
      {value}
    </Button>
  )
}
