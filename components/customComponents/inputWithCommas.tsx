import { X } from "lucide-react"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function InputWithCommas() {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])
    const [inputValue, setInputValue] = useState<string>("")

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        if (value.includes(",")) {
            const newValues = value.split(",").map(v => v.trim()).filter(v => v && !selectedOptions.includes(v))
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
        const newValues = inputValue.split(",").map(v => v.trim()).filter(v => v && !selectedOptions.includes(v))
        if (newValues.length > 0) {
            setSelectedOptions((prev) => [...prev, ...newValues])
            setInputValue("")
        }
    }

    const handleRemove = (value: string) => {
        setSelectedOptions((prev) => prev.filter((option) => option !== value))
    }

    return (
        <div className="min-w-8">
            <div className="flex w-full max-w-sm items-center space-x-2 p-4">
                <Input
                    type="text"
                    placeholder="Input"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <Button type="button" onClick={addOptionsFromInput}>Submit</Button>
            </div>
            <div className="no-scrollbar flex max-h-16 flex-wrap gap-2 overflow-y-auto rounded-md bg-primary-foreground p-2">
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
    )
}
