import React, { ForwardRefRenderFunction, RefObject } from "react"

import { Input } from "@nextui-org/react"

interface TInputUI {
  label: string
  type: string
  size: "sm" | "md" | "lg"
  className?: string
  isInvalid?: boolean
  isDisabled?: boolean
  errorMessage?: string
  startContent?: string
  value?: string
  variant: "flat" | "bordered" | "underlined" | "faded"
  color:
    | "secondary"
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | undefined
}

const InputUI: ForwardRefRenderFunction<
  RefObject<HTMLInputElement>,
  TInputUI
> = (
  {
    label,
    type,
    size,
    variant,
    color,
    className,
    errorMessage,
    isInvalid,
    startContent,
    isDisabled,
    value,
    ...props
  },
  ref
) => {
  return (
    <Input
      type={type}
      label={label}
      size={size}
      variant={variant}
      color={color}
      className={className}
      ref={ref as React.RefObject<HTMLInputElement>}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      startContent={startContent}
      value={value}
      isDisabled={isDisabled}
      {...props}
    />
  )
}

export default React.forwardRef(InputUI)
