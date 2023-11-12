import React from "react"
const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NOM", uid: "name", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "PRENOM", uid: "firstname" },
  { name: "EMAIL", uid: "email" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "DEPARTEMENT", uid: "departement" },
  { name: "USERNAME", uid: "username" },
  { name: "GROUPE", uid: "groupe" },
  { name: "ACTIONS", uid: "actions" },
]

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
]

export { columns, statusOptions }
