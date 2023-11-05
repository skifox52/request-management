"use client"
import "./globals.css"
import { Montserrat } from "next/font/google"
import { NextUIProvider } from "@nextui-org/react"
import NavbarUI from "./component/NavbarUI"
import { SessionProvider } from "next-auth/react"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className + " bg-primary"}>
        <NextUIProvider>
          <SessionProvider>
            <NavbarUI />
            <main className="mx-auto py-8 container text-foreground">
              {children}
            </main>
          </SessionProvider>
        </NextUIProvider>
      </body>
    </html>
  )
}
