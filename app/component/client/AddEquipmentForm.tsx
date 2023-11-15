"use client"
import { registerUserAction } from "@/app/actions/authActions"
import { TregisterSchema, registerSchema } from "@/app/zod/registerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import InputUI from "../ui/InputUI"
import SelectUI from "../ui/SelectUI"
import { FileUpdate } from "../ui/FileUpdate"
import ButtonUI from "../ui/ButtonUI"

interface AddEquipmentFormProps {}

const AddEquipmentForm: React.FC<AddEquipmentFormProps> = ({}) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [formIntialData, setFormInitialData] = useState<{
    departement: { id: string; dep_name: string }[]
    groupe: { id: string; libelle: string }[]
  } | null>(null)

  useEffect(() => {
    fetch("/api/util")
      .then((response) => response.json())
      .then((data) => setFormInitialData(data))
      .catch((err) => {
        toast.error(err.message)
      })
  }, [])

  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<TregisterSchema>({
    resolver: zodResolver(registerSchema),
  })

  const addUser = async (data: TregisterSchema) => {
    try {
      const response = await registerUserAction(data)
      if (!response?.success) return toast.error(response?.error)
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
        <div>
          <InputUI
            {...register("lastname")}
            label="Nom"
            size="sm"
            type="text"
            variant="underlined"
            className="text-white"
            color="default"
            isInvalid={!!errors.lastname}
            errorMessage={errors.lastname?.message}
          />
        </div>
        <InputUI
          {...register("firstname")}
          label="Prénom"
          size="sm"
          type="text"
          variant="underlined"
          className="text-white"
          color="default"
          isInvalid={!!errors.firstname}
          errorMessage={errors.firstname?.message}
        />
        <InputUI
          {...register("phone")}
          label="Téléphone"
          size="sm"
          type="number"
          variant="underlined"
          className="text-white"
          color="default"
          startContent="+213"
          isInvalid={!!errors.phone}
          errorMessage={errors.phone?.message}
        />
        <InputUI
          {...register("email")}
          label="Email"
          size="sm"
          type="email"
          variant="underlined"
          className="text-white"
          color="default"
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <InputUI
          {...register("username")}
          label="Nom d'utilisateur"
          size="sm"
          variant="underlined"
          className="text-white"
          color="default"
          type="text"
          isInvalid={!!errors.username}
          errorMessage={errors.username?.message}
        />
        <SelectUI
          {...register("id_dep")}
          selectLabel="Département"
          data={
            formIntialData
              ? formIntialData?.departement?.map((d) => ({
                  value: d.id,
                  label: d.dep_name,
                }))
              : []
          }
          variant="underlined"
          className="text-white"
          color="default"
          size="sm"
          isInvalid={!!errors.id_dep}
          errorMessage={errors.id_dep?.message}
        />
        <SelectUI
          {...register("id_group")}
          selectLabel="Groupe"
          data={
            formIntialData
              ? formIntialData?.groupe?.map((d) => ({
                  value: d.id,
                  label: d.libelle,
                }))
              : []
          }
          variant="underlined"
          className="text-white"
          color="default"
          size="sm"
          isInvalid={!!errors.id_group}
          errorMessage={errors.id_group?.message}
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
