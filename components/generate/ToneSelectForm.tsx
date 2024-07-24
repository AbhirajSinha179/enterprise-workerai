"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "@/components/ui/multiselector";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    tone: z.array(z.string()).nonempty("Select at least one tone."),
});

type FormSchema = z.infer<typeof formSchema>;

interface ToneSelectFormProps {
    options: { name: string }[];
    onSubmit: (values: FormSchema) => void;
}

export default function ToneSelectForm({ options, onSubmit }: ToneSelectFormProps) {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: { tone: [] },
    });

    const handleSubmit = (data: FormSchema) => {
        onSubmit(data);
        toast.success("Tone selected successfully");
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                    control={form.control}
                    name="tone"
                    render={({ field }) => (
                        <FormItem>
                            <MultiSelector onValuesChange={field.onChange} values={field.value}>
                                <MultiSelectorTrigger className=" gap-y-2">
                                    <MultiSelectorInput placeholder="Select Tone" />
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
                <div>

                </div>
                {/* <Button type="submit" className="">Submit</Button> */}
            </form>
        </Form>
    );
}
