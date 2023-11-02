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

export default function NavbarUI() {
  const session = useSession()
  const router = useRouter()
  const isAuthenticated: boolean = session.status === "authenticated"
  return (
    <Navbar
      shouldHideOnScroll
      className="bg-primary shadow-lg text-white z-[9999]"
    >
      <NavbarBrand className={`${!isAuthenticated && "flex justify-center"}`}>
        <Logo color="secondary" height={"16"} />
      </NavbarBrand>
      {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" color="foreground" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent> */}
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
