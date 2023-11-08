"use client"
import { registerUserAction } from "@/app/actions/authActions"
import ButtonUI from "@/app/component/ButtonUI"
import InputUI from "@/app/component/InputUI"
import SelectUI from "@/app/component/SelectUI"
import ToastUI from "@/app/component/ToastUI"
import { registerSchema, TregisterSchema } from "@/app/zod/registerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"

interface pageProps {}

const AddUser: React.FC<pageProps> = ({}) => {
  const [success, setSuccess] = useState<boolean>(false)
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
        throw new Error(err)
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
      await registerUserAction(data)
      reset()
      formRef.current?.reset()

      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 5000)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(addUser)}
        className="grid lg:grid-cols-2 xl:grid-cols-3 text-black gap-6"
        ref={formRef}
      >
        <div>
          <InputUI
            {...register("lastname")}
            label="Nom"
            size="sm"
            type="text"
            variant="faded"
            color="primary"
            isInvalid={!!errors.lastname}
            errorMessage={errors.lastname?.message}
          />
        </div>
        <InputUI
          {...register("firstname")}
          label="Prénom"
          size="sm"
          type="text"
          variant="faded"
          color="primary"
          isInvalid={!!errors.firstname}
          errorMessage={errors.firstname?.message}
        />
        <InputUI
          {...register("phone")}
          label="Téléphone"
          size="sm"
          type="number"
          variant="faded"
          color="primary"
          isInvalid={!!errors.phone}
          errorMessage={errors.phone?.message}
        />
        <InputUI
          {...register("email")}
          label="Email"
          size="sm"
          type="email"
          variant="faded"
          color="primary"
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <InputUI
          {...register("username")}
          label="Nom d'utilisateur"
          size="sm"
          variant="faded"
          color="primary"
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
          variant="faded"
          color="primary"
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
          variant="faded"
          color="primary"
          size="sm"
          isInvalid={!!errors.id_group}
          errorMessage={errors.id_group?.message}
        />
        <InputUI
          {...register("office_num")}
          type="number"
          label="Numéro de bureau"
          variant="faded"
          color="primary"
          size="sm"
          isInvalid={!!errors.office_num}
          errorMessage={errors.office_num?.message}
        />
        <InputUI
          {...register("function")}
          label="Fonction"
          type="text"
          variant="faded"
          color="primary"
          size="sm"
          isInvalid={!!errors.function}
          errorMessage={errors.function?.message}
        />
        <SelectUI
          {...register("role")}
          selectLabel="Role"
          data={[
            { label: "Administrateur", value: "admin" },
            { label: "Utilisateur", value: "user" },
          ]}
          variant="faded"
          color="primary"
          size="sm"
          isInvalid={!!errors.role}
          errorMessage={errors.role?.message}
        />
        <InputUI
          {...register("password")}
          label="Mot de passe"
          size="sm"
          type="password"
          variant="faded"
          color="primary"
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
        />
        <InputUI
          {...register("confirmPassword")}
          label="Confirmer mot de passe"
          size="sm"
          type="password"
          variant="faded"
          color="primary"
          isInvalid={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
        />
        <div className="flex gap-6 w-full lg:col-span-2 xl:col-span-3">
          <ButtonUI
            color="primary"
            value="Réinitialiser"
            className="font-bold w-full lg:text-lg text-white"
            onClick={() => {
              reset()
              formRef.current?.reset()
            }}
          />
          <ButtonUI
            color="default"
            value="Ajouter"
            className="font-bold lg:text-lg w-full"
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
            type="submit"
          />
        </div>
      </form>
      {success && (
        <ToastUI title="Succès" body="Utilisateur ajouter avec succés" />
      )}
    </>
  )
}
export default AddUser
