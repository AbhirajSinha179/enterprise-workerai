import { X } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { submitJobTitles } from "@/lib/actions";
import { submitKeywords } from "@/lib/actions";
import { submitBlocklisted } from "@/lib/actions";
import { LoadingSpinner } from "@/components/ui/spinner"; // Adjust the import path as necessary

interface InputWithCommasProps {
    cardTitle: string;
    cardDescription: string | null;
}

export default function InputWithCommas({ cardTitle, cardDescription }: InputWithCommasProps) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [loading, setLoading] = useState(false);

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

    const addOptionsFromInput = async () => {
        const newValues = inputValue.split(",").map(v => v.trim()).filter(v => v && !selectedOptions.includes(v));
        if (newValues.length > 0) {
            setSelectedOptions((prev) => [...prev, ...newValues]);
            setInputValue("");
        }
        if (selectedOptions.length === 0 && newValues.length === 0) {
            toast.error("Please add at least one option before submitting.");
            return;
        }
        try {
            setLoading(true);
            await submitData([...selectedOptions, ...newValues]);
            toast.success(`${cardTitle} Submitted`, {
                description: `${newValues.join(", ")}`,
            });
        } catch (error) {
            console.error("Error submitting data:", error);
            toast.error("Failed to submit data");
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = (value: string) => {
        setSelectedOptions((prev) => prev.filter((option) => option !== value));
    };

    const submitData = async (data: string[]) => {
        try {
            if (cardTitle === "Job Titles") {
                await submitJobTitles(data);
            } else if (cardTitle === "Outbound Keywords") {
                await submitKeywords(data);
            } else if (cardTitle === "Blacklisted email domains") {
                await submitBlocklisted(data);
            }
            toast.success(`${cardTitle} submitted successfully`);
        } catch (error) {
            console.error("Error submitting data:", error);
            toast.error("Failed to submit data");
            throw error;
        }
    };

    return (
        <Card>
            <CardHeader className="mx-3">
                <CardTitle>{cardTitle}</CardTitle>
                <CardDescription>{cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <div className="w-full">
                        <div className="w-full flex flex-col ml-2">
                            <div className="flex items-center">
                                <Input
                                    type="text"
                                    placeholder="Add comma to separate"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    className=" mr-6 h-11"
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
                )}
            </CardContent>
            <CardFooter className="border-t p-4">
                <div className="flex mx-4">
                    <Button type="button" onClick={addOptionsFromInput} size={"lg"} disabled={loading}>
                        Submit
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
