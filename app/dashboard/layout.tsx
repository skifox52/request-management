"use client"
import React, { ReactNode } from "react"
import SidebarUI from "../component/ui/SidebarUI"
import { usePathname } from "next/navigation"

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  return (
    <main
      className={
        pathname !== "/dashboard/addEquipment"
          ? "bg-content2 border border-white/10 p-6 rounded-xl"
          : "p-6"
      }
    >
      <SidebarUI />
      {children}
    </main>
  )
}
export default DashboardLayout
