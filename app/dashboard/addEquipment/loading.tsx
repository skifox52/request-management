import { Skeleton } from "@nextui-org/react"
import React from "react"

interface loadingProps {}

const loading: React.FC<loadingProps> = ({}) => {
  return (
    <Skeleton className="rounded-lg border border-white/10 shadow-lg shadow-black">
      <div className="h-[450px] max-w-xl rounded-lg"></div>
    </Skeleton>
  )
}
export default loading
