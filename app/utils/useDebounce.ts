import { useEffect, useState } from "react"

export function useDebounce(value: string, delay: number): string {
  const [debounceValue, setDebounceValue] = useState<string>(value)
  useEffect(() => {
    const timeoutValue = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(timeoutValue)
    }
  }, [value, delay])
  return debounceValue
}
