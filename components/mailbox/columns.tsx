"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Trash2 } from "lucide-react"
// import { unread } from "@/app/(site)/(mailbox)/data/data"
import { Mails } from "@/app/(main)/dashboard/(mailbox)/data/schema"
import { DataTableColumnHeader } from "@/components/leads/data-table-column-header"
// import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { toast } from "sonner"



function handleDelete(row: any) {
    console.log(`Deleting row with id ${row.id}`);
    toast.success(`Deleted ${row.id}`, {
        description: `${row.id} was deleted.`
    });
}
export const columns: ColumnDef<Mails>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px] ml-5"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px] ml-5"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
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
    //                     <div className=" flex items-center space-x-1">
    //                         <Badge>Unread</Badge>
    //                     </div>
    //                 )}
    //             </div>
    //         )
    //     },
    //     enableSorting: false,
    //     enableHiding: false,

    // },
    // {
    //     accessorKey: "name",
    //     header: ({ column }) => (
    //         <DataTableColumnHeader
    //             column={column}
    //             title="Name"
    //             className=" flex justify-start  w-[100px]"
    //             sortAscending={""}
    //             sortDescending={""}
    //         />
    //     ),
    //     cell: ({ row }) => <div className=" flex w-[100px]   justify-start ">{row.getValue("name")}</div>,
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Email"
                className=" flex w-[200px] justify-center     "
                sortAscending={""}
                sortDescending={""}
            />
        ),
        cell: ({ row }) => <div className="flex w-[200px] justify-center  ">{row.getValue("email")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "domain",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Domain"
                className=" flex w-[200px] justify-center     "
                sortAscending={""}
                sortDescending={""}
            />
        ),
        cell: ({ row }) => <div className="flex w-[200px] justify-center  ">{row.getValue("domain")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "warmupCapacity",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Warmup Capacity"
                className=" flex w-[200px] justify-center     "
                sortAscending={""}
                sortDescending={""}
            />
        ),
        cell: ({ row }) => <div className="flex w-[200px] justify-center  ">{row.getValue("warmupCapacity")}</div>,
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
                        <DialogDescription>
                            Do you want to blacklist this lead?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-between space-x-2">
                        <DialogClose asChild>

                            <Button onClick={() => handleDelete(row)} variant="destructive" className="flex-1">
                                Delete
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button className="flex-1">
                                Cancel
                            </Button>
                        </DialogClose>

                    </DialogFooter>
                </DialogContent>
            </Dialog>
        ),
    },
]
