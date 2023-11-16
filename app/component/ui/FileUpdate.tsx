"use client"
import { SingleImageDropzone } from "./SingleImageDropZone"
import { Dispatch, SetStateAction } from "react"
import { Progress } from "@nextui-org/react"

export function FileUpdate({
  imageProgress,
  file,
  setFile,
}: {
  imageProgress: number
  file: File | undefined
  setFile: Dispatch<SetStateAction<File | undefined>>
}) {
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
      {imageProgress > 0 && (
        <Progress
          aria-label="Loading..."
          value={imageProgress}
          size="sm"
          className="max-w-[200px] mt-3"
          color="success"
        />
      )}
    </div>
  )
}
