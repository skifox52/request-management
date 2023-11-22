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
  Card,
  CardBody,
} from "@nextui-org/react"
import { PenSquare } from "lucide-react"
import { TUserEquipment } from "@/app/home/page"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  TDemandeInterventionFormSchema,
  demandeInterventionFormSchema,
} from "@/app/zod/demandeInterventionSchema"
import toast from "react-hot-toast"
import { demandeInterventionAction } from "@/app/actions/demandeActions"
import ButtonUI from "../ui/ButtonUI"

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
}

const columns = [
  { name: "MODELE", uid: "modele" },
  { name: "NUMERO DE SERIE", uid: "num_serie" },
  { name: "DATE D'AQUISITION", uid: "date_aqui" },
  { name: "DATE DE FIN DE GANRANTIE", uid: "date_fin_garantie" },
  { name: "DATE DE SORTIE", uid: "date_sortie" },
]

type User = TUserEquipment

export default function EquipmentClient({
  equipments,
  userId,
}: {
  equipments: TUserEquipment[]
  userId: string
}) {
  const { isOpen, onOpenChange } = useDisclosure()

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
        case "date_sortie":
          return (
            <div className="relative flex items-center gap-2">
              {eq.date_sortie.toISOString().slice(0, 10)}
            </div>
          )
        case "date_fin_garantie":
          return (
            <div className="relative flex items-center gap-2">
              {eq.date_fin_garantie.toISOString().slice(0, 10)}
            </div>
          )
        default:
          return cellValue
      }
    },
    []
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
      // await demandeInterventionAction({
      //   id_equipement: String(currentItem?.id),
      //   id_user: userId,
      //   motif_demande: data.motif_demande,
      // })
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
      <div className="flex flex-col gap-6">
        <Tooltip content="Établir une demande d'intervention en cas de panne.">
          <Button
            color="default"
            variant="ghost"
            className="w-fit ml-auto mt-4"
            onClick={onOpenChange}
          >
            Demande d&apos;intervention
          </Button>
        </Tooltip>
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
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-4">
                <h1 className="text-3xl tracking-tight font-mediumm text-white text-center">
                  Réclamation
                </h1>
                <div className="grid grid-cols-2 px-3 gap-3 py-4 border-y border-white/20">
                  {equipments.map((eq) => (
                    <Card key={eq.id} isPressable className="bg-content2">
                      <CardBody>
                        <p>
                          Make beautiful websites regardless of your design
                          experience.
                        </p>
                      </CardBody>
                    </Card>
                  ))}
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
