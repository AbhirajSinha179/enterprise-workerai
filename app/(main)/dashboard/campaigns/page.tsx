"use client";

import { useRouter } from "next/navigation";
import { ContentLayout } from "@/components/layout/content-layout";
import { CardChronark } from "@/components/custom-components/card-chronark";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Trash } from "lucide-react"; // Icons for Edit and Delete

export default function Campaign() {
    const router = useRouter();

    const campaigns = [
        { id: 1, name: "New Campaign", leads: "0 / 9,59,99,668", status: "Private", country: "US" },
        { id: 2, name: "New Campaign", leads: "0 / 9,59,78,579", status: "Private", country: "IN" },
        { id: 3, name: "Untitled Campaign", leads: "0 / 4,187", status: "Private", country: "ID" },
        { id: 4, name: "Untitled Campaign", leads: "0 / 0", status: "Private", country: "FR" },
        { id: 5, name: "Untitled Campaign", leads: "0 / 0", status: "Private", country: "DE" },
        { id: 6, name: "Untitled Campaign", leads: "0 / 0", status: "Private", country: "BR" },
        { id: 7, name: "Untitled Campaign", leads: "0 / 0", status: "Private", country: "JP" },
        { id: 8, name: "Untitled Campaign", leads: "0 / 0", status: "Private", country: "UK" },
        { id: 9, name: "Untitled Campaign", leads: "0 / 0", status: "Private", country: "CN" },
    ];

    const handleCardClick = (id: number) => {
        router.push(`/dashboard/campaigns/${id}`);
    };

    const handleEdit = (id: number) => {
        // Logic for editing a campaign
        console.log("Edit campaign:", id);
    };

    const handleDelete = (id: number) => {
        // Logic for deleting a campaign
        console.log("Delete campaign:", id);
    };

    return (
        <ContentLayout title="Campaign">
            <div className="space-y-6 ">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {campaigns.map((campaign) => (
                        <div
                            key={campaign.id}
                            className="relative cursor-pointer m-2"

                        >
                            <CardChronark isFooter={false} >
                                <div className="p-4" onClick={() => handleCardClick(campaign.id)}>
                                    <div className="flex justify-between items-center">
                                        {/* Country Icon */}
                                        <Avatar>
                                            <AvatarImage
                                                src={`https://flagcdn.com/w40/${campaign.country.toLowerCase()}.png`}
                                                alt={`${campaign.country} flag`}
                                            />
                                            <AvatarFallback>{campaign.country}</AvatarFallback>
                                        </Avatar>
                                        <div className="text-lg font-semibold text-white">{campaign.name}</div>
                                    </div>
                                    <div className="mt-4 flex justify-between items-center">
                                        <div className="text-sm text-zinc-400">{campaign.leads}</div>
                                        <div className="text-sm text-zinc-400">{campaign.status}</div>
                                    </div>
                                    <div className="mt-12 flex justify-between items-center "
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering card click
                                            handleEdit(campaign.id);
                                        }}>
                                        <div className="flex items-center space-x-2">
                                            <Switch id={`campaign-${campaign.id}`} />
                                            <Label htmlFor={`campaign-${campaign.id}`}>Active</Label>
                                        </div>
                                    </div>
                                </div>
                                {/* Edit and Delete Buttons */}
                                {/* <div className="flex space-x-2 top-4 right-4 ">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering card click
                                            handleEdit(campaign.id);
                                        }}
                                        className="text-zinc-400 hover:text-blue-500"
                                    >
                                        <Edit size={26} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering card click
                                            handleDelete(campaign.id);
                                        }}
                                        className="text-zinc-400 hover:text-red-500"
                                    >
                                        <Trash size={26} />
                                    </button>
                                </div> */}
                            </CardChronark>
                        </div>
                    ))}
                </div>
            </div>
        </ContentLayout>
    );
}


// campaign add 
// edit and delete inside
// new campaing label as in 
// drop down for private and public 
