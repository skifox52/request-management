"use client"
import { SingleImageDropzone } from "./SingleImageDropZone"
import { useEdgeStore } from "../../utils/edgestore"
import { useState } from "react"
import ButtonUI from "./ButtonUI"
export function FileUpdate() {
  const [file, setFile] = useState<File>()
  const { edgestore } = useEdgeStore()
  return (
    <div>
      <SingleImageDropzone
        width={200}
        height={200}
        value={file}
        onChange={(file) => {
          setFile(file)
        }}
      />
      <ButtonUI
        variant="ghost"
        color="default"
        value="upload"
        onClick={async () => {
          if (file) {
            const res = await edgestore.myImages.upload({
              file,
              onProgressChange: (progress) => {
                // you can use this to show a progress bar
                console.log(progress)
              },
            })
            // you can run some server action or api here
            // to add the necessary data to your database
            console.log(res)
          }
        }}
      />
    </div>
  )
}
