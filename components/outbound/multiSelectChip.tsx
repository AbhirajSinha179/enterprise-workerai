import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "@/components/ui/multiselector";
import { LoadingSpinner } from "@/components/ui/spinner";
import { submitLocations } from "@/lib/actions";

const formSchema = z.object({
    value: z.array(z.string()),
});

type FormSchema = z.infer<typeof formSchema>;

interface LocationCardProps {
    cardTitle: string;
    cardDescription: string | null;
    options: { name: string }[];
}

export default function MultiSelectCard({ cardTitle, cardDescription, options }: LocationCardProps) {
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
    //primary for text ie creame 

    return (
      <Card>
        <CardHeader className="mx-3">
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <LoadingSpinner size={45} />
            </div>
          ) : (
            <div className="w-full">
              <Form {...multiForm}>
                <form
                  id="locationForm"
                  onSubmit={multiForm.handleSubmit(onSubmit)}
                  className="flex w-full items-center px-2 "
                >
                  <FormField
                    control={multiForm.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem className="w-full pr-2">
                        <MultiSelector onValuesChange={field.onChange} values={field.value}>
                          <MultiSelectorTrigger className="">
                            <MultiSelectorInput placeholder="Select options" />
                          </MultiSelectorTrigger>
                          <MultiSelectorContent className="z-50">
                            <MultiSelectorList className="">
                              {options.map((option) => (
                                <MultiSelectorItem key={option.name} value={option.name}>
                                  <span className="flex w-full justify-start space-x-2 ">{option.name}</span>
                                </MultiSelectorItem>
                              ))}
                            </MultiSelectorList>
                          </MultiSelectorContent>
                        </MultiSelector>
                        <FormMessage className="text-white" />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <div className="mx-2 flex">
            <Button type="submit" form="locationForm" size={"lg"} disabled={loading}>
              Submit
            </Button>
          </div>
        </CardFooter>
      </Card>
    )
}