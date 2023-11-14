import React from "react"
import Spinner from "./component/ui/Spinner"

interface loadingProps {}

const loading: React.FC<loadingProps> = ({}) => {
  return (
    <div className="flex justify-center h-[80vh] ">
      <Spinner color="default" />
    </div>
  )
}
export default loading
