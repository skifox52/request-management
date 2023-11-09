"use client"
import React from "react"

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  console.log("aywaah", error)
  return <h1>hello error</h1>
}
export default error
