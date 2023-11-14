"use client"

import { Button } from "@nextui-org/react"
import { RotateCcw } from "lucide-react"
import React from "react"

interface errorProps {
  error: Error
  reset: () => void
}

const error: React.FC<errorProps> = ({ error, reset }) => {
  return (
    <div className="mt-32">
      <h1 className=" text-danger text-4xl font-bold text-justify">
        Une erreur est survenue
      </h1>
      <h2 className="mt-2 text-lg"> merci de contacter votre administrateur</h2>
      <Button
        variant="ghost"
        size="lg"
        className="flex items-center text-xl mt-32 gap-4"
        onClick={reset}
      >
        Réessayer
        <RotateCcw />
      </Button>
    </div>
  )
}
export default error
