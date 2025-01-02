import { useEffect, useState } from "react"
import { toast } from "sonner"
import Papa from "papaparse"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileInput, FileUploader, FileUploaderContent, FileUploaderItem } from "@/components/ui/uploader"
import { LoadingSpinner } from "@/components/ui/spinner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Paperclip } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from "@clerk/nextjs"
import { getTargetIdByUser } from "../dashboard/recent-sales"

const dropZoneConfig = {
  maxFiles: 2,
  maxSize: 1024 * 1024 * 4,
  //   multiple: false,
  accept: {
    "text/csv": [".csv"],
  },
}

interface CSVUploader {
  title: string
  description: string
  requiredColumns: { name: string; required: boolean }[]
  dialog?: boolean
  dialogTriggerText?: string
  endpoint: string
  verification?: boolean
  targetId?: string
}

export default function CSVUpload({
  title,
  description,
  requiredColumns,
  endpoint,
  dialog,
  dialogTriggerText,
  verification,
  targetId,
}: CSVUploader) {
  const [file, setFile] = useState<File | null>(null)
  const [csvData, setCsvData] = useState<string[][]>([])
  const [previewData, setPreviewData] = useState<string[][]>([])
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [headers, setHeaders] = useState<string[]>([])
  const [mappings, setMappings] = useState<Record<string, string>>({})
  const [isUploading, setIsUploading] = useState(false)
  const [force, setForce] = useState(false)
  const [allColumnsMapped, setAllColumnsMapped] = useState(false)
  const { userId } = useAuth()
  // const {targetId} = useTargetContext()
  const handleFileChange = (files: File[] | null) => {
    if (files && files.length > 0) {
      const selectedFile = files[0]
      setFile(selectedFile || null)

      if (!selectedFile) {
        return
      }

      //@ts-ignore
      Papa.parse(selectedFile, {
        complete: (results: Papa.ParseResult<string[]>) => {
          //@ts-ignore
          setHeaders(results?.data[0])
          setCsvData(results.data.slice(1))
          setPreviewData(results.data.slice(0, 5))
          setStep(2)
        },
        header: false,
        error: (error: Papa.ParseError) => {
          console.error("Error parsing CSV:", error)
          toast.error("Failed to parse CSV file")
        },
      })
    } else {
      setFile(null)
      setCsvData([])
      setPreviewData([])
      setHeaders([])
      setMappings({})
    }
  }
  const [availableHeaders, setAvailableHeaders] = useState<string[]>([])

  useEffect(() => {
    const autoMappings: Record<string, string> = {}
    if (requiredColumns && requiredColumns.length > 0) {
      headers.forEach((header) => {
        const matchingFixedColumn = requiredColumns.find(
          ({ name }) =>
            name.toLowerCase() === header.toLowerCase() ||
            name.toLowerCase() === header.toLowerCase().replace(/\s/g, "")
        )
        if (matchingFixedColumn) {
          autoMappings[matchingFixedColumn.name] = header
        }
      })
      setMappings(autoMappings)
      setAvailableHeaders(headers.filter((header) => !Object.values(autoMappings).includes(header)))
    }
  }, [headers])

  useEffect(() => {
    if (requiredColumns && requiredColumns.length > 0) {
      const mappedColumns = Object.keys(mappings)
      for (const column of requiredColumns) {
        if (column.required && !mappedColumns.includes(column.name)) {
          setAllColumnsMapped(false)
          return
        }
      }
      setAllColumnsMapped(true)
    }
  }, [mappings, requiredColumns])

  const handleMappingChange = (fixedColumn: string, selectedHeader: string) => {
    setMappings((prev) => {
      const updatedMappings = { ...mappings, [fixedColumn]: selectedHeader }
      const mappedColumns = Object.values(updatedMappings).filter(Boolean).length
      setAllColumnsMapped(mappedColumns === requiredColumns.length)

      Object.keys(updatedMappings).forEach((key) => {
        if (updatedMappings[key] === selectedHeader) {
          delete updatedMappings[key]
        }
      })

      if (selectedHeader) {
        updatedMappings[fixedColumn] = selectedHeader
      } else {
        delete updatedMappings[fixedColumn]
      }

      return updatedMappings
    })

    setAvailableHeaders((prevHeaders) => {
      if (selectedHeader) {
        return prevHeaders.filter((header) => header !== selectedHeader)
      } else {
        const previousHeader = mappings[fixedColumn]
        return previousHeader ? [...prevHeaders, previousHeader] : prevHeaders
      }
    })
  }

  const handleSubmitCSV = async () => {
    if (!file || csvData.length === 0) {
      toast.error("No file selected or CSV data is empty")
      return
    }

    setIsUploading(true)

    const mappedData = csvData.map((row) => {
      const mappedRow: Record<string, string> = {}
      Object.entries(mappings).forEach(([fixedColumn, originalHeader]) => {
        const index = headers.indexOf(originalHeader)
        if (index !== -1) {
          mappedRow[fixedColumn] = row[index] || ""
        }
      })
      return mappedRow
    })

    const payload = {
      data: mappedData,
      force: force,
      targetId: targetId,
    }

    console.log(payload)

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setStep(1)
        setCsvData([])
        setPreviewData([])
        setHeaders([])
        setMappings({})
        setFile(null)

        toast.success("CSV data uploaded successfully")
      } else {
        const errorData = await response.json()
        toast.error("Failed to upload CSV data")
      }
    } catch (error) {
      toast.error("An error occurred while uploading CSV data")
      console.error("Error:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const getMappedData = () => {
    return csvData.map((row) => {
      const mappedRow: Record<string, string> = {}
      Object.entries(mappings).forEach(([fixedColumn, originalHeader]) => {
        const index = headers.indexOf(originalHeader)
        if (index !== -1) {
          mappedRow[fixedColumn] = row[index] || ""
        }
      })
      return mappedRow
    })
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="mx-1 w-full rounded-md outline-dashed outline-1 outline-muted">
            <FileUploader
              value={file ? [file] : null}
              onValueChange={handleFileChange}
              dropzoneOptions={dropZoneConfig}
              className="relative rounded-lg bg-muted py-2"
            >
              <FileInput>
                {file ? (
                  <FileUploaderContent>
                    {file && (
                      <FileUploaderItem index={0}>
                        <Paperclip className="size-4 stroke-current" />
                        <span>{file.name}</span>
                      </FileUploaderItem>
                    )}
                  </FileUploaderContent>
                ) : (
                  <div className="flex w-full flex-col items-center justify-center pb-4 pt-3">
                    <svg
                      className="mb-3 size-8 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>
                      &nbsp; or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">CSV file</p>
                  </div>
                )}
              </FileInput>
            </FileUploader>
          </div>
        )
      case 2:
        return (
          <div>
            <h3 className="mb-4 text-lg font-semibold">Preview (First 4 rows)</h3>
            <div className="hide-scroll mx-auto max-w-screen-md overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-secondary/80">
                  <tr>
                    {previewData &&
                      previewData[0] &&
                      previewData[0].map((header, index) => (
                        <th
                          key={index}
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          {header}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-inherit">
                  {previewData.slice(1, 5).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case 3:
        return (
          <div>
            <h3 className="mb-4 text-lg font-semibold">Map Columns</h3>
            <div className="my-2">
              <div className="hide-scroll mx-auto  max-w-screen-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-secondary/80">
                    <tr>
                      {previewData &&
                        previewData[0] &&
                        previewData[0].map((header, index) => (
                          <th
                            key={index}
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            {header}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-inherit">
                    {previewData.slice(1, 2).map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {requiredColumns.map(({ name: fixedColumn, required }) => (
                <div key={fixedColumn} className="flex items-center space-x-2">
                  <Label htmlFor={fixedColumn} className="w-1/3">
                    {fixedColumn} {required && <span className="text-destructive">*</span>}
                  </Label>
                  <Select
                    value={mappings[fixedColumn] || ""}
                    onValueChange={(value) => handleMappingChange(fixedColumn, value)}
                  >
                    <SelectTrigger className="w-2/3">
                      <SelectValue placeholder="Select a column" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableHeaders.map((header) => (
                        <SelectItem key={header} value={header}>
                          {header}
                        </SelectItem>
                      ))}
                      {mappings[fixedColumn] && (
                        <SelectItem key={mappings[fixedColumn]} value={mappings[fixedColumn] || ""}>
                          {mappings[fixedColumn]}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>

            {!allColumnsMapped && (
              <p className="mt-4 text-sm text-red-500">
                Please map all * marked columns before proceeding. | Unmarked columns will be enriched later{" "}
              </p>
            )}
          </div>
        )
      case 4:
        const mappedData = getMappedData()
        const previewMappedData = mappedData.slice(0, 4)
        const mappedHeaders = Object.keys(mappings)

        return (
          <div>
            <h3 className="mb-4 text-lg font-semibold">Mapped Columns</h3>
            <div className="mb-6 grid gap-4 md:grid-cols-2">
              {Object.entries(mappings).map(([fixedColumn, originalHeader]) => (
                <div key={fixedColumn} className="flex items-center space-x-2">
                  <span className="w-1/3 font-semibold">{fixedColumn}:</span>
                  <span className="w-2/3">{originalHeader}</span>
                </div>
              ))}
            </div>

            <h3 className="mb-4 text-lg font-semibold">Preview (First 4 rows with new headers)</h3>
            <div className="hide-scroll mx-auto mb-6 max-w-screen-md overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-secondary/80">
                  <tr>
                    {mappedHeaders.map((header, index) => (
                      <th
                        key={index}
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-inherit">
                  {previewMappedData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {mappedHeaders.map((header, cellIndex) => (
                        <td key={cellIndex} className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {row[header]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {verification && (
              <div className="mt-4 flex items-center space-x-2">
                <Switch id="force-upload" checked={force} onCheckedChange={setForce} />
                <Label htmlFor="force-upload">Force upload {"(Without Email Verification)"}</Label>
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  if (dialog) {
    return (
      <Dialog>
        <DialogTrigger>
          {" "}
          <Button variant={"secondary"}>{dialogTriggerText}</Button>
        </DialogTrigger>
        <DialogContent className="min-w-max max-w-screen-lg">
          <DialogHeader>
            <DialogTitle className="mx-1">{title}</DialogTitle>
            <DialogDescription className="mx-1">{description}</DialogDescription>
          </DialogHeader>
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <LoadingSpinner size={45} />
            </div>
          ) : (
            renderStep()
          )}

          {step > 1 && (
            <DialogFooter className="border-t p-4">
              <div className="mx-3 flex w-full items-center justify-between">
                <Button
                  type="button"
                  onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                  size="lg"
                  disabled={step === 1 || isUploading}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    if (step < 4) {
                      setStep((prev) => prev + 1)
                    } else {
                      handleSubmitCSV()
                    }
                  }}
                  size="lg"
                  disabled={!file || isUploading}
                >
                  {step < 4 ? "Next" : "Upload"}
                </Button>
              </div>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="mx-1">{title}</CardTitle>
        <CardDescription className="mx-1">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <LoadingSpinner size={45} />
          </div>
        ) : (
          renderStep()
        )}
      </CardContent>
      {(step > 1 || file) && (
        <CardFooter className="border-t p-4">
          <div className="mx-3 flex w-full items-center justify-between">
            <Button
              type="button"
              onClick={() => setStep((prev) => Math.max(1, prev - 1))}
              size="lg"
              disabled={step === 1 || isUploading}
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (step < 3) {
                  setStep((prev) => prev + 1)
                } else if (step === 3 && allColumnsMapped) {
                  setStep(4)
                } else if (step === 4) {
                  handleSubmitCSV()
                }
              }}
              size="lg"
              disabled={!file || isUploading || (step === 3 && !allColumnsMapped)}
            >
              {step < 4 ? "Next" : "Upload"}
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
