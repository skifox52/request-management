"use client"
import { TClaims } from "@/app/dashboard/allReclamations/page"
import { Accordion, AccordionItem } from "@nextui-org/react"
import React from "react"

interface ReclamationDashboardProps {
  claims: TClaims[]
}

const ReclamationDashboard: React.FC<ReclamationDashboardProps> = ({
  claims,
}) => {
  return (
    <Accordion variant="splitted">
      {!!claims &&
        claims.map((c, i) => (
          <AccordionItem
            key={c.id}
            aria-label={"Accordion " + i + 1}
            title={<div>{c.id_equipement}</div>}
          >
            test
          </AccordionItem>
        ))}
    </Accordion>
  )
}
export default ReclamationDashboard
