"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "@/components/ui/multiselector";
import { LoadingSpinner } from "@/components/ui/spinner";
import { submitLocations } from "@/lib/actions";

const formSchema = z.object({
    value: z.array(z.string()),
});

type FormSchema = z.infer<typeof formSchema>;

interface MultiSelectFormProps {
    title: string;
    description: string | null;
    options: { name: string }[];
}

export default function MultiSelectForm({ title, description, options }: MultiSelectFormProps) {
    const [submittedValues, setSubmittedValues] = useState(new Set<string>());
    const [loading, setLoading] = useState(false);
    const multiForm = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: { value: [] },
    });

    const onSubmit = async (data: FormSchema) => {
        if (data.value.length === 0) {
            toast.error("Please select at least one option.");
            return;
        }

        const newValues = new Set(submittedValues);
        data.value.forEach((value) => newValues.add(value));
        setSubmittedValues(newValues);

        setLoading(true);
        try {
            await submitLocations(Array.from(newValues));
            toast.success("Options submitted");
            console.log("Submitted Values Set:", newValues);
        } catch (error) {
            console.error("Error submitting data:", error);
            toast.error("Failed to submit data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <div className="mb-4">
                <Form {...multiForm}>
                    <form
                        id="multiSelectForm"
                        onSubmit={multiForm.handleSubmit(onSubmit)}
                        className="flex flex-col items-center"
                    >
                        <FormField
                            control={multiForm.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem className="w-full mb-4">
                                    <MultiSelector onValuesChange={field.onChange} values={field.value}>
                                        <MultiSelectorTrigger className="w-full  gap-y-2">
                                            <MultiSelectorInput placeholder={title} />
                                        </MultiSelectorTrigger>
                                        <MultiSelectorContent className="z-50">
                                            <MultiSelectorList className="">
                                                {options.map((option) => (
                                                    <MultiSelectorItem key={option.name} value={option.name}>
                                                        <span className="flex w-full justify-start space-x-2">{option.name}</span>
                                                    </MultiSelectorItem>
                                                ))}
                                            </MultiSelectorList>
                                        </MultiSelectorContent>
                                    </MultiSelector>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 

                        Do Something for buttons 
                        
                        <Button type="submit" form="multiSelectForm" size={"lg"} disabled={loading}>
                            {loading ? <LoadingSpinner size={24} /> : "Submit"}
                        </Button> */}
                    </form>
                </Form>
            </div>
        </div>
    );
}
