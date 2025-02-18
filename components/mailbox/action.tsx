"use client"
import { useState } from "react";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { deleteMailbox, editMailboxInfo } from "@/lib/actions";
import { revalidatePath } from "next/cache";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";


interface EditData {
    id: string;
    firstName: string;
    position: string;
}

interface ActionButtonsProps {
    id: string;
    firstName: string;
    position: string;
    refreshData: () => void;
}


export const ActionButtons: React.FC<ActionButtonsProps> = ({ id, firstName, position, refreshData }) => {
    const [loading, setLoading] = useState(false);
    const [editData, setEditData] = useState<EditData>({
        id,
        firstName,
        position,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log("EDITING DATA : ", editData)
    };

    const handleSave = async () => {
        setLoading(true);
        await editMailboxInfo(id, editData)
        setLoading(false);
        toast.success("Data saved successfully!");
        refreshData();

    };

    if (loading) {
        return (
            <div className="flex flex-row space-x-2">
                <Button variant="secondary">
                    <Loader2 className="size-4 animate-spin" />
                </Button>
            </div>
        )

    }

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
                        <DialogTitle>Edit Mailbox</DialogTitle>
                        <DialogDescription>Edit the Mailbox details below.</DialogDescription>
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
                    </div>
                    <DialogFooter className="flex justify-between space-x-2">
                        <DialogClose asChild>
                            <Button variant="destructive" className="flex-1">
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button onClick={(row: any) => { handleSave() }} variant="secondary" className="flex-1">
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
                                    const res = await deleteMailbox(id);
                                    if (!res.success) {
                                        toast.error("An error occurred");
                                    } else {
                                        toast.success("Lead deleted successfully!");
                                        revalidatePath("/dashboard/mailbox");
                                    }
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
};