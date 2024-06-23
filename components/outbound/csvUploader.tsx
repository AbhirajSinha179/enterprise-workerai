import { Paperclip } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
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
    FileInput,
    FileUploader,
    FileUploaderContent,
    FileUploaderItem,
} from "@/components/ui/uploader";

const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
    accept: {
        'text/csv': ['.csv']
    },
};
interface CSVUploader {
    cardTitle: string;
    cardDescription: string;
}

export default function CSVUpload({ cardTitle, cardDescription }: CSVUploader) {
    const [files, setFiles] = useState<File[] | null>(null);

    const handleSubmitCSV = () => {
        toast.success("CSV File(s) submitted: " + (files ? files.map(f => f.name).join(", ") : "No files"));
        console.log("CSV File(s):", files);
    };

    return (
        <Card x-chunk="dashboard-04-chunk-2">
            <CardHeader>
                <CardTitle className=" mx-1 text-primary"> {cardTitle}</CardTitle>
                <CardDescription className=" mx-1 text-primary">
                    {cardDescription}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex my-2">
                    <div className="outline-dashed outline-1 outline-muted rounded-md w-full mx-1">
                        <FileUploader
                            value={files}
                            onValueChange={setFiles}
                            dropzoneOptions={dropZoneConfig}
                            className="relative bg-muted rounded-lg py-2"
                        >
                            <FileInput>
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
                            </FileInput>
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
                </div>
            </CardContent>
            <CardFooter className="border-t  p-4">
                <div className="flex flex-col justify-center mx-3">
                    <Button type="button" onClick={handleSubmitCSV} size={"lg"}>Submit</Button>
                </div>
            </CardFooter>
        </Card>
    );
}
