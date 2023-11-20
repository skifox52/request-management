import { useEffect, useState } from "react"

export function useDdebounce(value: string, delay: number): string {
  const [debounceValue, setDebounceValue] = useState<string>(value)
  useEffect(() => {
    const timeoutValue = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
  }, [value, delay])
  return debounceValue
}
