import React from "react"
import Spinner from "./component/ui/Spinner"

interface loadingProps {}

const loading: React.FC<loadingProps> = ({}) => {
  return <Spinner color="default" />
}
export default loading
