"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ContentLayout } from "@/components/layout/content-layout";
import { CardChronark } from "@/components/custom-components/card-chronark";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Edit } from "lucide-react";
import AddCampaignDialog from "@/components/campaign/AddCampaignDialog";

type Campaign = {
    id: number;
    name: string;
    leads: string;
    status: "Private" | "Public";
    country: string;
    isActive: boolean;
};

export default function Campaign() {
    const router = useRouter();

    const [campaigns, setCampaigns] = useState<Campaign[]>([
        { id: 1, name: "New Campaign", leads: "0 / 99,668", status: "Private", country: "US", isActive: true },
        { id: 2, name: "New Campaign", leads: "0 / 78,579", status: "Private", country: "IN", isActive: false },
        { id: 3, name: "Untitled Campaign", leads: "0 / 4,187", status: "Private", country: "ID", isActive: true },
        { id: 4, name: "Test Campaign", leads: "0 / 45,123", status: "Private", country: "FR", isActive: false },
        { id: 5, name: "Sample Campaign", leads: "0 / 32,456", status: "Private", country: "DE", isActive: true },
    ]);



    const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
    const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [newCampaign, setNewCampaign] = useState({
        name: "",
        leads: "",
        status: "Private",
        country: "US",
        isActive: false,
    });

    const handleCardClick = (id: number) => {
        router.push(`/dashboard/campaigns/${id}`);
    };

    const handleEdit = (campaign: Campaign) => {
        setEditingCampaign(campaign);
        setEditDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
    };

    const handleDialogSave = (updatedCampaign: Campaign) => {
        setCampaigns(
            campaigns.map((campaign) =>
                campaign.id === updatedCampaign.id ? updatedCampaign : campaign
            )
        );
        setEditDialogOpen(false);
        setEditingCampaign(null);
    };
    const handleCampaignAdded = (newCampaign: any) => {
        setCampaigns((prevCampaigns) => [...prevCampaigns, newCampaign]);
    };

    return (
        <ContentLayout title="Campaign">
            <div className="space-y-6">

                <AddCampaignDialog onCampaignAdded={handleCampaignAdded}></AddCampaignDialog>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {campaigns.map((campaign) => (
                        <div key={campaign.id} className="relative cursor-pointer m-2">
                            <CardChronark isFooter={false}>
                                <div className="p-4" onClick={() => handleCardClick(campaign.id)}>
                                    <div className="flex justify-between">
                                        <Avatar className="flex">
                                            <AvatarImage
                                                src={`https://flagcdn.com/w40/${(campaign.country || "unknown").toLowerCase()}.png`}
                                                alt={`${campaign.country || "Unknown"} flag`}
                                            />
                                            <AvatarFallback>{campaign.country || "N/A"}</AvatarFallback>
                                        </Avatar>

                                        <div className="flex flex-row items-center">
                                            <div className="text-lg font-semibold">{campaign.name}</div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEdit(campaign);
                                                }}
                                                className="hover:text-blue-500 mx-2"
                                            >
                                                <Edit size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-between items-center">
                                        <div className="text-sm text-secondary-foreground">{campaign.leads}</div>
                                        <div className="text-sm">{campaign.status}</div>
                                    </div>
                                    <div
                                        className="mt-12 flex justify-between items-center"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id={`campaign-${campaign.id}`}
                                                checked={campaign.isActive}
                                                onCheckedChange={(value) => {
                                                    setCampaigns((prev) =>
                                                        prev.map((c) =>
                                                            c.id === campaign.id ? { ...c, isActive: value } : c
                                                        )
                                                    );
                                                }}
                                            />
                                            <Label htmlFor={`campaign-${campaign.id}`}>{campaign.isActive ? "Active" : "Inactive"}</Label>
                                        </div>
                                    </div>
                                </div>
                            </CardChronark>
                        </div>
                    ))}
                </div>
            </div>
            {editingCampaign && (
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Campaign</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <Input
                                value={editingCampaign.name}
                                onChange={(e) =>
                                    setEditingCampaign({ ...editingCampaign, name: e.target.value })
                                }
                                placeholder="Campaign Name"
                            />
                            <Select
                                value={editingCampaign.status}
                                onValueChange={(value: "Private" | "Public") =>
                                    setEditingCampaign({ ...editingCampaign, status: value })
                                }
                            >
                                <SelectTrigger>
                                    <div>{editingCampaign.status}</div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Private">Private</SelectItem>
                                    <SelectItem value="Public">Public</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter>
                            <Button
                                onClick={() => handleDialogSave(editingCampaign)}
                                className="bg-blue-500"
                            >
                                Save
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </ContentLayout>
    );
}
