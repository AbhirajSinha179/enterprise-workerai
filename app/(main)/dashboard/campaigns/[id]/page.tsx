"use client";

import { useParams } from "next/navigation";

export default function CampaignDetails() {
    const params = useParams();
    const { id } = params;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Campaign Details</h1>
            <p className="mt-4">You are viewing details for campaign ID: {id}</p>
        </div>
    );
}
