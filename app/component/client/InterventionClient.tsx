"use client"
import React from "react"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from "@nextui-org/react"
import { TInterventionClient } from "@/app/home/demandeIntervention/page"

const columns = [
  { name: "NUMERO DE RECLAMATION", uid: "num_rec" },
  { name: "MATERIEL", uid: "modele" },
  { name: "NUMERO DE SERIE", uid: "num_serie" },
  { name: "STATUT", uid: "status" },
  { name: "DATE DE RECLAMATION", uid: "date_req" },
]

type User = TInterventionClient

export default function InterventionClient({
  interventions,
}: {
  interventions: TInterventionClient[]
}) {
  const renderCell = React.useCallback(
    (eq: TInterventionClient, columnKey: React.Key) => {
      const cellValue = eq[columnKey as keyof TInterventionClient]
      switch (columnKey) {
        case "modele":
          return (
            <div className="flex flex-col items-start gap-2">
              {eq.equipement.map((e) => (
                <User
                  key={e.id}
                  avatarProps={{
                    radius: "lg",
                    src:
                      e.image !== "/placeholder-wire-image-dark.png"
                        ? JSON.parse(e.image)["thumbnailUrl"]
                        : e.image,
                  }}
                  description={e.caracteristique}
                  name={e.libelle}
                >
                  {e.libelle}
                </User>
              ))}
            </div>
          )

        case "num_serie":
          return eq.equipement.map((e) => (
            <div key={e.id} className="relative flex items-center gap-2">
              {e.numero_de_serie}
            </div>
          ))

        case "date_req":
          return (
            <div className="relative flex items-center gap-3">
              {eq.date_demande.toISOString().slice(0, 10)}{" "}
              <span className="text-xs text-default-50">
                {eq.date_demande.toISOString().slice(11, 16)}{" "}
              </span>
            </div>
          )

        case "status":
          return (
            <div
              className={`relative flex items-center gap-2 ${
                eq.status === "EN_ATTENTE"
                  ? "text-white"
                  : eq.status === "EN_COURS"
                  ? "text-secondary"
                  : eq.status === "TERMINER"
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              {eq.status === "EN_ATTENTE"
                ? "En attente"
                : eq.status === "EN_COURS"
                ? "En cours"
                : eq.status === "TERMINER"
                ? "Terminer"
                : "Rejeté"}
            </div>
          )

        case "num_rec":
          return <div className="relative flex items-center gap-2">{eq.id}</div>

        default:
          return cellValue
      }
    },
    []
  )

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            className="bg-primary"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent="Aucun reclamation trouvé" items={interventions}>
        {(item) => (
          <TableRow
            key={item.id}
            className="border-b border-default/75 py-3 last-of-type:border-b-0"
          >
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey) as React.ReactNode}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
