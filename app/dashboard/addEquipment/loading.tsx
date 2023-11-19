import Spinner from "@/app/component/ui/Spinner"
import { Skeleton } from "@nextui-org/react"
import React from "react"

interface loadingProps {}

const loading: React.FC<loadingProps> = ({}) => {
  return (
    <div className="h-[60vh] flex items-center justify-center">
      <Spinner color="default" />
    </div>
  )
}
export default loading
