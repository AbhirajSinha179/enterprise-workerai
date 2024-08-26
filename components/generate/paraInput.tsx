"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { PauseCircle, PlayCircle, Trash } from "lucide-react";

const FormSchema = z.object({
    prompt: z
        .string()
        .min(10, {
            message: "Prompt must be at least 10 characters.",
        })
        .max(160, {
            message: "Prompt must not be longer than 160 characters.",
        }),
    signal: z.array(z.string()).nonempty("Select at least one signal."),
});

const preWrittenOutput = `
Dear [Recipient],

I hope this email finds you well. I am writing to introduce you to our new product, which has been designed to help streamline your workflow and increase productivity. Our product offers a range of features that are tailored to meet the needs of professionals like yourself.

We are confident that our product will provide significant value to your work, and we would be delighted to offer you a free trial to experience its benefits firsthand.

Thank you for considering our offer. We look forward to your positive response.

Best regards,
[Your Name]
`;

interface ParaInputProps {
    showOutput: Boolean;
    placeholderText: string;
    index: number;
    onDelete: (index: number) => void;
}

const ParaInput = ({ showOutput, placeholderText, index, onDelete }: ParaInputProps) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const [isPlaying, setIsPlaying] = useState(false);
    console.log("THE TEXT TO BE PLACED IS :", placeholderText)

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log("Submitted Data:", data);
        toast.success("Prompt submitted");
        // Handle your submission logic here
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className={`my-4 p-4 rounded-md relative group border-2 ${!placeholderText || placeholderText === "prompt" ? "border-primary/25" : "border-primary/10"}`}>


            <div className="col-span-full">
                <div className="flex flex-row justify-between mb-4">
                    <div className="flex flex-row gap-x-3 items-center">
                        <Button variant="ghost" onClick={handlePlayPause}>
                            {isPlaying ? <PauseCircle size={30} /> : <PlayCircle size={30} />}
                        </Button>
                        {/* <h1 className='font-bold text-2xl my-2'>
                        
                        </h1> */}
                        <h3 className="text-2xl font-semibold leading-none tracking-tight my-2">
                            {/* Para {index} */}
                            Para
                        </h3>
                    </div>
                    <Button variant={'ghost'} onClick={() => onDelete(index)}>
                        <Trash size={20} />
                    </Button>
                </div>
                <div className="flex mx-2 w-full">
                    <Textarea
                        placeholder={placeholderText || "prompt"}
                        className="h-[50px] w-full"
                    />
                </div>
                <div className="my-4 ">
                    {isPlaying && showOutput && (
                        <div className=" mx-2 w-full">
                            <Textarea
                                placeholder="Generated result Prompt "
                                className="h-[50px] w-full"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ParaInput;
