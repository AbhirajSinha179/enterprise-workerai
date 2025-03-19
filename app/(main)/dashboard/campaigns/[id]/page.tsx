"use client";

import { useState } from "react";
import { ContentLayout } from "@/components/layout/content-layout";
import CSVUpload from "@/components/outbound/csvUploader";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import moment from "moment-timezone";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ChevronsUpDown, Check } from "lucide-react";
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
    const [sendNewEmails, setSendNewEmails] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isNewEmailsLoading, setIsNewEmailsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const updateSettingsSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/target/${targetId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        timezone,
                        followupCount,
                        followupDelay
                    }),
                }
            );
            if (!response.ok) {
                const errorData: any = await response.json();
                throw new Error(errorData.message || "Failed to update campaign details");
            }
            const data = await response.json();
            console.log("Updated Campaign:", data);
            toast.success("Campaign settings updated successfully!", {
                description: `Timezone: ${timezone}, Follow-ups: ${followupCount}, Delay: ${followupDelay} days`,
            });
        } catch (error) {
            console.error("Error updating campaign settings:", error);
            toast.error("Error updating campaign settings", {
                description: error instanceof Error ? error.message : "Please try again.",
            });

        } finally {
            setIsLoading(false);
        }
    };

    const handleNewEmailsToggle = async (checked: boolean) => {
        setIsNewEmailsLoading(true);
        setSendNewEmails(checked);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/targets/${targetId}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ newEmail: checked }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update new email setting");
            }

            console.log("New email setting updated successfully");
        } catch (error) {
            console.error("Error updating new email setting:", error);
            alert("Error updating new email setting. Please try again.");
        } finally {
            setIsNewEmailsLoading(false);
        }
    };

    return (
        <ContentLayout title="Campaign Details">
            <div className="space-y-6">
                <Button onClick={() => router.back()} variant="secondary" className="my-4">
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

                <form onSubmit={updateSettingsSubmit}>
                    <Card className="p-2 shadow-md py-4">
                        <CardHeader>
                            <CardTitle>
                                Update Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-4 gap-6 items-end mt-2">
                                <div className="flex flex-col">
                                    <Label className="text-sm font-medium mb-1">
                                        Select Timezone
                                    </Label>
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
                                    <Label className="text-sm font-medium mb-1">
                                        Follow-up Count
                                    </Label>
                                    <Input
                                        type="number"
                                        className="w-full"
                                        value={followupCount}
                                        onChange={(e) => setFollowupCount(Number(e.target.value))}
                                        min={0}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <Label className="text-sm font-medium mb-1">
                                        Follow-up Delay in Days
                                    </Label>
                                    <Input
                                        type="number"
                                        className="w-full"
                                        value={followupDelay}
                                        onChange={(e) => setFollowupDelay(Number(e.target.value))}
                                        min={0}
                                    />
                                </div>

                                <Button type="submit" className="h-10 w-full flex justify-center items-center" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...
                                        </>
                                    ) : (
                                        "Submit"
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>

                {/* <Card className="p-6 shadow-md">
                    <CardContent>
                        <div className="flex items-center justify-between h-12 px-4">
                            <Label className="text-sm font-medium">Send New Emails</Label>
                            <Switch checked={sendNewEmails} onCheckedChange={handleNewEmailsToggle} disabled={isNewEmailsLoading} />
                        </div>
                    </CardContent>
                </Card> */}
            </div>
        </ContentLayout>
    );
}
