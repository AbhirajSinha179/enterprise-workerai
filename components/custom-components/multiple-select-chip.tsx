import { X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type MultiSelectBadgeProps = {
  options: string[];
};

export default function MultiSelectBadge({ options }: MultiSelectBadgeProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelect = (value: string) => {
    if (!selectedOptions.includes(value)) {
      setSelectedOptions((prev) => [...prev, value]);
    }
  };

  const handleRemove = (value: string) => {
    setSelectedOptions((prev) => prev.filter((option) => option !== value));
  };

  return (
    <div className="mx-0 ">

      <div className="flex max-h-16 flex-wrap gap-x-2 overflow-y-auto rounded-md bg-transparent my-3 px-2 pb-1">
        {selectedOptions.map((option, ind) => (
          <button key={ind} onClick={() => handleRemove(option)}>
            <Badge variant="secondary">
              <div className="flex items-center justify-around ">
                <div>{option}</div>
                <X className="size-4" />
              </div>
            </Badge>
          </button>
        ))}
      </div>
      <Select onValueChange={handleSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
