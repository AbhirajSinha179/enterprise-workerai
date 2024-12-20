"use client";

import { ContentLayout } from "@/components/layout/content-layout";
import CSVUpload from "@/components/outbound/csvUploader";
import InputWithCommas from "@/components/outbound/input-with-commas";
import MultiSelectCard from "@/components/outbound/multiSelectChip";
import OmitLeads from "@/components/outbound/multioptionomitlead";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Campaign = {
    id: number;
    name: string;
    leads: string;
    status: "Private" | "Public";
    country: string;
    isActive: boolean;
};

const campaigns: Campaign[] = [
    { id: 1, name: "New Campaign", leads: "0 / 99,668", status: "Private", country: "US", isActive: true },
    { id: 2, name: "New Campaign", leads: "0 / 78,579", status: "Private", country: "IN", isActive: false },
    { id: 3, name: "Untitled Campaign", leads: "0 / 4,187", status: "Private", country: "ID", isActive: true },
    { id: 4, name: "Test Campaign", leads: "0 / 45,123", status: "Private", country: "FR", isActive: false },
    { id: 5, name: "Sample Campaign", leads: "0 / 32,456", status: "Private", country: "DE", isActive: true },
];

const locations = [{ name: "India" }, { name: "USA" }, { name: "Germany" }];

export default function CampaignDetails() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params?.id);
    const [campaign, setCampaign] = useState<Campaign | null>(null);

    useEffect(() => {
        const selectedCampaign = campaigns.find((campaign) => campaign.id === id);
        setCampaign(selectedCampaign || null);
    }, [id]);

    if (!campaign) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold">Campaign Not Found</h1>
                <Button
                    onClick={() => router.back()}
                    variant={"secondary"}
                    className="m-4"
                >
                    Back
                </Button>
            </div>
        );
    }

    return (
        <ContentLayout title="Campaign Details">
            <div className="space-y-6"> {/* Add space between components */}
                <Button
                    onClick={() => router.back()}
                    variant={"secondary"}
                    className="my-4"
                >
                    Back
                </Button>
                {/* <h1 className="text-2xl font-bold">Campaign Details</h1> */}
                {/* <p className="mt-4">You are viewing details for campaign ID: {campaign.id}</p> */}
                {/* <div className="mt-4 space-y-2">
                    <p><strong>Name:</strong> {campaign.name}</p>
                    <p><strong>Leads:</strong> {campaign.leads}</p>
                    <p><strong>Status:</strong> {campaign.status}</p>
                    <p><strong>Country:</strong> {campaign.country}</p>
                    <p><strong>Active:</strong> {campaign.isActive ? "Yes" : "No"}</p>
                </div> */}

                <CSVUpload
                    key="upload-custom-leads"
                    title="Upload Custom Leads (CSV)"
                    description="Upload your CSV file to seamlessly import and process your data"
                    endpoint={`${process.env.NEXT_PUBLIC_API_BASE_URL}/leads`}
                    verification
                    requiredColumns={[
                        { name: "email", required: true },
                        { name: "imgUrl", required: false },
                        { name: "firstName", required: true },
                        { name: "lastName", required: false },
                        { name: "seniority", required: false },
                        { name: "country", required: false },
                        { name: "linkedin", required: false },
                        { name: "city", required: false },
                        { name: "state", required: false },
                        { name: "timezone", required: false },
                        { name: "companyName", required: true },
                        { name: "companyWebsite", required: false },
                    ]}
                />

                <OmitLeads
                    title={"Omit Leads"}
                    description="Select the leads which you want to remove from this campaign"
                />

                <MultiSelectCard
                    cardTitle="Location"
                    cardDescription="Select the location where you want to target this campaign"
                    options={locations}
                />

                <InputWithCommas
                    cardTitle="Job Titles"
                    cardDescription="Enter the job titles which you want to target with this campaign"
                />

                <InputWithCommas
                    cardTitle="Outbound Keywords"
                    cardDescription="Enter the Keywords "
                />

                <InputWithCommas
                    cardTitle="Blacklisted email domains"
                    cardDescription="Enter the emails which you don't want to send emails to"
                />
            </div>
        </ContentLayout>
    );
}
