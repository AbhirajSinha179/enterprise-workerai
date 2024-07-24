"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { PauseCircle, Play, PlayCircle } from "lucide-react";

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
    index: number;
    onDelete: (index: number) => void;
}

const ParaInput = ({ index, onDelete }: ParaInputProps) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log("Submitted Data:", data);
        toast.success("Prompt submitted");
        // Handle your submission logic here
    };

    return (
        <div className="my-4 border-2 p-4 rounded-md">
            <div className="col-span-full">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-x-3">
                        <div className=" my-auto">
                            <Button variant={"ghost"}>

                                <PlayCircle size={30} />
                            </Button>
                        </div>
                        <h1 className='font-bold text-2xl my-2'>
                            Para {index}
                        </h1>


                    </div>


                    <Button variant={'destructive'} onClick={() => onDelete(index)}>Delete</Button>
                </div>
                <div className="my-4 flex flex-row">
                    <div className="flex">
                        <Select>
                            <SelectTrigger className="w-[140px] min-h-[50px]">
                                <SelectValue placeholder="Select " />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {/* <SelectLabel>Fruits</SelectLabel> */}
                                    <SelectItem value="apple">Prompt</SelectItem>
                                    <SelectItem value="banana">String</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex mx-2  w-full">

                        <Textarea
                            placeholder="Enter the Prompt"
                            className=" h-[50px] w-full"
                        />



                    </div>


                </div>

            </div>
        </div>
    );
}

export default ParaInput;
