"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Trash2 } from "lucide-react"
// import { unread } from "@/app/(site)/(mailbox)/data/data"
import { Mails } from "@/app/(main)/dashboard/(mailbox)/data/schema"
import { DataTableColumnHeader } from "@/components/leads/data-table-column-header"
// import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { toast } from "sonner"
import { deleteMailbox } from "@/lib/actions"
import { revalidatePath } from "next/cache"

export const columns: ColumnDef<Mails>[] = [
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //         className="ml-5 translate-y-[2px]"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //         className="ml-5 translate-y-[2px]"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  // {
  //     accessorKey: "unread",
  //     header: ({ column }) => (
  //         <DataTableColumnHeader
  //             column={column}
  //             title=""
  //             className=" "
  //             sortAscending={""}
  //             sortDescending={""}
  //         />
  //     ),
  //     cell: ({ row }) => {
  //         const engagement = unread.find((engagement) => engagement.value === row.getValue("unread"))

  //         if (!engagement) {
  //             return null
  //         }

  //         return (
  //             <div className=" space-x-1">
  //                 {engagement.number === 0 ? (
  //                     <></>
  //                 ) : (
  //                     <div className=" flex items-centerpace-x-1">
  //                         <Badge>Unread</Badge>
  //                     </div>
  //                 )}
  //             </div>
  //         )
  //     },
  //     enableSorting: false,
  //     enableHiding: false,

  {
    accessorKey: "id",
    header: ({ column }) => null,
    cell: ({ row }) => null,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
        className=" flex w-[200px] justify-center"
        sortAscending={""}
        sortDescending={""}
      />
    ),
    cell: ({ row }) => <div className="flex w-[200px] justify-center">{row.getValue("firstName")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Email"
        className=" flex w-[200px] justify-center"
        sortAscending={""}
        sortDescending={""}
      />
    ),
    cell: ({ row }) => <div className="flex w-[200px] justify-center">{row.getValue("email")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "warmupCapacity",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Warmup Capacity"
        className=" flex w-[200px] justify-center"
        sortAscending={""}
        sortDescending={""}
      />
    ),
    cell: ({ row }) => <div className="flex w-[200px] justify-center">{row.getValue("warmupCapacity")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "dailyCapacity",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Daily Capacity"
        className=" flex w-[200px] justify-center"
        sortAscending={""}
        sortDescending={""}
      />
    ),
    cell: ({ row }) => <div className="flex w-[200px] justify-center">{row.getValue("dailyCapacity")}</div>,
    enableSorting: false,
    enableHiding: false,
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <Trash2 className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-1/6">
          <DialogHeader>
            <DialogTitle>Delete this Lead</DialogTitle>
            <DialogDescription>Do you want to blacklist this lead?</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between space-x-2">
            <DialogClose asChild>
              <Button variant="secondary" className="flex-1">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={async () => {
									// const emailId: string = row.getValue("id")
									const emailId = "13221"
                  const res = await deleteMailbox(emailId)
									// console.log(res)
									if (!res.success) {
										toast.error("An error occurred");
									}
									// revalidatePath("/dashboard/mailbox")
                }}
                variant="destructive"
                className="flex-1"
              >
                Delete
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  },
]
