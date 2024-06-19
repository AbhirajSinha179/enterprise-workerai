import { X } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface InputWithCommasProps {
    cardTitle: string;
    cardDescription: string | null;
}

export default function InputWithCommas({ cardTitle, cardDescription }: InputWithCommasProps) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.includes(",")) {
            const newValues = value.split(",").map(v => v.trim()).filter(v => v && !selectedOptions.includes(v));
            setSelectedOptions((prev) => [...prev, ...newValues]);
            setInputValue("");
        } else {
            setInputValue(value);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addOptionsFromInput();
        }
    };

    const addOptionsFromInput = () => {
        const newValues = inputValue.split(",").map(v => v.trim()).filter(v => v && !selectedOptions.includes(v));
        if (newValues.length > 0) {
            setSelectedOptions((prev) => [...prev, ...newValues]);
            setInputValue("");
        }
        submitData([...selectedOptions, ...newValues]);
        toast.success(`${cardTitle} Submitted`, {
            description: `${newValues.join(", ")}`,
        });
    };

    const handleRemove = (value: string) => {
        setSelectedOptions((prev) => prev.filter((option) => option !== value));
    };

    const submitData = async (data: string[]) => {
        console.log("data passed : ", data)
        try {
            const response = await fetch("http://localhost:3000/uploadjobtitles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({ locations: data }), // Pass the selected options as an array
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const result = await response.json();
            console.log("Success:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader className="mx-3 ">
                <CardTitle>{cardTitle}</CardTitle>
                <CardDescription>{cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full">
                    <div className="w-full flex flex-col ml-2">
                        <div className="flex items-center">
                            <Input
                                type="text"
                                placeholder="Add comma to separate"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className="no-scrollbar flex max-h-16 flex-wrap gap-2 overflow-y-auto rounded-md bg-transparent py-2">
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
            </CardContent>
            <CardFooter className="border-t p-4">
                <div className="flex mx-4">
                    <Button type="button" onClick={addOptionsFromInput} size={"lg"}>Submit</Button>
                </div>
            </CardFooter>
        </Card>
    );
}
