"use client";

import { useState } from "react";
import { ContentLayout } from "@/components/layout/content-layout";
import CSVUpload from "@/components/outbound/csvUploader";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import moment from "moment-timezone";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ChevronsUpDown, Check, Ghost } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

const timezones = moment.tz.names().map((tz) => ({
    label: tz,
    value: tz,
}));

export default function CampaignDetails() {
    const params = useParams();
    const router = useRouter();
    const targetId = String(params?.id);
    const [timezone, setTimezone] = useState("");
    const [followupCount, setFollowupCount] = useState(2);
    const [followupDelay, setFollowupDelay] = useState(2);
    const [campaignActive, setCampaignActive] = useState(false);
    const [sendNewEmails, setSendNewEmails] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSettingsUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsUpdating(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/target/${targetId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        timezone,
                        followupCount,
                        followupDelay,
                        active: campaignActive,
                        newEmail: sendNewEmails,
                    }),
                }
            );

            if (!response.ok) {
                const errorData: any = await response.json();
                throw new Error(errorData.message || "Failed to update campaign details");
            }

            toast.success("Campaign settings updated successfully!", {
                description: `Timezone: ${timezone}, Follow-ups: ${followupCount}, Delay: ${followupDelay} days, Active: ${campaignActive}, Send Emails: ${sendNewEmails}`,
            });
        } catch (error) {
            console.error("Error updating campaign settings:", error);
            toast.error("Error updating campaign settings", {
                description: error instanceof Error ? error.message : "Please try again.",
            });
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <ContentLayout title="Campaign Details">
            <div className="space-y-6">
                <Button onClick={() => router.back()} variant="secondary" className="my-4">
                    Back
                </Button>
                <form onSubmit={handleSettingsUpdate}>
                    <Card className="p-4 shadow-md border rounded-lg">
                        <CardHeader>
                            <CardTitle>Campaign Settings</CardTitle>
                            <CardDescription>Control campaign activation, follow-ups, and timezone.</CardDescription>
                        </CardHeader>
                        <CardContent className="rounded-lg p-4 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col p-3 rounded-md shadow-sm border">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm font-medium">Campaign Active</Label>
                                        <Switch checked={campaignActive} onCheckedChange={setCampaignActive} />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Turn the campaign on or off.</p>
                                </div>

                                <div className="flex flex-col p-3 rounded-md shadow-sm border">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm font-medium">Send New Emails</Label>
                                        <Switch checked={sendNewEmails} onCheckedChange={setSendNewEmails} />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Enable to start sending new emails.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-6 items-end mt-2">
                                <div className="flex flex-col">
                                    <Label className="text-sm font-medium mb-1">Select Timezone</Label>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-full justify-between"
                                            >
                                                {timezone
                                                    ? timezones.find((tz) => tz.value === timezone)?.label
                                                    : "Select a Timezone"}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search timezones..." />
                                                <CommandList>
                                                    <CommandEmpty>No timezone found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {timezones.map((tz) => (
                                                            <CommandItem
                                                                key={tz.value}
                                                                value={tz.value}
                                                                onSelect={(currentValue) => {
                                                                    setTimezone(currentValue);
                                                                    setOpen(false);
                                                                }}
                                                            >
                                                                <Check
                                                                    className={`mr-2 h-4 w-4 ${timezone === tz.value ? "opacity-100" : "opacity-0"
                                                                        }`}
                                                                />
                                                                {tz.label}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="flex flex-col">
                                    <Label className="text-sm font-medium mb-1">Follow-up Count</Label>
                                    <Input
                                        type="number"
                                        className="w-full"
                                        value={followupCount}
                                        onChange={(e) => setFollowupCount(Number(e.target.value))}
                                        min={0}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <Label className="text-sm font-medium mb-1">Follow-up Delay (Days)</Label>
                                    <Input
                                        type="number"
                                        className="w-full"
                                        value={followupDelay}
                                        onChange={(e) => setFollowupDelay(Number(e.target.value))}
                                        min={0}
                                    />
                                </div>
                            </div>
                            <Button variant={"secondary"} type="submit" className="h-10 w-full flex justify-center items-center" disabled={isUpdating}>
                                {isUpdating ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Updating...
                                    </>
                                ) : "Update Settings"}
                            </Button>

                        </CardContent>
                    </Card>
                </form>
                <CSVUpload
                    key="upload-custom-leads"
                    title="Upload Custom Leads (CSV)"
                    description="Upload your CSV file to seamlessly import and process your data"
                    endpoint={`${process.env.NEXT_PUBLIC_API_BASE_URL}/leads`}
                    targetId={targetId}
                    verification
                    requiredColumns={[
                        { name: "email", required: true },
                        { name: "companyName", required: true },
                    ]}
                />
            </div>
        </ContentLayout>
    );
}
