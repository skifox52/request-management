"use client"
import "./globals.css"
import { Ubuntu } from "next/font/google"
import { NextUIProvider } from "@nextui-org/react"
import NavbarUI from "./component/NavbarUI"
import { SessionProvider } from "next-auth/react"

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ubuntu.className + " bg-primary"}>
        <NextUIProvider>
          <SessionProvider>
            <NavbarUI />
            <main className="max-w-7xl mx-auto py-8 text-foreground">
              {children}
            </main>
          </SessionProvider>
        </NextUIProvider>
      </body>
    </html>
  )
}
