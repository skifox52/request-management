"use client"
import { TEquipment } from "@/app/dashboard/allEquipments/page"
import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react"
import React from "react"

interface EquipmentCardProps {
  equipment: TEquipment
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment }) => {
  let thumbailUrl: string = ""
  if (
    equipment.image !== "/placeholder-wire-image-dark.png" &&
    equipment.image
  ) {
    thumbailUrl = JSON.parse(equipment.image).url
  } else {
    thumbailUrl = "/placeholder-wire-image-dark.png"
  }
  return (
    <Card isFooterBlurred>
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">New</p>
        <h4 className="text-black font-medium text-2xl">Acme camera</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src={thumbailUrl}
      />
      <CardFooter className="absolute bg-default/30 bottom-0 border-t-1 border-white/10 z-10 justify-between">
        <div>
          <p className="text-black text-tiny">Available soon.</p>
          <p className="text-black text-tiny">Get notified.</p>
        </div>
        <Button className="text-tiny" color="primary" radius="full" size="sm">
          Notify Me
        </Button>
      </CardFooter>
    </Card>
  )
}
