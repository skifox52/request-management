import React from "react"

import { Button } from "@nextui-org/react"
import Spinner from "./Spinner"

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
  isLoading?: boolean
}

export default function ButtonUI({
  value,
  color,
  isDisabled,
  type,
  style,
  isLoading,
}: TButtonUI) {
  return (
    <Button
      isDisabled={isDisabled}
      variant="shadow"
      type={type}
      color={color}
      className={style}
    >
      {isLoading ? <Spinner /> : value}
    </Button>
  )
}
