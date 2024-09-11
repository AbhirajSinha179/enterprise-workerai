"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash2 } from "lucide-react"
// import { unread } from "@/app/(site)/(mailbox)/data/data"
import { Mails } from "@/app/(main)/dashboard/(mailbox)/data/schema"
import { DataTableColumnHeader } from "@/components/leads/data-table-column-header"
// import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "../ui/input"
import { toast } from "sonner"
import { deleteMailbox } from "@/lib/actions"
import { revalidatePath } from "next/cache"
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
import { useState } from "react"

interface EditData {
  id: string,
  firstName: string;
  position: string;
}

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
    accessorKey: "company",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Company"
        className=" flex justify-center w-[100px] "
        sortAscending={""}
        sortDescending={""}
      />
    ),
    cell: ({ row }) => <div className="flex w-[100px] justify-center text-foreground ">{row.getValue("company")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "position",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Position"
        className=" flex justify-center w-[100px] "
        sortAscending={""}
        sortDescending={""}
      />
    ),
    cell: ({ row }) => <div className="flex w-[100px] justify-center text-foreground ">{row.getValue("position")}</div>,
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
    cell: ({ row }) => {
      const [editData, setEditData] = useState<EditData>({
        id: row.getValue("id") as string,
        firstName: row.getValue("firstName") as string,
        position: row.getValue("position") as string
      });

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({
          ...prevData,
          [name]: name === "warmupCapacity" || name === "dailyCapacity" ? Number(value) : value,
        }));
      };

      // const handleSave = () => {
      //   console.log("Updated Data:", editData);
      //   toast.success("Data saved successfully!");
      //   // You can call an API to save this data or do something else
      // };

      const handleSave = async () => {
        console.log("Updated Data:", editData);

        try {
          const response = await fetch(`https://api.workerai.co/user/email-address/${row.getValue("id")}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(editData),
          });

          if (response.ok) {
            toast.success("Data saved successfully!");
          } else {
            const errorData: any = await response.json();
            toast.error(`Failed to save data: ${errorData.message || response.statusText}`);
          }
        } catch (error) {
          console.error("Error saving data:", error);
          toast.error("An error occurred while saving data.");
        }
      };


      return (
        <div className="flex flex-row space-x-2">
          {/* Edit Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">
                <Pencil className="size-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-1/3">
              <DialogHeader>
                <DialogTitle>Edit Lead</DialogTitle>
                <DialogDescription>Edit the lead details below.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label htmlFor="firstName">Name</label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={editData.firstName}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                {/* <div>
                  <label htmlFor="company">Company</label>
                  <Input
                    id="company"
                    name="company"
                    value={editData.company}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div> */}
                <div>
                  <label htmlFor="position">Position</label>
                  <Input
                    id="position"
                    name="position"
                    value={editData.position}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                {/* <div>
                  <label htmlFor="warmupCapacity">Warmup Capacity</label>
                  <Input
                    id="warmupCapacity"
                    name="warmupCapacity"
                    value={editData.warmupCapacity.toString()}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div> */}
                {/* <div>
                  <label htmlFor="dailyCapacity">Daily Capacity</label>
                  <Input
                    id="dailyCapacity"
                    name="dailyCapacity"
                    value={editData.dailyCapacity.toString()}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div> */}
              </div>
              <DialogFooter className="flex justify-between space-x-2">
                <DialogClose asChild>
                  <Button variant="destructive" className="flex-1">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    onClick={handleSave}
                    variant="secondary"
                    className="flex-1"
                  >
                    Save
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Dialog */}
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
                      const emailId = row.getValue("id") as string;
                      const res = await deleteMailbox(emailId);
                      if (!res.success) {
                        toast.error("An error occurred");
                      } else {
                        toast.success("Lead deleted successfully!");
                      }
                      revalidatePath("/dashboard/mailbox");
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
        </div>
      );
    },
  },
]
