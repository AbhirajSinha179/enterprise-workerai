"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "@/components/ui/multiselector";

const formSchema = z.object({
    value: z.array(z.string()),
});

type FormSchema = z.infer<typeof formSchema>;

interface MultiSelectFormProps {
    title: string;
    description: string | null;
    options: { name: string }[];
    onChange: (values: string[]) => void;
}

export default function MultiSelectForm({ title, description, options, onChange }: MultiSelectFormProps) {
    const multiForm = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: { value: [] },
    });

    const handleChange = (values: string[]) => {
        multiForm.setValue("value", values);
        onChange(values);
    };

    return (
        <div className="">
            <div className="mb-4">
                <Form {...multiForm}>
                    <FormField
                        control={multiForm.control}
                        name="value"
                        render={({ field }) => (
                            <FormItem className="w-full mb-4">
                                <MultiSelector onValuesChange={handleChange} values={field.value}>
                                    <MultiSelectorTrigger className="w-full gap-y-2">
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
                </Form>
            </div>
        </div>
    );
}
