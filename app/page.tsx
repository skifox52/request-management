import { fetchUser } from "./actions/authActions"
import LoginForm from "./component/client/LoginForm"

export default async function home() {
  const data: { username: string; isActive: boolean; role: string }[] =
    await fetchUser()
  return (
    <div>
      <h1 className="text-center text-default-200 mt-16 mb-12 text-3xl font-bold max-w-md mx-auto">
        Gestionnaire des réquètes
      </h1>
      <LoginForm data={data} />
    </div>
  )
}
