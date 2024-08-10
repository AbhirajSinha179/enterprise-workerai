import React, { useState, ChangeEvent, KeyboardEvent } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import CSVUpload from "./csvUploader"
import { toast } from "sonner"

interface OmitLeadsProps {
  title: string
  description: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const sampleTargetId = "1c1108a8-9108-42e2-8177-4e655bbc87ed"

const OmitLeads = ({ title, description }: OmitLeadsProps) => {
  const [omitOption, setOmitOption] = useState<string>("")
  const [inputValue, setInputValue] = useState<string>("")
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    console.log(event)
    if (value.includes(",") && ((omitOption == "email" && emailRegex.test(value)) || omitOption == "companies")) {
      const newValues = value
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v && !selectedOptions.includes(v))
      setSelectedOptions((prev) => [...prev, ...newValues])
      setInputValue("")
    } else {
      setInputValue(value)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addOptionsFromInput()
    }
  }

  const addOptionsFromInput = () => {
    const newValues = inputValue
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v && !selectedOptions.includes(v))
    if (newValues.length > 0) {
      setSelectedOptions((prev) => [...prev, ...newValues])
      setInputValue("")
    }
  }

  const handleRemove = (value: string) => {
    setSelectedOptions((prev) => prev.filter((option) => option !== value))
  }

  const handleSubmit = async () => {
    if (selectedOptions.length === 0 && inputValue.trim() === "") {
      toast.error("Please add at least one option before submitting.")
      return
    }

    let endpoint = ""
    let payload: { targetId: string; data?: { email: string }[] | { name_or_domain: string }[] } = {
      targetId: sampleTargetId,
    }

    switch (omitOption) {
      case "email":
        endpoint = "https://api.workerai.co/leads/exclude"
        payload = {
          targetId: sampleTargetId,
          data: [
            ...selectedOptions.map((v) => ({ email: v.trim() })),
            ...inputValue
              .split(",")
              .map((v) => ({ email: v.trim() }))
              .filter((v) => v.email),
          ],
        }
        break
      case "companies":
        endpoint = "https://api.workerai.co/leads/exclude/companies"
        payload = {
          targetId: sampleTargetId,
          data: [
            ...selectedOptions.map((v) => ({ name_or_domain: v.trim() })),
            ...inputValue
              .split(",")
              .map((v) => ({ name_or_domain: v.trim() }))
              .filter((v) => v.name_or_domain),
          ],
        }
        break
    }

    try {
      setLoading(true)
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to submit data")
      }

      toast.success("Data submitted successfully")
      setSelectedOptions([])
      setInputValue("")
    } catch (error) {
      toast.error("Error submitting data. Please try again.")
      console.error("Submission error:", error)
    } finally {
      setLoading(false)
    }
  }

  const renderOmitContent = () => {
    switch (omitOption) {
      case "leadsList":
        return (
          <CSVUpload
            title="Omit Leads (CSV)"
            description="Upload a CSV file with leads to omit"
            requiredColumns={[
              { name: "email", required: true },
              { name: "name", required: false },
            ]}
            endpoint="https://api.workerai.co/leads/exclude"
            dialog={true}
            dialogTriggerText={"Upload Leads CSV"}
            key="omit-leads-csv"
          />
        )
      case "companiesList":
        return (
          <CSVUpload
            title="Omit Companies (CSV)"
            description="Upload a CSV file with company names or domains to omit"
            requiredColumns={[{ name: "name_or_domain", required: true }]}
            endpoint="https://api.workerai.co/leads/exclude/companies"
            dialog={true}
            dialogTriggerText={"Upload Companies CSV"}
            key="omit-companies-csv"
          />
        )
      case "email":
      case "companies":
        return (
          <div className="w-full">
            <div className="flex w-full flex-col">
              <div className="flex items-center">
                <Input
                  type="text"
                  placeholder="Add comma to separate"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="mr-6 h-11"
                />
              </div>
              <div className="no-scrollbar flex max-h-16 flex-wrap gap-2 overflow-y-auto rounded-md py-2">
                {selectedOptions.map((option) => (
                  <button key={option} onClick={() => handleRemove(option)}>
                    <Badge variant="secondary">
                      <div className="flex items-center justify-around gap-1">
                        <div>{option}</div>
                        <X className="size-4" />
                      </div>
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="mx-1">{title}</CardTitle>
        <CardDescription className="mx-1">{description}</CardDescription>
      </CardHeader>
      <CardContent className="min-w-full">
        <Select onValueChange={setOmitOption}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select omit option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="leadsList">Upload list of leads to omit</SelectItem>
            <SelectItem value="companiesList">Upload list of companies to omit</SelectItem>
            <SelectItem value="email">Omit by email address</SelectItem>
            <SelectItem value="companies">Omit by company names or domains</SelectItem>
          </SelectContent>
        </Select>
        <div className="mt-4">{renderOmitContent()}</div>
      </CardContent>
      {(omitOption === "email" || omitOption === "companies") && (
        <CardFooter className="border-t p-4">
          <div className="mx-4 flex">
            <Button type="button" onClick={handleSubmit} size="lg" disabled={loading}>
              Submit
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

export default OmitLeads
