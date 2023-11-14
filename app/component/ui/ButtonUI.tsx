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
  variant?:
    | "shadow"
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "ghost"
    | undefined
  onClick?: () => void
}

export default function ButtonUI({
  value,
  color,
  isDisabled,
  type,
  className,
  isLoading,
  variant,
  onClick,
}: TButtonUI) {
  return (
    <Button
      isDisabled={isDisabled}
      variant={variant ?? "shadow"}
      type={type}
      color={color}
      className={className}
      onClick={onClick}
    >
      {isLoading ? <Spinner color="default" /> : value}
    </Button>
  )
}
