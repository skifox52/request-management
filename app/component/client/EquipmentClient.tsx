"use client"
import React from "react"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  ChipProps,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Textarea,
} from "@nextui-org/react"
import { PenSquare } from "lucide-react"
import { TUserEquipment } from "@/app/home/equipement/page"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  TDemandeInterventionFormSchema,
  demandeInterventionFormSchema,
} from "@/app/zod/demandeInterventionSchema"
import toast from "react-hot-toast"
import { demandeInterventionAction } from "@/app/actions/demandeActions"

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
}

const columns = [
  { name: "MODELE", uid: "modele" },
  { name: "NUMERO DE SERIE", uid: "num_serie" },
  { name: "DATE D'AQUISITION", uid: "date_aqui" },
  { name: "RECLAMATION", uid: "reclamation" },
]

type User = TUserEquipment

export default function EquipmentClient({
  equipments,
  userId,
}: {
  equipments: TUserEquipment[]
  userId: string
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [currentItem, setCurrentItem] = React.useState<TUserEquipment | null>(
    null
  )
  const renderCell = React.useCallback(
    (eq: TUserEquipment, columnKey: React.Key) => {
      const cellValue = eq[columnKey as keyof TUserEquipment]
      switch (columnKey) {
        case "modele":
          return (
            <User
              avatarProps={{
                radius: "lg",
                src:
                  eq.image !== "/placeholder-wire-image-dark.png"
                    ? JSON.parse(eq.image)["thumbnailUrl"]
                    : eq.image,
              }}
              description={eq.caracteristique}
              name={eq.libelle}
            >
              {eq.libelle}
            </User>
          )
        case "num_serie":
          return (
            <div className="relative flex items-center gap-2">
              {eq.numero_de_serie}
            </div>
          )
        case "date_aqui":
          return (
            <div className="relative flex items-center gap-2">
              {eq.date_aquisition.toISOString().slice(0, 10)}
            </div>
          )
        case "reclamation":
          return (
            <div className="relative flex items-center">
              <Tooltip content="Nouvelle réclamation">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <PenSquare
                    className="h-[1.25rem] w-[1.25rem]"
                    onClick={() => {
                      onOpen()
                      setCurrentItem(eq)
                    }}
                  />
                </span>
              </Tooltip>
            </div>
          )
        default:
          return cellValue
      }
    },
    [onOpen]
  )
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<TDemandeInterventionFormSchema>({
    resolver: zodResolver(demandeInterventionFormSchema),
  })
  const onSubmit = async (data: TDemandeInterventionFormSchema) => {
    try {
      await demandeInterventionAction({
        id_equipement: String(currentItem?.id),
        id_user: userId,
        motif_demande: data.motif_demande,
      })
      toast.success("Réclamation envoyer avec succès")
      reset()
      onOpenChange()
    } catch (error: any) {
      toast.error(error.message)
      reset()
    }
  }
  return (
    <React.Fragment>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              className="bg-primary"
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={equipments}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey) as React.ReactNode}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-4">
                <h1 className="text-3xl tracking-tight font-mediumm text-white text-center">
                  Réclamation
                </h1>
                <div className="flex gap-4 border-y font-medium border-default/40 py-4">
                  <Image
                    src={
                      currentItem?.image
                        ? currentItem?.image ===
                          "/placeholder-wire-image-dark.png"
                          ? "/placeholder-wire-image-dark.png"
                          : JSON.parse(currentItem?.image!).thumbnailUrl
                        : "/placeholder-wire-image-dark.png"
                    }
                    alt="thumbnail image"
                    className="h-16 object-cover"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-xl tracking-tight text-white">
                      {currentItem?.libelle}
                    </h1>
                    <p className="text-sm text-gray-400 font-thin">
                      {currentItem?.caracteristique}
                    </p>
                  </div>
                </div>
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Textarea
                    {...register("motif_demande")}
                    label="Motif"
                    placeholder="Enter your description"
                    variant="bordered"
                    color="default"
                    errorMessage={errors.motif_demande?.message}
                    isInvalid={!!errors.motif_demande}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    type="button"
                    onPress={() => {
                      onClose()
                      reset()
                    }}
                  >
                    Fermer
                  </Button>
                  <Button color="primary" type="submit">
                    Soumettre
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </React.Fragment>
  )
}
