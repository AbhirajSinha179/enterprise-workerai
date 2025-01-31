"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { useTargetContext } from "@/contexts/TargetIdContext";

// Static list of countries
const countryList = [
    { code: "US", name: "United States" },
    { code: "IN", name: "India" },
    { code: "FR", name: "France" },
    { code: "DE", name: "Germany" },
    { code: "ID", name: "Indonesia" },
    { code: "CA", name: "Canada" },
    { code: "JP", name: "Japan" },
];

type AddCampaignProps = {
    onCampaignAdded: (newCampaign: Campaign) => void;
};

type Campaign = {
    id?: string;
    targetName: string;
    industry: string;
    companySize: string;
    position: string;
    region: string;
    followupCount: number;
    followupDelay: number;
    userId: string;
};

export default function AddCampaignDialog({ onCampaignAdded }: AddCampaignProps) {
    const { userId } = useAuth();
    const { setTargetId } = useTargetContext();
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [newCampaign, setNewCampaign] = useState<Campaign>({
        targetName: "",
        industry: "",
        companySize: "",
        position: "",
        region: "",
        followupCount: 0,
        followupDelay: 0,
        userId: userId || "",
    });

    const handleAddCampaign = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId) {
            toast.error("User ID is required to add a campaign.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/target`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCampaign),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error("Error adding campaign: ", error);
                toast.error("Failed to add campaign. Check the inputs.");
                return;
            }

            const data: any = await response.json();
            console.log("Campaign Added Successfully: ", data);

            // Notify parent component about the new campaign
            onCampaignAdded({ ...newCampaign, id: data.id });

            // Save the target ID and target name in the context
            setTargetId(data.id);

            toast.success("Campaign added successfully!");
            setDialogOpen(false);

            setNewCampaign({
                targetName: "",
                industry: "",
                companySize: "",
                position: "",
                region: "",
                followupCount: 0,
                followupDelay: 0,
                userId: userId,
            });
        } catch (error) {
            console.error("Error in API call: ", error);
            toast.error("An error occurred while adding the campaign.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button>Add Campaign</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Campaign</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddCampaign} className="space-y-4">
                    <Input
                        required
                        placeholder="Target Name"
                        value={newCampaign.targetName}
                        onChange={(e) =>
                            setNewCampaign({ ...newCampaign, targetName: e.target.value })
                        }
                    />
                    <Input
                        required
                        placeholder="Industry"
                        value={newCampaign.industry}
                        onChange={(e) =>
                            setNewCampaign({ ...newCampaign, industry: e.target.value })
                        }
                    />
                    <Input
                        required
                        placeholder="Position"
                        value={newCampaign.position}
                        onChange={(e) =>
                            setNewCampaign({ ...newCampaign, position: e.target.value })
                        }
                    />
                    <Select
                        value={newCampaign.companySize}
                        onValueChange={(value) =>
                            setNewCampaign({ ...newCampaign, companySize: value })
                        }
                    >
                        <SelectTrigger>
                            <div>{newCampaign.companySize || "Select Company Size"}</div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10-100">10-100</SelectItem>
                            <SelectItem value="100-10000">100-10000</SelectItem>
                            <SelectItem value="10000+">10000+</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        value={newCampaign.region}
                        onValueChange={(value) =>
                            setNewCampaign({ ...newCampaign, region: value })
                        }
                    >
                        <SelectTrigger>
                            <div>{newCampaign.region || "Select Region"}</div>
                        </SelectTrigger>
                        <SelectContent>
                            {countryList.map((country) => (
                                <SelectItem key={country.code} value={country.code}>
                                    {country.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Input
                        required
                        type="number"
                        placeholder="Followup Count"
                        value={newCampaign.followupCount || ""}
                        onChange={(e) =>
                            setNewCampaign({
                                ...newCampaign,
                                followupCount: parseInt(e.target.value, 10) || 0,
                            })
                        }
                    />
                    <Input
                        required
                        type="number"
                        placeholder="Followup Delay (in days)"
                        value={newCampaign.followupDelay || ""}
                        onChange={(e) =>
                            setNewCampaign({
                                ...newCampaign,
                                followupDelay: parseInt(e.target.value, 10) || 0,
                            })
                        }
                    />
                    <DialogFooter>
                        <Button
                            type="submit"
                            className="bg-blue-500"
                            disabled={isLoading}
                        >
                            {isLoading ? "Adding..." : "Add Campaign"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
