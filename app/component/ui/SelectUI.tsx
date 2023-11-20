"use client"
import React, { ForwardRefRenderFunction, RefObject, useEffect } from "react"
import { Select, SelectItem } from "@nextui-org/react"

interface TSelect {
  data: { value: string | number; label: string }[]
  selectLabel?: string
  className?: string
  isInvalid?: boolean
  errorMessage?: string
  startContent?: any
  variant: "flat" | "bordered" | "underlined" | "faded"
  size: "sm" | "md" | "lg"
  color:
    | "secondary"
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | undefined
}

const SelectUI: ForwardRefRenderFunction<
  RefObject<HTMLSelectElement>,
  TSelect
> = (
  {
    selectLabel,
    data,
    className,
    variant,
    color,
    size,
    isInvalid,
    errorMessage,
    startContent,
    ...props
  },
  ref
) => {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        label={selectLabel}
        className={className}
        color={color}
        variant={variant}
        size={size}
        startContent={startContent}
        ref={ref as React.RefObject<HTMLSelectElement>}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        {...props}
      >
        {data.map((d) => (
          <SelectItem key={d.value} value={d.value}>
            {d.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}
export default React.forwardRef(SelectUI)
