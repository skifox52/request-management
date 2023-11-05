"use client"
import ButtonUI from "@/app/component/ButtonUI"
import InputUI from "@/app/component/InputUI"
import SelectUI from "@/app/component/SelectUI"
import { registerSchema, TresigterSchema } from "@/app/zod/registerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useRef } from "react"
import { useForm } from "react-hook-form"

interface pageProps {}

const AddUser: React.FC<pageProps> = ({}) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<TresigterSchema>({
    resolver: zodResolver(registerSchema),
  })
  const addUser = async (data: TresigterSchema) => {
    const response = await fetch("/api/users/add", {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log(await response.json())
  }
  return (
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
        data={[{ label: "test", value: 1 }]}
        variant="faded"
        color="primary"
        size="sm"
        isInvalid={!!errors.id_dep}
        errorMessage={errors.id_dep?.message}
      />
      <SelectUI
        {...register("id_group")}
        selectLabel="Groupe"
        data={[{ label: "test", value: 1 }]}
        variant="faded"
        color="primary"
        size="sm"
        isInvalid={!!errors.id_group}
        errorMessage={errors.id_group?.message}
      />
      <SelectUI
        {...register("office_num")}
        selectLabel="Numéro de bureau"
        data={[{ label: "test", value: 1 }]}
        variant="faded"
        color="primary"
        size="sm"
        isInvalid={!!errors.office_num}
        errorMessage={errors.office_num?.message}
      />
      <SelectUI
        {...register("function")}
        selectLabel="Fonction"
        data={[{ label: "test", value: 1 }]}
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
  )
}
export default AddUser
