"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContentLayout } from "@/components/layout/content-layout";
import { CardChronark } from "@/components/custom-components/card-chronark";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Edit } from "lucide-react";
import AddCampaignDialog from "@/components/campaign/AddCampaignDialog";
import { z } from "zod";
import { useAuth } from "@clerk/nextjs";
import { getTargetsIdByUser } from "@/lib/utils";
import { Campaign, getTargetsApiResponseSchema } from "@/types/interface";



export default function CampaignPage() {
    const router = useRouter();
    const { userId }: any = useAuth();
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await getTargetsIdByUser(userId);
                // console.log("RESPONSE : ", response);
                const parsedData = getTargetsApiResponseSchema.parse({ message: "Targets fetched", targets: response });
                // console.log("PARSED DATA : ", parsedData);
                setCampaigns(parsedData.targets);
            } catch (error) {
                console.error("Error fetching or validating campaigns:", error);
            }
        };

        fetchCampaigns();
    }, []);

    const handleCardClick = (id: string) => {
        router.push(`/dashboard/campaigns/${id}`);
    };

    const handleEdit = (campaign: Campaign) => {
        setEditingCampaign(campaign);
        setEditDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        setCampaigns((prevCampaigns) => prevCampaigns.filter((campaign) => campaign.id !== id));
    };

    const handleDialogSave = async (updatedCampaign: Campaign) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/target/${updatedCampaign.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCampaign), // Send the updated campaign data
            });

            if (!response.ok) {
                throw new Error("Failed to update the campaign");
            }

            const data = await response.json();
            console.log("Campaign updated:", data);

            // Update the campaigns state
            setCampaigns((prevCampaigns) =>
                prevCampaigns.map((campaign) =>
                    campaign.id === updatedCampaign.id ? updatedCampaign : campaign
                )
            );
            setEditDialogOpen(false);
            setEditingCampaign(null);
        } catch (error) {
            console.error("Error updating the campaign:", error);
            alert("Failed to save changes. Please try again.");
        }
    };

    const handleCampaignAdded = (newCampaign: any) => {
        setCampaigns((prevCampaigns) => [...prevCampaigns, newCampaign]);
    };

    return (
        <ContentLayout title="Campaign">
            <div className="space-y-6">
                <div className="flex  justify-end px-2">
                    <AddCampaignDialog onCampaignAdded={handleCampaignAdded} />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {campaigns.map((campaign) => (
                        <div key={campaign.id} className="relative cursor-pointer m-2">
                            <CardChronark isFooter={false} >
                                <div className="p-4" onClick={() => handleCardClick(campaign.id)}>
                                    <div className="flex justify-between">
                                        <Avatar>
                                            <AvatarImage
                                                src={`https://flagcdn.com/w40/${campaign.region?.toLowerCase() || "unknown"}.png`}
                                                alt={`${campaign.region || "Unknown"} flag`}
                                            />
                                            <AvatarFallback>{campaign.region || "N/A"}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-row items-center">
                                            <div className="text-lg font-semibold">{campaign.targetName || "Untitled Campaign"}</div>
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
                                        <div className="text-sm text-secondary-foreground">
                                            Industry: {campaign.industry}
                                        </div>
                                        <div className="text-sm">Size: {campaign.companySize}</div>
                                    </div>
                                    {/* <div
                                        className="mt-12 flex justify-between items-center"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id={`campaign-${campaign.id}`}
                                                checked={campaign.active}
                                                onCheckedChange={(value) =>
                                                    setCampaigns((prevCampaigns) =>
                                                        prevCampaigns.map((c) =>
                                                            c.id === campaign.id
                                                                ? { ...c, active: value }
                                                                : c
                                                        )
                                                    )
                                                }
                                            />
                                            <Label htmlFor={`campaign-${campaign.id}`}>
                                                {campaign.active ? "Active" : "Inactive"}
                                            </Label>
                                        </div>
                                    </div> */}
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
                                value={editingCampaign.targetName || ""}
                                onChange={(e) =>
                                    setEditingCampaign({
                                        ...editingCampaign,
                                        targetName: e.target.value,
                                    })
                                }
                                placeholder="Campaign Name"
                            />
                            <Select
                                value={editingCampaign.industry}
                                onValueChange={(value) =>
                                    setEditingCampaign({
                                        ...editingCampaign,
                                        industry: value,
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <div>{editingCampaign.industry}</div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Tech">Tech</SelectItem>
                                    <SelectItem value="Marketing">Marketing</SelectItem>
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