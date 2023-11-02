import React from "react"
import Spinner from "./component/Spinner"

interface loadingProps {}

const loading: React.FC<loadingProps> = ({}) => {
  return <Spinner />
}
export default loading
