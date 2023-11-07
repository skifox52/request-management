import React from "react"
import { Spinner as SpinnerComponent } from "@nextui-org/react"

export default function Spinner({
  color,
}: {
  color:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "current"
    | "white"
    | "default"
    | undefined
}) {
  return <SpinnerComponent color={color} />
}
