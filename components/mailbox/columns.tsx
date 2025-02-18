"use client"
import { ColumnDef } from "@tanstack/react-table";
import { Mails } from "@/app/(main)/dashboard/(mailbox)/data/schema";
import { ActionButtons } from "./action";

export const columns = (refreshData: () => void): ColumnDef<Mails>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => null,
    cell: ({ row }) => null,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("firstName")}</div>,
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => <div>{row.getValue("position")}</div>,
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => <div>{row.getValue("company")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "warmupCapacity",
    header: "Warmup Capacity",
    cell: ({ row }) => <div>{row.getValue("warmupCapacity")}</div>,
  },
  {
    accessorKey: "dailyCapacity",
    header: "Daily Capacity",
    cell: ({ row }) => <div>{row.getValue("dailyCapacity")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionButtons
        id={row.getValue("id")}
        firstName={row.getValue("firstName")}
        position={row.getValue("position")}
        refreshData={refreshData}
      />
    ),
  },
];
