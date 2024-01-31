"use server"
import AllUsers from "@/app/component/client/AllUsers"
import React from "react"

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return <AllUsers />
}
export default page
