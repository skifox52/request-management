import { AlertCircle, HardDrive, User } from "lucide-react"
import React from "react"
import prismaClient from "../utils/prismaClient"

interface pageProps {}

const page: React.FC<pageProps> = async ({}) => {
  //utility functoin to fetch count of users
  const usersCountUtil = async (
    condition: { [key: string]: string | boolean } | {}
  ): Promise<number> => {
    return await prismaClient.user.count({ where: condition as any })
  }
  //utility functoin to fetch count of equipments
  const equipmentCountUntil = async (
    condition: { [key: string]: string | boolean } | {}
  ): Promise<number> => {
    return await prismaClient.equipement.count({ where: condition as any })
  }
  const typeEquipement = await prismaClient.equipement.groupBy({
    by: ["id_equipement"],
    _count: true,
  })
  const typeEquipements = await Promise.all(
    typeEquipement.map((e) =>
      prismaClient.typeEquipement.findFirst({
        where: { id: e.id_equipement },
        select: { libelle: true },
      })
    )
  )
  //utility functoin to fetch count of reclamationq
  const reclamationCountUtil = async (
    condition: { [key: string]: string | boolean } | {}
  ): Promise<number> => {
    return await prismaClient.demandeIntervention.count({
      where: condition as any,
    })
  }
  return (
    <div>
      <div className="container my-4 mx-auto md:px-6">
        <section className="mb-8 text-center max-w-screen-xl mx-auto">
          <h2 className="mb-20 text-3xl font-bold text-secondary tracking-tight">
            Tableau de bord
          </h2>

          <div className="grid lg:grid-cols-3 lg:gap-x-12 shadow">
            <div className="mb-16 lg:mb-0 shadow-xl shadow-black">
              <div className="block h-full rounded-3xl border border-default bg-default/30 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                <div className="flex justify-center">
                  <div className="-translate-y-8 inline-block bg-default rounded-full p-4 text-primary shadow-md">
                    <User className="text-white" />
                  </div>
                </div>
                <div className="p-6 pt-2">
                  <h3 className="mb-4 text-2xl font-bold text-secondary">
                    Utilisateurs
                  </h3>
                  <ul className="px-4 flex flex-col gap-3 bg-content2 border border-default p-3 rounded-xl shadow-lg shadow-black/70">
                    <li className="flex items-center justify-between">
                      <h2>Tous les utilisateurs</h2>
                      <span>{usersCountUtil({})}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <h2>Administrateurs</h2>
                      <span>{usersCountUtil({ role: "admin" })}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <h2>Simple utilisateurs</h2>
                      <span>{usersCountUtil({ role: "user" })}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <h2>Compte activer</h2>
                      <span>{usersCountUtil({ isActive: true })}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <h2>Compte désactiver</h2>
                      <span>{usersCountUtil({ isActive: false })}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mb-16 lg:mb-0 shadow-xl shadow-black">
              <div className="block h-full rounded-3xl border border-default bg-default/30 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                <div className="flex justify-center">
                  <div className="-translate-y-8 inline-block bg-default rounded-full p-4 text-primary shadow-md">
                    <HardDrive className="text-white" />
                  </div>
                </div>
                <div className="p-6 pt-2">
                  <h3 className="mb-4 text-2xl font-bold text-secondary">
                    Équipements
                  </h3>
                  <ul className="px-3 flex flex-col gap-3">
                    <li className="flex items-center justify-between">
                      <h2>Tous les équipements</h2>
                      <span>{equipmentCountUntil({})}</span>
                    </li>
                    <li className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <h2>Type d&apos;équipements</h2>
                        <span>{typeEquipement.length}</span>
                      </div>
                      <ul className="flex flex-col gap-2 items-start text-white bg-content2 rounded-xl border border-default shadow-lg shadow-black/70">
                        {typeEquipements.map((t, i) => (
                          <li
                            key={i}
                            className="border-b py-2 border-default flex justify-between w-full text-start px-8 last-of-type:border-b-0"
                          >
                            {t?.libelle} <span>{typeEquipement[i]._count}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mb-16 lg:mb-0 shadow-xl shadow-black">
              <div className="block h-full rounded-3xl border border-default bg-default/30 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                <div className="flex justify-center">
                  <div className="-translate-y-8 inline-block bg-default rounded-full p-4 text-primary shadow-md">
                    <AlertCircle className="text-white" />
                  </div>
                </div>
                <div className="p-6 pt-2">
                  <h3 className="mb-4 text-2xl font-bold text-secondary">
                    Réclamations
                  </h3>
                  <ul className="px-4 flex flex-col gap-3 bg-content2 border border-default p-3 rounded-xl shadow-lg shadow-black/70">
                    <li className="flex items-center justify-between">
                      <h2>Toutes les réclamation</h2>
                      <span>{reclamationCountUtil({})}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <h2>Réclamations en attente</h2>
                      <span>
                        {reclamationCountUtil({ status: "EN_ATTENTE" })}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <h2>Réclamations en cours</h2>
                      <span>
                        {reclamationCountUtil({ status: "EN_COURS" })}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <h2>Réclamations en traité</h2>
                      <span>
                        {reclamationCountUtil({ status: "TERMINER" })}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <h2>Réclamations en rejeté</h2>
                      <span>{reclamationCountUtil({ status: "REJETER" })}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
export default page
