"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import InputWithCommas from "@/components/custom-components/input-with-commas";
import { ContentLayout } from "@/components/layout/content-layout";
import CSVUpload from "@/components/outbound/csvUploader";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multiselector";

const formSchema = z.object({
  value: z.array(z.string()).nonempty("Please select at least one person"),
});

type FormSchema = z.infer<typeof formSchema>;

const locations = [
  { name: "India" },
  { name: "USA" },
  { name: "Germany" },
];

export default function OutboundSetting() {
  const [submittedValues, setSubmittedValues] = useState(new Set<string>());
  const multiForm = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { value: [] },
  });

  const onSubmit = (data: FormSchema) => {
    toast.success("Form submitted: " + JSON.stringify(data, null, 2));
    const newValues = new Set(submittedValues);
    data.value.forEach((value) => newValues.add(value));
    setSubmittedValues(newValues);
    console.log("Submitted Values Set:", newValues);
  };

  return (
    <ContentLayout title="Outbound Settings">
      <div className="grid gap-6">
        <CSVUpload cardTitle="Upload CSV" cardDescription="Lorem, ipsum dolor sit amet consectetur adipisicing" />

        <Card x-chunk="dashboard-04-chunk-1">
          <CardHeader>
            <CardTitle>Location</CardTitle>
            <CardDescription>
              Lorem, ipsum dolor sit amet consectetur adipisicing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full mt-5 ">
              <Form {...multiForm}>
                <form
                  onSubmit={multiForm.handleSubmit(onSubmit)}
                  className="flex items-center  w-full  px-2 "
                >
                  <FormField
                    control={multiForm.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem className="w-full  pr-2">
                        <MultiSelector
                          onValuesChange={field.onChange}
                          values={field.value}
                        >
                          <MultiSelectorTrigger>
                            <MultiSelectorInput placeholder="Select people to invite" />
                          </MultiSelectorTrigger>
                          <MultiSelectorContent className="z-50">
                            <MultiSelectorList className="bg-card">
                              {locations.map((user) => (
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
                  <div className="flex  mx-2">
                    <Button type="submit" size={"lg"}>
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4"></CardFooter>
        </Card>

        <InputWithCommas
          cardTitle="Job Titles"
          cardDescription="Lorem, ipsum dolor sit amet consectetur adipisicing"
        />
        <InputWithCommas
          cardTitle="Outbound Keywords"
          cardDescription="Lorem, ipsum dolor sit amet consectetur adipisicing"
        />
        <InputWithCommas
          cardTitle="Add blacklisted email domains"
          cardDescription="Lorem, ipsum dolor sit amet consectetur adipisicing"
        />
      </div>
    </ContentLayout>
  );
}
