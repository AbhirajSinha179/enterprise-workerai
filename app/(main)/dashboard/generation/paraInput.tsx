"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import MultiSelectForm from '@/components/generate/MultiSelectForm'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'

const FormSchema = z.object({
    prompt: z
        .string()
        .min(10, {
            message: "Bio must be at least 10 characters.",
        })
        .max(160, {
            message: "Bio must not be longer than 160 characters.",
        }),
    tone: z.array(z.string()).nonempty("Select at least one tone."),
    signal: z.array(z.string()).nonempty("Select at least one signal."),
});

const locations = [
    { name: "India" },
    { name: "USA" },
    { name: "Germany" },
];

const preWrittenOutput = `
Dear [Recipient],

I hope this email finds you well. I am writing to introduce you to our new product, which has been designed to help streamline your workflow and increase productivity. Our product offers a range of features that are tailored to meet the needs of professionals like yourself.

We are confident that our product will provide significant value to your work, and we would be delighted to offer you a free trial to experience its benefits firsthand.

Thank you for considering our offer. We look forward to your positive response.

Best regards,
[Your Name]
`;

const ParaInput = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log("Submitted Data:", data);
        // Handle your submission logic here
    };

    return (
        <div>
            <div className="col-span-full">
                <h1 className='font-bold text-2xl my-2'>
                    Para 1
                </h1>
                <div className="my-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-3">
                            <FormField
                                control={form.control}
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Pregenerated Content"
                                                className="resize-none min-h-[50px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="tone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <MultiSelectForm
                                                title="Select Tone"
                                                description="Choose one or more tones from the list below."
                                                options={locations}
                                                onChange={field.onChange}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="signal"
                                    render={({ field }) => (
                                        <FormItem>
                                            <MultiSelectForm
                                                title="Select Signal"
                                                description="Choose one or more signals from the list below."
                                                options={locations}
                                                onChange={field.onChange}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="mt-2">Submit</Button>

                            </div>

                        </form>
                    </Form>
                </div>
                <div className='mt-4'>
                    <Textarea value={preWrittenOutput} disabled className='min-h-[300px] overflow-auto' />
                </div>
            </div>
        </div>
    );
}

export default ParaInput;
