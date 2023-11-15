"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import InputUI from "../ui/InputUI"
import SelectUI from "../ui/SelectUI"
import { FileUpdate } from "../ui/FileUpdate"
import ButtonUI from "../ui/ButtonUI"
import {
  TaddEquipmentSchema,
  addEquipmentSchema,
} from "@/app/zod/addEquipmentSchema"
import { addEquipmentAction } from "@/app/actions/equipmentActions"

interface AddEquipmentFormProps {}

const AddEquipmentForm: React.FC<AddEquipmentFormProps> = ({}) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [formIntialData, setFormInitialData] = useState<{
    equipement: { id: string; libelle: string }[]
    users: { id: string; firstname: string; lastname: string }[]
  } | null>(null)

  useEffect(() => {
    fetch("/api/equipUtil")
      .then((response) => response.json())
      .then((data) => setFormInitialData(data))
      .catch((err) => {
        toast.error("Une erreur est survenue, veuillez réessayer")
      })
  }, [])
  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<TaddEquipmentSchema>({
    resolver: zodResolver(addEquipmentSchema),
  })

  const addUser = async (data: TaddEquipmentSchema) => {
    try {
      const response = await addEquipmentAction(data)
      reset()
      formRef.current?.reset()
      toast.success("Utilisateur ajouter avec succès")
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(addUser)}
        className="flex mx-auto bg-content1 rounded-lg border border-default p-8 shadow-lg shadow-primary flex-col max-w-xl text-black gap-6"
        ref={formRef}
      >
        <InputUI
          {...register("caracteristique")}
          label="Caractéristiques"
          size="sm"
          type="text"
          variant="faded"
          className="text-black"
          color="primary"
          isInvalid={!!errors.caracteristique}
          errorMessage={errors.caracteristique?.message}
        />
        <InputUI
          {...register("date_sortie")}
          label=""
          size="lg"
          type="date"
          variant="faded"
          className="text-black relative before:content-['Date-de-sortie'] before:right-12 before:top-6 before:-translate-y-1/2 before:absolute before:z-50  before:block"
          color="primary"
          isInvalid={!!errors.date_sortie}
          errorMessage={errors.date_sortie?.message}
        />
        <InputUI
          {...register("id_equipement")}
          label="Numéro de serie"
          size="sm"
          variant="faded"
          className="text-black"
          color="primary"
          type="text"
          isInvalid={!!errors.id_equipement}
          errorMessage={errors.id_equipement?.message}
        />
        <SelectUI
          {...register("id_equipement")}
          selectLabel="Equipement"
          data={
            formIntialData
              ? formIntialData?.equipement?.map((d) => ({
                  value: d.id,
                  label: d.libelle,
                }))
              : []
          }
          variant="faded"
          className="text-black"
          color="primary"
          size="sm"
          isInvalid={!!errors.id_equipement}
          errorMessage={errors.id_equipement?.message}
        />
        <SelectUI
          {...register("id_user")}
          selectLabel="Utilisateur"
          data={
            formIntialData
              ? formIntialData?.users?.map((d) => ({
                  value: d.id,
                  label: d.lastname + " " + d.firstname,
                }))
              : []
          }
          variant="faded"
          className="text-black"
          color="primary"
          size="sm"
          isInvalid={!!errors.id_user}
          errorMessage={errors.id_user?.message}
        />
        <div className="col-span-3">
          <FileUpdate />
        </div>
        <div className="flex gap-6 w-full lg:col-span-2 xl:col-span-3">
          <ButtonUI
            color="primary"
            value="Réinitialiser"
            className="font-bold w-full lg:text-lg text-white"
            onClick={() => {
              formRef.current?.reset()
              reset()
            }}
          />
          <ButtonUI
            color="default"
            value="Affecter"
            className="font-bold lg:text-lg w-full text-white"
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
            type="submit"
          />
        </div>
      </form>
    </>
  )
}
export default AddEquipmentForm
