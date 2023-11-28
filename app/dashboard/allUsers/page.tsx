import AllUsers from "@/app/component/client/AllUsers"
import React from "react"

interface pageProps {}

export const dynamic = "force-dynamic"

const page: React.FC<pageProps> = ({}) => {
  return <AllUsers />
}
export default page
