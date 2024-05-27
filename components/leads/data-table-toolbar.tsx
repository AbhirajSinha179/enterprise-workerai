"use client"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { DataTableViewOptions } from "@/components/leads/data-table-view-options"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  hasSelectedRows: boolean
  selectedRows: Record<string, boolean>
  actionButtons: boolean
}

function handleExport(selectedRows: Record<string, boolean>) {
  console.log("Multiple Export: ", selectedRows)
}

function handleMultipleDelete(selectedRows: Record<string, boolean>) {
  console.log("Multiple Delete : ", selectedRows)
}

export function DataTableToolbar<TData>({
  table,
  hasSelectedRows,
  selectedRows,
  actionButtons,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center">
        <Input
          placeholder="Search by name"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-10 w-96 focus-visible:ring-offset-0"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 mx-2"
          >
            Reset
            <Cross2Icon className="ml-2 size-4" />
          </Button>
        )}
      </div>
      <div
        className={`flex mx-2 ${hasSelectedRows
          ? 'opacity-100 transition-opacity duration-500'
          : 'opacity-0'
          }`}
      >
        {actionButtons && (
          <Button
            onClick={() => handleExport(selectedRows)}
            variant="secondary"
            size="lg"
            className="mx-2"
          >
            Export
          </Button>
        )}
        <Button
          onClick={() => handleMultipleDelete(selectedRows)}
          variant="secondary"
          size="lg"
        >
          Delete
        </Button>
      </div>
      {actionButtons && <DataTableViewOptions table={table} />}
    </div>
  )
}
