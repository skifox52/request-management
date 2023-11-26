"use client"
import { changeInterventionStatus } from "@/app/actions/demandeActions"
import { TClaims } from "@/app/dashboard/allReclamations/page"
import { useDebounce } from "@/app/utils/useDebounce"
import {
  Accordion,
  AccordionItem,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react"
import { InterventionStatus } from "@prisma/client"
import React from "react"
import toast from "react-hot-toast"

interface ReclamationDashboardProps {
  claims: TClaims[]
}

const ReclamationDashboard: React.FC<ReclamationDashboardProps> = ({
  claims,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleDemandeStatus = async (
    id: string,
    status: InterventionStatus
  ) => {
    try {
      setLoading(true)
      await changeInterventionStatus(status, id)
      setLoading(false)
      toast.success("Status changer avec succès")
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  const filters = React.useMemo(() => {
    return [
      { key: 1, value: "Nom" },
      { key: 2, value: "Status" },
      { key: 3, value: "Date" },
    ]
  }, [])
  const [sortValue, setSortValue] = React.useState<number>(3)
  const [searchValue, setSearchValue] = React.useState<string>("")
  const debounceValue = useDebounce(searchValue, 400)
  return (
    <div>
      <div className="w-full lg:w-2/3 xl:w-1/2 flex gap-3 ml-auto mb-12">
        <Select
          label="Filtrer"
          defaultSelectedKeys={"3"}
          variant="bordered"
          color="default"
          onChange={(e) => setSortValue(Number(e.target.value) as number)}
          size="sm"
        >
          {filters.map((f) => (
            <SelectItem key={f.key} value={f.value} defaultValue={f.value}>
              {f.value}
            </SelectItem>
          ))}
        </Select>
        <Input
          variant="bordered"
          label="Rechercher un utilisateur"
          color="default"
          size="sm"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="text-white"
        />
      </div>
      {claims.length > 0 ? (
        <Accordion variant="light">
          {claims
            .sort((a, b) => {
              if (sortValue === 3) {
                if (a.date_demande < b.date_demande) {
                  return 1
                } else {
                  return -1
                }
              } else if (sortValue === 1) {
                if (a.personne.lastname < b.personne.lastname) {
                  return -1
                } else {
                  return 1
                }
              } else {
                if (a.status < b.status) {
                  return -1
                } else {
                  return 1
                }
              }
            })
            .filter((c) =>
              (
                c.personne.lastname.toLowerCase() +
                c.personne.firstname.toLowerCase()
              )
                .trim()
                .includes(
                  debounceValue.trim().replace(/\s+/g, "").toLowerCase()
                )
            )
            .map((c, i) => (
              <AccordionItem
                className="border-b border-white/20 last-of-type:border-b-0"
                key={c.id}
                aria-label={"Accordion " + i + 1}
                title={
                  <div className="grid grid-cols-3 items-center">
                    <h1 className="text-white tracking-tight font-semibold">
                      {c.personne.lastname.slice(0, 1).toUpperCase() +
                        c.personne.lastname.slice(1) +
                        " " +
                        c.personne.firstname}
                    </h1>
                    <span
                      className={`font-semibold uppercase tracking-tight text-center ${
                        c.status === "EN_ATTENTE"
                          ? "text-secondary"
                          : c.status === "EN_COURS"
                          ? "text-blue-500"
                          : c.status === "TERMINER"
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      {c.status === "EN_ATTENTE"
                        ? "En attente"
                        : c.status === "EN_COURS"
                        ? "En cours"
                        : c.status === "TERMINER"
                        ? "Terminer"
                        : "Rejeté"}
                    </span>
                    <span className="flex gap-2 text-sm items-center ml-auto">
                      {c.date_demande.toISOString().substring(0, 10)}
                      <span className="text-xs opacity-50">
                        {c.date_demande.toISOString().substring(11, 16)}
                      </span>
                    </span>
                  </div>
                }
              >
                <div className="flex flex-col gap-8 p-3">
                  <div className="flex flex-col">
                    <h2 className="font-semibold tracking-tight text-lg text-secondary/90">
                      Numéro de réclamation
                    </h2>
                    <p className="text-sm">{c.id}</p>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="font-semibold tracking-tight text-lg text-secondary/90">
                      Nom d&apos;utilisateur
                    </h2>
                    <p className="text-sm">{c.personne.username}</p>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="font-semibold tracking-tight text-lg text-secondary/90">
                      Numéro de bureau
                    </h2>
                    <p className="text-sm">{c.personne.office_num}</p>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="font-semibold tracking-tight text-lg text-secondary/90">
                      Équipements concerné
                    </h2>
                    <div className="text-sm grid grid-cols-3">
                      {c.equipement.map((e) => (
                        <div
                          key={e.id}
                          className="px-4 py-2 flex flex-col gap-3"
                        >
                          <div className="flex flex-col">
                            <h2 className="font-medium tracking-tight text-lg text-white">
                              Modèle
                            </h2>
                            <p className="text-sm">{e.libelle}</p>
                          </div>
                          <div className="flex flex-col">
                            <h2 className="font-medium tracking-tight text-lg text-white">
                              Numéro de serie
                            </h2>
                            <p className="text-sm">{e.numero_de_serie}</p>
                          </div>
                          <div className="flex flex-col">
                            <h2 className="font-medium tracking-tight text-lg text-white">
                              Date fin de garantie
                            </h2>
                            <p className="text-sm">
                              {e.date_fin_garantie
                                .toISOString()
                                .substring(0, 10)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-4 w-1/3 p-3 ml-auto">
                  {c.status &&
                    !(c.status === "TERMINER" || c.status === "REJETER") && (
                      <React.Fragment>
                        {" "}
                        <Button
                          variant="ghost"
                          color="danger"
                          className="flex-grow"
                          onClick={() => handleDemandeStatus(c.id, "REJETER")}
                        >
                          Rejeter
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            c.status === "EN_ATTENTE"
                              ? handleDemandeStatus(c.id, "EN_COURS")
                              : handleDemandeStatus(c.id, "TERMINER")
                          }}
                          color={
                            c.status === "EN_COURS" ? "success" : "default"
                          }
                          className="flex-grow"
                        >
                          {c.status === "EN_ATTENTE" ? "Traiter" : "Terminer"}
                        </Button>
                      </React.Fragment>
                    )}
                </div>
              </AccordionItem>
            ))}
        </Accordion>
      ) : (
        <h1 className="text-center">Aucune réclamation en cours...</h1>
      )}
    </div>
  )
}
export default ReclamationDashboard
