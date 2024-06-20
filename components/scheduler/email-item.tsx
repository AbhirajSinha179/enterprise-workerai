"use client"

import { format } from "date-fns"
import { Trash } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { CheckCircledIcon } from "@radix-ui/react-icons"; // Ensure this is the correct path for your icon
import { Separator } from "../ui/separator"

export default function EmailItem({ item, handleApprove, handleEdit, handleDelete }: { item: any, handleApprove: any, handleEdit: any, handleDelete: any }) {
  const [subject, setSubject] = useState(item?.subject)
  const [body, setBody] = useState(item?.body)

  const renderStatusIcons = (status: number) => {
    return (
      <div className="flex items-center space-x-1  my-1">
        {Array.from({ length: status }).map((_, index) => (
          <CheckCircledIcon key={index} width={20} height={20} />
        ))}
      </div>
    )
  }

  return (
    <>
      <div className={cn("flex w-full flex-col items-start gap-2 rounded-lg border p-4 text-left transition-all")}>
        <div className="flex w-full flex-col gap-1">
          <div className="flex justify-between">
            <div className="text-2xl font-semibold flex">{item.recipient}</div>
            <div className=" flex  ">
              <div className="">
                {item.status && renderStatusIcons(item.status)}
              </div>
              <div className="flex items-center h-6 mx-2">
                <Separator orientation="vertical" />
              </div>
              <div className={cn("ml-auto")}>{format(new Date(item.date), "PP")}</div>
            </div>
          </div>
          <div className="text-md font-medium">{item.subject}</div>

        </div>
        <div className="text-xs text-muted-foreground">{item.body}</div>
        <div className="mt-2 flex w-full items-center justify-between">
          <Button onClick={() => handleDelete(item?.recipient)} variant="outline" size="icon" className="size-8">
            <Trash size={6} className="size-4" />
          </Button>
          <div className="space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[725px]">
                <DialogHeader>
                  <DialogTitle>Edit email to {item?.recipient ?? "random@example.com"}</DialogTitle>
                  <DialogDescription>
                    Make changes to the email here. Click save when you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject" className="text-right">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      defaultValue={item.subject ?? ""}
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="body" className="text-right">
                      Email Body
                    </Label>
                    <Textarea
                      id="body"
                      defaultValue={item.body ?? ""}
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      className="col-span-3 max-h-[300px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="submit" onClick={() =>
                      handleEdit(item.recipient, subject, body)}>
                      Save changes
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button onClick={() => handleApprove(item?.recipient)} asChild className="h-8 min-w-fit cursor-pointer">
              <span>Smart Schedule</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
