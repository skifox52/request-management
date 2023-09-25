"use client"

import ButtonUI from "./component/ButtonUI"
import InputUI from "./component/InputUI"
import Image from "next/image"
import { Logo } from "./component/Logo"

export default function Home() {
  return (
    <div>
      <h1 className="text-center mt-12 mb-16 text-5xl font-thin">
        Gestionnaire des réquètes
      </h1>
      <form className="p-8 flex flex-col gap-4 border border-opacity-50 rounded-xl mx-auto shadow-xl shadow-gray-800 border-foreground max-w-md">
        <Logo color="white" height={"20"} />
        <InputUI type="text" label="Nom d'utilisateur" size="lg" />
        <InputUI type="password" label="Mot de passe" size="lg" />
        <ButtonUI
          color="secondary"
          type="submit"
          value="Login"
          style="font-bold mt-4"
        />
      </form>
    </div>
  )
}
