"use client"
import React from "react"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { Logo } from "./Logo"
import ButtonUI from "./ButtonUI"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function NavbarUI() {
  const { status, data } = useSession()
  const router = useRouter()
  const path = usePathname()
  const isAuthenticated: boolean = status === "authenticated"

  return (
    <Navbar
      shouldHideOnScroll
      className="bg-primary shadow-lg text-white z-[9999]"
      classNames={{
        item: [
          "data-[active=true]:text-secondary",
          "data-[active=true]:font-semibold",
        ],
      }}
    >
      <NavbarBrand className={`${!isAuthenticated && "flex justify-center"}`}>
        <Logo color="secondary" height={"16"} />
      </NavbarBrand>
      {data?.user.role === "user" && (
        <NavbarContent
          className="hidden sm:flex md:gap-8 lg:gap-12"
          justify="center"
        >
          <NavbarItem isActive={path === "/home"}>
            <Link color="foreground" href="/home">
              Accueil
            </Link>
          </NavbarItem>
          <NavbarItem isActive={path === "/home/equipement"}>
            <Link
              href="/home/equipement"
              color="foreground"
              aria-current="page"
            >
              Equipement
            </Link>
          </NavbarItem>
          <NavbarItem isActive={path === "/home/profil"}>
            <Link color="foreground" href="/home/profil">
              Profil
            </Link>
          </NavbarItem>
        </NavbarContent>
      )}
      {isAuthenticated && (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <ButtonUI
              value="Logout"
              color="warning"
              onClick={() =>
                signOut({ redirect: false }).then(() => router.push("/"))
              }
            />
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  )
}
