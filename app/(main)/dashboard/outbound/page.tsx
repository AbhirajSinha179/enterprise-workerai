"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/extension/multiselector";
import { ContentLayout } from "@/components/layout/content-layout";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  value: z.array(z.string()).nonempty("Please select at least one person"),
});

type FormSchema = z.infer<typeof formSchema>;

const users = [
  { name: "ThePrimeagen" },
  { name: "Shadcn" },
  { name: "Theo" },
];

export default function OutboundSetting() {
  const [submittedValues, setSubmittedValues] = useState(new Set<string>());

  const multiForm = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { value: [] },
  });

  const onSubmit = (data: FormSchema) => {
    toast.success("Form submitted: " + JSON.stringify(data, null, 2));
    // Add the submitted values to the set
    const newValues = new Set(submittedValues);
    data.value.forEach((value) => newValues.add(value));
    setSubmittedValues(newValues);
    console.log("Submitted Values Set:", newValues);
  };

  return (
    <ContentLayout title="Outbound Settings">
      <div className="flex flex-row">
        <div className="w-full">
          <Form {...multiForm}>
            <form
              onSubmit={multiForm.handleSubmit(onSubmit)}
              className="flex items-center space-x-2 w-full p-2"
            >
              <FormField
                control={multiForm.control}
                name="value"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <MultiSelector
                      onValuesChange={field.onChange}
                      values={field.value}
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="Select people to invite" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent className="z-50">
                        <MultiSelectorList className="bg-card">
                          {users.map((user) => (
                            <MultiSelectorItem key={user.name} value={user.name}>
                              <div className="flex space-x-2 justify-start w-full">
                                <span>{user.name}</span>
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
              <Button type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </ContentLayout>
  );
}
