"use client"

import { useForm } from "react-hook-form"
import ButtonUI from "./component/ButtonUI"
import InputUI from "./component/InputUI"
import { Logo } from "./component/Logo"
import { zodResolver } from "@hookform/resolvers/zod"
import { type TloginSchema, loginSchema } from "./zod/loginSchema"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Home() {
  const [unauthorizedError, setUnauthoriezdError] = useState<string | null>(
    null
  )
  const router = useRouter()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<TloginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: TloginSchema) => {
    try {
      const res = await signIn("credentials", {
        username: data.username,
        passowrd: data.password,
        redirect: false,
      })
      console.log(res)
      if (res?.status === 401 && !res.ok)
        return setUnauthoriezdError("Vérifiez vos identifiants")
      router.push("/dashboard")
    } catch (error: any) {
      throw new Error(error)
    }
  }
  return (
    <div>
      <h1 className="text-center mt-12 mb-16 text-5xl font-thin">
        Gestionnaire des réquètes
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 pt-3 flex flex-col gap-4 border border-opacity-50 rounded-3xl mx-auto border-foreground max-w-md"
      >
        <Logo color="white" height={"16"} />
        <h1 className="text-3xl text-center text-secondary">Connexion</h1>
        {(Object.keys(errors).length > 0 || !!unauthorizedError) && (
          <div className="bg-red-500/30 border border-red-600 rounded-lg p-4 text-sm text-justify">
            {errors.username?.message}
            {errors.password?.message}
            {unauthorizedError}
          </div>
        )}
        <InputUI
          {...register("username")}
          type="text"
          label="Nom d'utilisateur"
          size="lg"
        />
        <InputUI
          {...register("password")}
          type="password"
          label="Mot de passe"
          size="lg"
        />

        <ButtonUI
          color="secondary"
          type="submit"
          value="Connexion"
          style="font-medium text-md mt-4"
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
        />
      </form>
    </div>
  )
}
