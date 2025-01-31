"use client";

import { ContentLayout } from "@/components/layout/content-layout";
import CSVUpload from "@/components/outbound/csvUploader";
import InputWithCommas from "@/components/outbound/input-with-commas";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

type Campaign = {
    id: number;
    name: string;
    leads: string;
    status: "Private" | "Public";
    country: string;
    isActive: boolean;
};


const locations = [{ name: "India" }, { name: "USA" }, { name: "Germany" }];

export default function CampaignDetails() {
    const params = useParams();
    const router = useRouter();
    const targetId = String(params?.id);


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

                <CSVUpload
                    key="upload-custom-leads"
                    title="Upload Custom Leads (CSV)"
                    description="Upload your CSV file to seamlessly import and process your data"
                    endpoint={`${process.env.NEXT_PUBLIC_API_BASE_URL}/leads`}
                    targetId={targetId}
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

                {/* <OmitLeads
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
                /> */}

                <InputWithCommas
                    cardTitle="Outbound Keywords"
                    cardDescription="Enter the Keywords "
                />

                {/* <InputWithCommas
                    cardTitle="Blacklisted email domains"
                    cardDescription="Enter the emails which you don't want to send emails to"
                /> */}
            </div>
        </ContentLayout>
    );
}
