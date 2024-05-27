"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
interface DataTableRowActionsProps<TData extends { id: string }> {
  row: Row<TData>
}
export function DataTableColumnActions<TData extends { id: string }>({
  row,
}: DataTableRowActionsProps<TData>) {
  function handleDelete(id: String) {
    console.log(`Deleting row with id ${id}`);
  }
  function handleExport(id: String) {
    console.log(`Export row with id ${id}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex size-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => handleExport(row.original.id)}>Export</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
          Delete
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
