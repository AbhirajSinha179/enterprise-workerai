"use client"
import { CheckCircledIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { Trash2 } from "lucide-react"
import { engaged, statuses } from "@/app/(main)/dashboard/(leads)/data/data"
import { Lead } from "@/app/(main)/dashboard/(leads)/data/schema"
import { DataTableColumnHeader } from "@/components/leads/data-table-column-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
// import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
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
import { toast } from "sonner"

function handleDelete(row: any) {
    console.log(`Deleting row with id ${row.id}`);
    toast.success(`Deleted ${row.id}`, {
        description: `${row.id} was deleted.`
    });
}
export const columns: ColumnDef<Lead>[] = [
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
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Name"
                className="mx-2 flex justify-center  w-[100px] ml-10"
                sortAscending={""}
                sortDescending={""}
            />
        ),
        cell: ({ row }) => <div className="mx-5 flex w-[100px] justify-center text-foreground ml-10">{row.getValue("name")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "company",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Company"
                className=" flex justify-center w-[220px] "
                sortAscending={""}
                sortDescending={""}
            />
        ),
        // cell: ({ row }) => <div className="flex w-[100px] justify-center text-foreground ">{row.getValue("company") ? row.getValue("company") : "null"}</div>,
        cell: ({ row }) => (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex justify-center text-foreground w-[220px] p-2 rounded-md truncate  ">
                            {row.getValue("company") ? row.getValue("company") : "null"}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{row.getValue("company") ? row.getValue("company") : "null"}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Email"
                className="flex justify-center w-[250px]" // Adjust width as needed
                sortAscending={""}
                sortDescending={""}
            />
        ),
        cell: ({ row }) => (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex justify-start text-foreground w-[220px] p-2 rounded-md truncate ">
                            {row.getValue("email")}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{row.getValue("email")}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        ),
        enableSorting: false,
        enableHiding: false,
    },



    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Workflow Stage"
                className="   flex justify-center w-[150px] "
                sortAscending="Asc"
                sortDescending="Dsc"
            />
        ),
        cell: ({ row }) => {
            const status = statuses.find((status) => status.value === row.getValue("status"))
            if (!status) {
                return null
            }
            return (
                <div className="flex  items-center justify-center space-x-1  w-[150px]  ">
                    {status.number && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex space-x-1 ">
                                        {Array.from({ length: status.number }, (_, index) => (
                                            <div key={index} >
                                                <CheckCircledIcon />
                                            </div>
                                        ))}
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{status.number} Emails sent</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "engaged",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Engaged"
                className="  flex justify-center w-[150px] "
                sortAscending="Engaged"
                sortDescending="Not Engaged"
            />
        ),
        cell: ({ row }) => {
            const engagement = engaged.find((engagement) => engagement.value === row.getValue("engaged"))

            if (!engagement) {
                return null
            }

            return (
                <div className="flex w-[150px] items-center justify-center   ">
                    {engagement.number === 0 ? (
                        <div className="mx-2 flex items-center space-x-1">
                            <Badge>Engaged</Badge>
                        </div>
                    ) : (
                        <div className="mx-2 flex items-center space-x-1">
                            <Badge> Not Engaged</Badge>
                        </div>
                    )}
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
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
                            <Button variant="secondary" className="flex-1">
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button onClick={() => handleDelete(row)} variant="destructive" className="flex-1">
                                Delete
                            </Button>
                        </DialogClose>

                    </DialogFooter>
                </DialogContent>
            </Dialog>
        ),
    },
]
