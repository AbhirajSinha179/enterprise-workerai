"use client"
import { CheckCircledIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { Trash2 } from "lucide-react"
import { engaged, statuses } from "@/app/(main)/dashboard/(leads)/data/data"
import { Leads } from "@/app/(main)/dashboard/(leads)/data/schema"
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
function handleDelete(row: any) {
    console.log(`Deleting row with id ${row.id}`)
}
export const columns: ColumnDef<Leads>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
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
                className="mx-5 flex justify-center"
                sortAscending={""}
                sortDescending={""}
            />
        ),
        cell: ({ row }) => <div className="mx-5 flex w-[100px] justify-center">{row.getValue("name")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "company",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Company"
                className="mx-5 flex justify-center"
                sortAscending={""}
                sortDescending={""}
            />
        ),
        cell: ({ row }) => <div className="flex w-[100px] justify-center">{row.getValue("company")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Email"
                className=" flex w-[200px] justify-center   "
                sortAscending={""}
                sortDescending={""}
            />
        ),
        cell: ({ row }) => <div className="flex w-[200px] justify-center ">{row.getValue("email")}</div>,
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Workflow Stage"
                className=" mr-10  flex w-[150px] justify-center"
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
                <div className="flex w-[150px] items-center justify-center space-x-1 ">
                    {status.number && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex space-x-1">
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
                className=" mr-5 flex justify-center"
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
                <div className="flex w-[150px] items-center justify-center space-x-1">
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
            <Button onClick={() => handleDelete(row)} variant="ghost">
                <Trash2 className="size-4" />
            </Button>
        ),
    },
]
