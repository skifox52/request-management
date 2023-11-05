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
  className?: string
  isLoading?: boolean
  onClick?: () => void
}

export default function ButtonUI({
  value,
  color,
  isDisabled,
  type,
  className,
  isLoading,
  onClick,
}: TButtonUI) {
  return (
    <Button
      isDisabled={isDisabled}
      variant="shadow"
      type={type}
      color={color}
      className={className}
      onClick={onClick}
    >
      {isLoading ? <Spinner /> : value}
    </Button>
  )
}
