"use client"
import { TloginSchema, loginSchema } from "@/app/zod/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
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
        return toast.error("Vérifier vos identifiants")
      }
      const [user] = users.filter((u) => u.username === data.username)
      if (!user.isActive)
        return toast.error(
          "Compte désactiver, merci de contacter votre administrateur"
        )
      if (user.role === "admin") {
        router.replace("/dashboard")
      } else {
        router.replace("/home")
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(login)}
      className={`p-8 pt-3 flex flex-col gap-4 border rounded-3xl mx-auto border-default/50 shadow-2xl shadow-black/70 max-w-md`}
    >
      <Logo color="white" height={"16"} />
      <h1 className="text-3xl text-center text-secondary">Connexion</h1>

      <InputUI
        {...register("username")}
        variant="underlined"
        type="text"
        label="Nom d'utilisateur"
        size="lg"
        color="secondary"
        className="text-default-50"
        isDisabled={isSubmitting}
      />
      <InputUI
        {...register("password")}
        variant="underlined"
        type="password"
        label="Mot de passe"
        size="lg"
        color="secondary"
        className="text-default-50"
        isDisabled={isSubmitting}
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
