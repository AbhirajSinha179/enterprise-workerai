"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip } from "lucide-react";
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
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/extension/uploader";
import { ContentLayout } from "@/components/layout/content-layout";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import InputWithCommas from "@/components/custom-components/input-with-commas";

const formSchema = z.object({
  value: z.array(z.string()).nonempty("Please select at least one person"),
});

type FormSchema = z.infer<typeof formSchema>;

const users = [
  { name: "ThePrimeagen" },
  { name: "Shadcn" },
  { name: "Theo" },
];
const locations = [
  { name: "India" },
  { name: "USA" },
  { name: "Germany" },
];

export default function OutboundSetting() {
  const [submittedValues, setSubmittedValues] = useState(new Set<string>());
  const [files, setFiles] = useState<File[] | null>(null);
  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
    accept: {
      'text/csv': ['.csv']
    },
  };

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

  const handleSubmitCSV = () => {
    console.log("CSV File:", files)
  }

  return (
    <ContentLayout title="Outbound Settings">
      <div className="flex flex-col my-5 ">
        <div className=" flex my-2 h-[120px]">
          <div className="outline-dashed outline-1 outline-muted rounded-md w-full mx-2">
            <FileUploader
              value={files}
              onValueChange={setFiles}
              dropzoneOptions={dropZoneConfig}
              className="relative bg-background rounded-lg py-2 "
            >
              <FileInput >
                <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full">
                  <>
                    <svg
                      className="size-8 mb-3 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>
                      &nbsp; or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Upload CSV file
                    </p>
                  </>
                </div>
              </FileInput >
              <FileUploaderContent>
                {files &&
                  files.length > 0 &&
                  files.map((file, i) => (
                    <FileUploaderItem key={i} index={i}>
                      <Paperclip className="size-4 stroke-current" />
                      <span>{file.name}</span>
                    </FileUploaderItem>
                  ))}
              </FileUploaderContent>
            </FileUploader>
          </div>

          <div className="flex flex-col justify-center mx-1">
            <Button type="button" onClick={handleSubmitCSV}>Submit</Button>
          </div>
        </div>

        <div className="w-full mt-5">
          <h1 className=" w-full px-2 " >Location</h1>
          <Form {...multiForm}>
            <form
              onSubmit={multiForm.handleSubmit(onSubmit)}
              className="flex items-center space-x-2 w-full px-2"
            >
              <FormField
                control={multiForm.control}
                name="value"
                render={({ field }) => (
                  <FormItem className="grow">
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
              <Button type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </div>
        <div className="w-full mt-5 ">
          <h1 className="w-full px-2 mb-2">Job Titles</h1>
          <InputWithCommas >
          </InputWithCommas>
        </div>
        <div className="w-full mt-5 ">
          <h1 className="w-full px-2 mb-2">Outbound Keywords</h1>
          <InputWithCommas >
          </InputWithCommas>
        </div>
        <div className="w-full mt-5 ">
          <h1 className="w-full px-2 mb-2">Add blacklisted email domains</h1>
          <InputWithCommas >
          </InputWithCommas>
        </div>


      </div>
    </ContentLayout>
  );
}
