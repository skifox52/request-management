"use client"
import { SingleImageDropzone } from "./SingleImageDropZone"
import { useEdgeStore } from "../../utils/edgestore"
import { useState } from "react"
import ButtonUI from "./ButtonUI"
import { Progress } from "@nextui-org/react"
export function FileUpdate() {
  const [file, setFile] = useState<File>()
  const [progress, setProgress] = useState<number>(0)
  const { edgestore } = useEdgeStore()
  return (
    <div className="w-fit h-fit">
      <SingleImageDropzone
        width={200}
        height={200}
        value={file}
        dropzoneOptions={{
          maxFiles: 1,
          maxSize: 1024 * 1024 * 2.5,
          multiple: false,
        }}
        onChange={(file) => {
          setFile(file)
        }}
      />
      {progress > 0 && (
        <Progress
          aria-label="Loading..."
          value={progress}
          size="sm"
          className="max-w-[200px] mt-2"
          color="warning"
        />
      )}
      {/* <ButtonUI
        variant="ghost"
        color="default"
        value="upload"
        className="w-[200px] mt-2"
        size="sm"
        onClick={async () => {
          if (file) {
            const res = await edgestore.myImages.upload({
              file,
              onProgressChange: (progress) => {
                // you can use this to show a progress bar
                console.log(progress)
                setProgress(progress)
              },
            })
            // you can run some server action or api here
            // to add the necessary data to your database
            console.log(res)
          }
        }}
      /> */}
    </div>
  )
}
