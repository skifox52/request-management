"use client"
import "./globals.css"
import { Oswald } from "next/font/google"
import { NextUIProvider } from "@nextui-org/react"
import NavbarUI from "./component/ui/NavbarUI"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "300", "700", "200", "600"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={oswald.style + " bg-[#101419]"}>
        <NextUIProvider>
          <SessionProvider>
            <NavbarUI />
            <main className="mx-auto py-8 container text-foreground">
              {children}
            </main>
          </SessionProvider>
        </NextUIProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  )
}
