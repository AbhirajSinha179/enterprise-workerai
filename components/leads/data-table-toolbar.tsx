"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { DataTableViewOptions } from "@/components/leads/data-table-view-options"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  hasSelectedRows: Boolean
  selectedRows: string

}
function handleExport(selectedRows: string) {
  console.log("Multiple Export: ", selectedRows);
}
function handleMultipleDelete(selectedRows: string) {
  console.log("Multiple Delete : ", selectedRows);
}

export function DataTableToolbar<TData>({
  table,
  hasSelectedRows,
  selectedRows
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  console.log("this is sis is s", selectedRows)

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center ">
        <Input
          placeholder="Search by name "
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-96 focus-visible:ring-offset-0"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 mx-2 "
          >
            Reset
            <Cross2Icon className="ml-2 size-4" />
          </Button>
        )}
      </div>
      <div className={`flex mx-2 ${hasSelectedRows ? 'opacity-100 transition-opacity duration-500' : 'opacity-0'} `}>
        <Button onClick={() => alert('Export clicked')} variant={"secondary"} size="sm" className="mx-2">Export</Button>
        <Button onClick={() => alert('Delete clicked')} variant={"secondary"} size="sm" >Delete</Button>
      </div>


      <DataTableViewOptions table={table} />
    </div>
  )
}
