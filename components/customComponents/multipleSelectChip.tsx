import { X } from "lucide-react"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "../ui/badge"

const OPTIONS = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "tree",
  "track",
  "traffic",
  "track",
  "recket",
  "treat",
  "tampon",
  "Truck",
  "suck",
  "Chuck",
]

export default function SelectDemo() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const handleSelect = (value: string) => {
    if (!selectedOptions.includes(value)) {
      setSelectedOptions((prev) => [...prev, value])
    }
  }

  const handleRemove = (value: string) => {
    setSelectedOptions((prev) => prev.filter((option) => option !== value))
  }

  return (
    <div className="min-w-8">
      <Select onValueChange={handleSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex max-h-16 flex-wrap gap-x-2 gap-y-1 overflow-y-auto rounded-md bg-primary-foreground px-2 pb-1">
        {selectedOptions.map((option, ind) => (
          <button key={ind} onClick={() => handleRemove(option)}>
            <Badge variant="secondary">
              <div className="flex items-center justify-around gap-1">
                <div>{option}</div>
                {/* icon chota crow, x ko clickable banao, but in a circular button (define button ka width and height) */}
                <X className="size-4" />
              </div>
            </Badge>
          </button>
        ))}
      </div>
    </div>
  )
}
