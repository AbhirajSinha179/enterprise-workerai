"use client"
import { ChangeEvent, useEffect, useState } from "react"
import InputWithCommas from "@/components/customComponents/inputWithCommas"
import SelectDemo from "@/components/customComponents/multipleSelectChip"
import { ContentLayout } from "@/components/layout/content-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function OutboundSetting() {
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [inputValue, setInputValue] = useState<string>("")
  const validateCsvType = (fileName: string): boolean => {
    const CSV_REGEX = /\.csv$/i;
    if (!CSV_REGEX.exec(fileName)) {
      alert('Invalid file type');
      return false;
    }
    return true;
  }

  const handleCsvChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files;
      const targetFile = files[0];
      const fileName = targetFile?.name;
      if (fileName && validateCsvType(fileName)) setCsvFile(event.target.files[0]!)
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleSubmitCSV = () => {
    console.log("CSV File:", csvFile)
  }

  const handleSubmit = () => {
    console.log("Input Value:", inputValue)
  }

  useEffect(() => {
    console.log("CSV File changed:", csvFile, "Input Value changed:", inputValue)
  }, [csvFile, inputValue])

  return (
    <>
      <ContentLayout title="Outbound Settings">
        <div className="container mx-auto my-10 flex justify-between">
          <div className="m-4 h-96 w-1/2 overflow-hidden rounded-lg bg-card shadow-md transition duration-300 hover:shadow-lg">
            <div className="p-4">
              <h2 className="mb-2 text-xl font-semibold">Users</h2>
            </div>
            <div className="flex justify-center">
              <div className="m-4 w-5/6 rounded-md bg-background">
                <SelectDemo />
              </div>
            </div>
          </div>
          <div className="m-4 h-96 w-1/2 overflow-hidden rounded-lg bg-card shadow-md transition duration-300 hover:shadow-lg">
            <div className="p-4">
              <h2 className="mb-2 text-xl font-semibold ">Company data</h2>
            </div>
          </div>
        </div>
        <div className="container mx-auto my-10 flex justify-between">
          <div className="bg-background-600 m-4 h-96 w-full overflow-hidden rounded-lg bg-card shadow-md transition duration-300 hover:shadow-lg">
            <h2 className="mb-2 p-4 text-xl font-semibold">Target</h2>
            <div className="grid w-full max-w-sm items-center gap-1.5 p-4">
              <Label htmlFor="csv">CSV file</Label>
              <Input id="csv" type="file" onChange={handleCsvChange} />
              <Button type="button" onClick={handleSubmitCSV}>Submit</Button>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2 p-4">
              <Input type="text" placeholder="Input" value={inputValue} onChange={handleInputChange} />
              <Button type="button" onClick={handleSubmit}>Submit</Button>
            </div>
            <InputWithCommas />
          </div>
        </div>
      </ContentLayout>
    </>
  )
}
