"use client"
import { TloginSchema, loginSchema } from "@/app/zod/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Logo } from "../ui/Logo"
import InputUI from "../ui/InputUI"
import ButtonUI from "../ui/ButtonUI"

interface LoginFormProps {
  data: { username: string; isActive: boolean; role: string }[]
}

const LoginForm: React.FC<LoginFormProps> = ({ data: users }) => {
  const router = useRouter()
  const [focused, setFocused] = useState<boolean>(false)

  const [unauthorizedError, setUnauthoriezdError] = useState<string | null>(
    null
  )

  const {
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    watch,
  } = useForm<TloginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const { username, password } = watch()

  const login = async (data: TloginSchema) => {
    try {
      const res = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      })
      if (res?.status === 401 && !res.ok) {
        setTimeout(() => {
          setUnauthoriezdError("")
        }, 2500)
        return setUnauthoriezdError("Vérifier vos identifiants")
      }
      const [user] = users.filter((u) => u.username === data.username)
      if (!user.isActive)
        return toast.error(
          "Compte désactiver, merci de contacter votre administrateur"
        )
      if (user.role === "admin") {
        router.push("/dashboard")
      } else {
        router.push("/home")
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    setUnauthoriezdError("")
    if (!!username || !!password) setFocused(true)
  }, [username, password])
  return (
    <form
      onSubmit={handleSubmit(login)}
      className={`p-8 pt-3 transition-all duration-250 flex flex-col gap-4 border border-opacity-10 rounded-3xl mx-auto border-foreground max-w-md ${
        !focused && " shadow-lg shadow-content1 -translate-y-1"
      }`}
    >
      <Logo color="white" height={"16"} />
      <h1 className="text-3xl text-center text-secondary">Connexion</h1>
      {(Object.keys(errors).length > 0 || !!unauthorizedError) && (
        <div className="bg-red-500/30 border flex flex-col gap-1 font-semibold text-white/80 border-red-600 rounded-lg p-4 text-sm text-justify">
          <p>{errors.username?.message}</p>
          <p>{errors.password?.message}</p>
          <p>{unauthorizedError && unauthorizedError}</p>
        </div>
      )}
      <InputUI
        {...register("username")}
        variant="underlined"
        type="text"
        label="Nom d'utilisateur"
        size="lg"
        color="secondary"
        className="text-default-50"
      />
      <InputUI
        {...register("password")}
        variant="underlined"
        type="password"
        label="Mot de passe"
        size="lg"
        color="secondary"
        className="text-default-50"
      />

      <ButtonUI
        color="secondary"
        type="submit"
        value="Connexion"
        className="font-medium text-md mt-4 text-white"
        isLoading={isSubmitting}
        isDisabled={isSubmitting || !!Object.keys(errors).length || !isValid}
      />
    </form>
  )
}
export default LoginForm
