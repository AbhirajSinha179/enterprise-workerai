import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "@/components/ui/multiselector";
import { submitLocations } from "@/app/api/outbound/uploadLocation";

const formSchema = z.object({
    value: z.array(z.string()).nonempty("Please select at least one option"),
});

type FormSchema = z.infer<typeof formSchema>;

interface LocationCardProps {
    cardTitle: string;
    cardDescription: string | null;
    options: { name: string }[];
}

export default function MultiSelectCard({ cardTitle, cardDescription, options }: LocationCardProps) {
    const [submittedValues, setSubmittedValues] = useState(new Set<string>());
    const multiForm = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: { value: [] },
    });

    const onSubmit = async (data: FormSchema) => {
        const newValues = new Set(submittedValues);
        data.value.forEach((value) => newValues.add(value));
        setSubmittedValues(newValues);

        try {
            await submitLocations(Array.from(newValues));
            toast.success("Options submitted");
            console.log("Submitted Values Set:", newValues);
        } catch (error) {
            console.error("Error submitting data:", error);
            toast.error("Failed to submit data");
        }
    };

    return (
        <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader className="mx-3">
                <CardTitle>{cardTitle}</CardTitle>
                <CardDescription>{cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full">
                    <Form {...multiForm}>
                        <form
                            id="locationForm"
                            onSubmit={multiForm.handleSubmit(onSubmit)}
                            className="flex items-center w-full px-2"
                        >
                            <FormField
                                control={multiForm.control}
                                name="value"
                                render={({ field }) => (
                                    <FormItem className="w-full pr-2">
                                        <MultiSelector
                                            onValuesChange={field.onChange}
                                            values={field.value}
                                        >
                                            <MultiSelectorTrigger>
                                                <MultiSelectorInput placeholder="Select options" />
                                            </MultiSelectorTrigger>
                                            <MultiSelectorContent className="z-50">
                                                <MultiSelectorList className="bg-card">
                                                    {options.map((option) => (
                                                        <MultiSelectorItem key={option.name} value={option.name}>
                                                            <div className="flex space-x-2 justify-start w-full">
                                                                <span>{option.name}</span>
                                                            </div>
                                                        </MultiSelectorItem>
                                                    ))}
                                                </MultiSelectorList>
                                            </MultiSelectorContent>
                                        </MultiSelector>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <div className="flex mx-2">
                    <Button type="submit" form="locationForm" size={"lg"}>
                        Submit
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
