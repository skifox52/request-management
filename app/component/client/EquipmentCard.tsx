"use client"
import { TEquipment } from "@/app/dashboard/allEquipments/page"
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"
import React from "react"

interface EquipmentCardProps {
  equipment: TEquipment
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  let url: string = ""
  let thumbnailUrl: string = ""
  if (
    equipment.image !== "/placeholder-wire-image-dark.png" &&
    equipment.image
  ) {
    url = JSON.parse(equipment.image).url
    thumbnailUrl = JSON.parse(equipment.image).thumbnailUrl
  } else {
    url = "/placeholder-wire-image-dark.png"
    thumbnailUrl = "/placeholder-wire-image-dark.png"
  }

  return (
    <>
      <Card isFooterBlurred className="group">
        <CardHeader className="absolute bg-black/40 z-10 top-0 flex-col items-start">
          <p className="text-tiny text-white/70 uppercase font-bold">
            {equipment.typeEquipement.libelle}
          </p>
          <h4 className="text-white font-medium text-2xl">
            {equipment.libelle}
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover group-hover:scale-[135%]"
          src={url}
        />
        <CardFooter className="absolute bg-default/30 bottom-0 border-t-1 border-white/10 z-10 justify-between">
          <div>
            <p className="text-white text-tiny">Date d&apos;aquisition</p>
            <p className="text-white/60 text-tiny">
              {equipment.date_aquisition.toISOString().slice(0, 10)}
            </p>
          </div>
          <Button
            className="text-tiny text-white/90"
            color="primary"
            radius="full"
            size="sm"
            onClick={onOpen}
          >
            Details
          </Button>
        </CardFooter>
      </Card>
      <>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex gap-6">
                  <Image src={thumbnailUrl} alt="thumbnail" />
                  <div>
                    <h1 className="uppercase text-xl text-white ">
                      {equipment.typeEquipement.libelle}
                    </h1>
                    <p className="font-light text-white/50 text-sm">
                      {equipment.libelle}
                    </p>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <ul>
                    <li className="flex justify-between border-b border-white/20 p-3">
                      <span className="text-white/90">Numéro de serie</span>{" "}
                      {equipment.numero_de_serie}
                    </li>
                    <li className="flex justify-between border-b border-white/20 p-3">
                      <span className="text-white/90">Caractéristique</span>{" "}
                      {equipment.caracteristique}
                    </li>
                    <li className="flex justify-between border-b border-white/20 p-3">
                      <span className="text-white/90">Utilisateur</span>{" "}
                      {equipment.user.lastname + " " + equipment.user.firstname}
                    </li>
                    <li className="flex justify-between border-b border-white/20 p-3">
                      <span className="text-white/90">Date de sortie</span>{" "}
                      {equipment.date_sortie.toISOString().slice(0, 10)}
                    </li>
                    <li className="flex justify-between p-3">
                      <span className="text-white/90">
                        Date de fin de garantie
                      </span>{" "}
                      {equipment.date_fin_garantie.toISOString().slice(0, 10)}
                    </li>
                  </ul>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Fermer
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </>
  )
}
