import React from "react"

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react"
import { Logo } from "./Logo"

export default function NavbarUI() {
  return (
    <Navbar shouldHideOnScroll className="bg-primary shadow-lg text-white">
      <NavbarBrand>
        <Logo color="secondary" height={"16"} />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#" color="secondary">
            Login
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
