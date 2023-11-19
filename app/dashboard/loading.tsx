import React from "react"
import Spinner from "../component/ui/Spinner"

interface loadingProps {}

const loading: React.FC<loadingProps> = ({}) => {
  return (
    <div className="h-[60vh] flex items-center justify-center">
      <Spinner color="default" />
    </div>
  )
}
export default loading
