"use client"
import React from "react"
import { EquipmentCard } from "./EquipmentCard"
import { TEquipment } from "@/app/dashboard/allEquipments/page"
import InputUI from "../ui/InputUI"
import { Search } from "lucide-react"
import { useDdebounce } from "@/app/utils/useDebounce"

interface EquipmentPageProps {
  equipments: TEquipment[]
}

const EquipmentPage: React.FC<EquipmentPageProps> = ({ equipments }) => {
  const [searchValue, setSearchValue] = React.useState<string>("")
  const [filteredEquipment, setFilteredEquipment] = React.useState<
    TEquipment[] | []
  >(equipments)
  const debounceValue = useDdebounce(searchValue, 400)
  React.useEffect(() => {
    setFilteredEquipment((prev) => {
      if (debounceValue === "") return equipments
      return equipments.filter(
        (e) =>
          e.user.firstname
            .toLowerCase()
            .includes(debounceValue.toLocaleLowerCase()) ||
          e.user.lastname
            .toLowerCase()
            .includes(debounceValue.toLocaleLowerCase()) ||
          e.libelle.toLowerCase().includes(debounceValue.toLocaleLowerCase()) ||
          e.typeEquipement.libelle
            .toLowerCase()
            .includes(debounceValue.toLocaleLowerCase())
      )
    })
  }, [debounceValue, equipments])
  return (
    <div className="flex flex-col gap-12">
      <div className="w-full lg:w-1/2 xl:w-1/3 ml-auto flex gap-2">
        <InputUI
          color="default"
          size="sm"
          type="search"
          variant="underlined"
          className="text-white/80"
          placeholder="Rechercher..."
          value={searchValue}
          startContent={<Search />}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEquipment.map((eq) => (
          <EquipmentCard key={eq.id} equipment={eq} />
        ))}
      </div>
    </div>
  )
}
export default EquipmentPage
