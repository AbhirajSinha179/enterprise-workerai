"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
// import { toast } from "@/components/ui/sonner";

const FormSchema = z.object({
    bio: z
        .string()
        .min(10, {
            message: "Bio must be at least 10 characters.",
        })
        .max(160, {
            message: "Bio must not be longer than 160 characters.",
        }),
});

export function TextareaForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        // toast({
        //     title: "You submitted the following values:",
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //         </pre>
        //     ),
        // });
        console.log("Successs   ")
    }
    // mx-8
    return (
        <div className=" my-2">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel>Bio</FormLabel> */}
                                <FormControl>
                                    <Textarea
                                        placeholder="Pregenerated Content "
                                        className="resize-none min-h-[50px]"
                                        {...field}
                                    />
                                </FormControl>
                                {/* <FormDescription>
                                You can <span>@mention</span> other users and organizations.
                            </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="">Submit</Button>
                </form>
            </Form>

        </div>

    );
}
