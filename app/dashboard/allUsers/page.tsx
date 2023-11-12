"use client"
import React, { ReactNode, useState } from "react"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react"
import useSWR, { useSWRConfig } from "swr"
import { columns, statusOptions } from "./data"
import { capitalize } from "./utils"
import { ChevronDown, MoreVertical, Search } from "lucide-react"
import { TUser } from "@/app/api/users/all/route"
import { deleteUser, disableUser, enableUser } from "@/app/actions/userActions"
import InputUI from "@/app/component/InputUI"
import { useForm } from "react-hook-form"

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
}

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "role",
  "status",
  "actions",
  "username",
]

export default function App() {
  const userFetcher = (url: string) => fetch(url).then((res) => res.json())
  const {
    data: users,
    error,
    isLoading,
  } = useSWR<TUser[]>("/api/users/all", userFetcher)
  //Revalidating data
  const { mutate } = useSWRConfig()

  const [filterValue, setFilterValue] = React.useState("")
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  )
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all")
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  })
  const [page, setPage] = React.useState(1)

  const pages = users && Math.ceil((users?.length as number) / rowsPerPage)

  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    )
  }, [visibleColumns])

  const filteredItems = React.useMemo(() => {
    let filteredUsers = users?.length! > 0 ? [...users!] : []

    if (hasSearchFilter) {
      filteredUsers = filteredUsers?.filter((user) =>
        user.lastname.toLowerCase().includes(filterValue.toLowerCase())
      )
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.isActive ? "active" : "paused")
      )
    }

    return filteredUsers
  }, [filterValue, statusFilter, hasSearchFilter, users])

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: TUser, b: TUser) => {
      const first = a[sortDescriptor.column as keyof TUser] as number
      const second = b[sortDescriptor.column as keyof TUser] as number
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === "descending" ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const renderCell = React.useCallback((user: TUser, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof TUser]

    switch (columnKey) {
      case "name":
        return (
          <User
            classNames={{
              description: "text-default-500",
            }}
            name={user.lastname}
          >
            {user.lastname}
          </User>
        )
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {cellValue as ReactNode}
            </p>
          </div>
        )
      case "departement":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {user.departement.dep_name}
            </p>
          </div>
        )
      case "groupe":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {user.group.libelle}
            </p>
          </div>
        )
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {cellValue as ReactNode}
            </p>
          </div>
        )
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[user.isActive === true ? "active" : "paused"]}
            size="sm"
            variant="dot"
          >
            {user.isActive ? "actif" : "inactif"}
          </Chip>
        )
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-primary border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <MoreVertical className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => setOpenModal(true)}>
                  Changer le mot de passe
                </DropdownItem>
                <DropdownItem
                  color={user.isActive ? "warning" : "success"}
                  onClick={
                    user.isActive
                      ? async () => {
                          await disableUser(user.id)
                          mutate("/api/users/all")
                        }
                      : async () => {
                          await enableUser(user.id)
                          mutate("/api/users/all")
                        }
                  }
                >
                  {user.isActive ? "Désactiver" : "Activer"}
                </DropdownItem>
                <DropdownItem
                  color="danger"
                  onClick={() => {
                    setConfirmDelete(true), setCurrentUserId(user.id)
                  }}
                >
                  Supprimer
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )

      default:
        return cellValue
    }
  }, [])

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue("")
    }
  }, [])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<Search className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDown className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDown className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Colonnes
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    )
  }, [filterValue, statusFilter, visibleColumns, onSearchChange])

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          // showControls
          classNames={{
            cursor: "bg-black text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages as number}
          variant="light"
          onChange={setPage}
        />
      </div>
    )
  }, [page, pages, hasSearchFilter])

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  )
  //--------------------------------------------------------------------------------------------------------
  const {
    register,
    formState: { errors },
  } = useForm<{ password: string; confirmPassword: string }>({
    defaultValues: { password: "", confirmPassword: "" },
  })
  const [opentModal, setOpenModal] = useState<boolean>(false)
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false)
  return (
    <>
      <Modal
        backdrop={"blur"}
        isOpen={opentModal}
        onClose={() => setOpenModal(false)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Changer le mot de passe
              </ModalHeader>
              <ModalBody>
                <form action="#" className="flex flex-col gap-4">
                  <InputUI
                    {...register("password", { required: true, minLength: 8 })}
                    label="nouveau mot de passe"
                    size="sm"
                    type="password"
                    variant="underlined"
                    color="default"
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                  />
                  <InputUI
                    {...register("confirmPassword", {
                      required: true,
                      minLength: 8,
                    })}
                    label="Confirmer mot de passe"
                    size="sm"
                    type="password"
                    variant="underlined"
                    color="default"
                    isInvalid={!!errors.confirmPassword}
                    errorMessage={errors.confirmPassword?.message}
                  />
                  <Button color="primary" type="submit" size="sm">
                    Appliquer
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        backdrop={"blur"}
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex text-md flex-col gap-1">
                Voulez vous vraiment supprimer cet utilisateur?
              </ModalHeader>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={async () => {
                    await deleteUser(currentUserId as string)
                    onClose()
                    mutate("/api/users/all")
                  }}
                >
                  Oui
                </Button>
                <Button color="primary" onPress={onClose}>
                  Non
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Table
        isCompact
        removeWrapper
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={classNames}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"Aucun utilisateur trouver..."}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey) as any}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
