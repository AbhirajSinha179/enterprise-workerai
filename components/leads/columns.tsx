"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/leads/data-table-column-header"
import { DataTableRowActions } from "@/components/leads/data-table-row-actions"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { labels, priorities, statuses } from "@/data/data"
import { Task } from "@/data/schema"
import { Button } from "../ui/button"
import { Delete, Recycle, Trash, Trash2 } from "lucide-react"


function handleDelete(row: Task) {
    // Code to delete the row
    console.log(`Deleting row with id ${row.id}`);
}


export const columns: ColumnDef<Task>[] = [

    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
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
            <DataTableColumnHeader column={column} title="Name" className="flex justify-center mx-5" />
        ),
        cell: ({ row }) => <div className="w-[100px] flex justify-center mx-5">{row.getValue("name")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "company",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Company" className="flex justify-center mx-5" />
        ),
        cell: ({ row }) => <div className="w-[100px] flex justify-center">{row.getValue("company")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" className=" flex justify-center w-[200px]   " />
        ),
        cell: ({ row }) => <div className="w-[200px] flex justify-center ">{row.getValue("email")}</div>,
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Workflow Stage" className=" w-[150px]  flex justify-center mr-10" />
        ),
        cell: ({ row }) => {
            const status = statuses.find(
                (status) => status.value === row.getValue("status")
            )

            if (!status) {
                return null
            }

            return (
                <div className="flex w-[150px]  items-center justify-center ">
                    {status.icon && (
                        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "engaged",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Engaged" className=" flex justify-center mr-5" />
        ),
        cell: ({ row }) => {
            const priority = priorities.find(
                (priority) => priority.value === row.getValue("engaged")
            )

            if (!priority) {
                return null
            }

            return (
                <div className="flex items-center  flex justify-center mr-5 truncate">
                    {priority.icon && (
                        <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
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
            <Button onClick={() => handleDelete(row.original)} variant="ghost" ><Trash2 className="size-4" /></Button>
        ),
    },
]