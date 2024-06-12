// import addDays from "date-fns/addDays"
// import addHours from "date-fns/addHours"
// import format from "date-fns/format"
import { format } from "date-fns"
import { MoreVertical, Reply } from "lucide-react"

import { Mail } from "@/components/inbox/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "../ui/scroll-area"

interface MailDisplayProps {
  mail: Mail | null
}

// TODO: Need to change to threads, in order to display full email conversations

export function MailDisplay({ mail }: MailDisplayProps) {
  // const today = new Date()

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">

        <div className="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <Reply className="size-4" />
                <span className="sr-only">Reply</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply</TooltipContent>
          </Tooltip>
        </div>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={!mail}>
              <MoreVertical className="size-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
            <DropdownMenuItem>Star thread</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
      {mail ? (
        <div className="flex flex-1 flex-col">
          <ScrollArea className="h-[70vh]">
            <div className="flex flex-row">
              <div className="flex p-4 flex-col  ">
                <div>
                  <Avatar>
                    <AvatarImage alt={mail.name} />
                    <AvatarFallback>
                      {mail.name
                        .split(" ")
                        .map((chunk) => chunk[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="bg-white mx-auto m-4 h-[160px] w-px">
                </div>
                <div>
                  <Avatar>
                    <AvatarImage alt={mail.name} />
                    <AvatarFallback>
                      {mail.name
                        .split(" ")
                        .map((chunk) => chunk[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="flex flex-col  justify-between " >
                <div>
                  <div className="">
                    <div className=" overflow-auto ">
                      <div className="flex  p-4">
                        <div className="flex items-start gap-4 text-sm">
                          <div className="grid gap-1">
                            <div className="font-semibold">{mail.name}</div>
                            <div className="line-clamp-1 text-xs">{mail.subject}</div>
                            <div className="line-clamp-1 text-xs">
                              <span className="font-medium">Reply-To:</span> {mail.email}
                            </div>
                          </div>
                        </div>
                        {mail.date && (
                          <div className="ml-auto text-xs text-muted-foreground">{format(new Date(mail.date), "PPpp")}</div>
                        )}
                      </div>
                      {/* <Separator /> */}
                      <div className="flex-1 whitespace-pre-wrap p-4 text-sm">{mail.text}</div>

                      <Separator className="mt-auto" />
                      {/* Thread starts  */}
                      <div className="flex flex-col ">
                        <div className="flex   text-sm  justify-start  p-2 mt-2 mx-2">
                          <div className="">
                            <div className="font-semibold">{mail.name}</div>
                          </div>
                        </div>
                        <div className="flex whitespace-pre-wrap p-4 text-sm ">{mail.text}</div>
                        <Separator className="mt-auto" />
                      </div>
                      <div className="flex flex-col ">
                        <div className="flex   text-sm  justify-start  p-2 mt-2 mx-2">
                          <div className="">
                            <div className="font-semibold">{mail.name}</div>
                          </div>
                        </div>
                        <div className="flex whitespace-pre-wrap p-4 text-sm ">{mail.text}</div>
                        <Separator className="mt-auto" />
                      </div>
                      <div className="flex flex-col ">
                        <div className="flex   text-sm  justify-start  p-2 mt-2 mx-2">
                          <div className="">
                            <div className="font-semibold">{mail.name}</div>
                          </div>
                        </div>
                        <div className="flex whitespace-pre-wrap p-4 text-sm ">{mail.text}</div>
                        <Separator className="mt-auto" />
                      </div>
                    </div>

                  </div>

                  {/* </ScrollArea> */}
                </div>



              </div>


            </div>

          </ScrollArea>



          <div className="p-2    flex ">
            <form className="w-full">
              <div className="grid gap-4">
                <Textarea className="p-4" placeholder={`Reply ${mail.name}...`} />
                <div className="flex items-center">
                  <Button onClick={(e) => e.preventDefault()} size="sm" className="ml-auto">
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>


        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">No message selected</div>
      )}
    </div>
  )
}
