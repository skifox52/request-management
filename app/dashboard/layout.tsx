"use client"
import React, { ReactNode } from "react"
import SidebarUI from "../component/SidebarUI"

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="bg-foreground text-black p-6 rounded-xl">
      <SidebarUI />
      {children}
    </main>
  )
}
export default DashboardLayout
