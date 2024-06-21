import { format } from "date-fns";
import { Trash, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function EmailItem({ item }: any) {
  const router = useRouter();
  const [subject, setSubject] = useState(item?.subject);
  const [body, setBody] = useState(item?.body);
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isMutating = isPending || isFetching;

  const handleApprove = async () => {
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
      startTransition(() => {
        router.refresh();
      });
    }, 1000);
  };

  const handleEdit = async () => {
    setTimeout(() => {
      console.log(subject, body);
      toast("Email successfully edited", {
        description: new Date().toLocaleTimeString(),
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }, 500);
  };

  const handleDelete = async () => {
    // Implement delete logic here
  };

  const handleRegenerateResponse = async () => {
    // Implement regenerate response logic here
  };

  return (
    <>
      <div className={cn("flex w-full flex-col items-start gap-2 rounded-lg border p-4 text-left transition-all")}>
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center">
            <div className="text-2xl font-semibold">{item.recipient}</div>
            <div className={cn("ml-auto")}>{format(new Date(item.date), "PP")}</div>
          </div>
          <div className="text-md font-medium">{subject}</div>
        </div>
        <div className="text-xs text-muted-foreground">{body}</div>
        <div className="mt-2 flex w-full items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button onClick={handleDelete} variant="outline" size="icon" className="size-8">
              <Trash size={6} className="size-4" />
            </Button>
            <Button onClick={handleRegenerateResponse} variant="outline" size="icon" className="size-8">
              <RefreshCw size={6} className="size-4" />
            </Button>  
          </div>
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
                    <Button type="submit" onClick={handleEdit}>
                      Save changes
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button onClick={handleApprove} asChild className="h-8 min-w-fit cursor-pointer">
              <span>Smart Schedule</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
