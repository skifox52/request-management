import { Link } from "@nextui-org/react"
import { AlertTriangle } from "lucide-react"

const NotFound = ({}) => {
  return (
    <div className="flex flex-col w-full gap-12 items-center mt-24">
      <h1 className="flex text-6xl">
        <AlertTriangle size={150} className="text-danger" /> 404
      </h1>
      <p className="text-3xl flex flex-col items-start gap-1">
        Page introuvable
        <Link href="/" color="secondary" className="text-xl">
          revenir a l&apos;acceuil.
        </Link>
      </p>
    </div>
  )
}
export default NotFound
