"use client"

import { useForm } from "react-hook-form"
import ButtonUI from "./component/ButtonUI"
import InputUI from "./component/InputUI"
import { Logo } from "./component/Logo"
import { zodResolver } from "@hookform/resolvers/zod"
import { type TloginSchema, loginSchema } from "./zod/loginSchema"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const {
    register,
    formState: { isLoading, errors },
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
      console.log("resulttttt", res)
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
        />
      </form>
    </div>
  )
}
