import React, { ForwardRefRenderFunction, RefObject } from "react"

import { Input } from "@nextui-org/react"

interface TInputUI {
  label: string
  type: string
  size: "sm" | "md" | "lg"
}

const InputUI: ForwardRefRenderFunction<
  RefObject<HTMLInputElement>,
  TInputUI
> = ({ label, type, size, ...props }, ref) => {
  return (
    <Input
      type={type}
      label={label}
      size={size}
      variant="underlined"
      color="secondary"
      ref={ref as React.RefObject<HTMLInputElement>}
      {...props}
    />
  )
}

export default React.forwardRef(InputUI)
