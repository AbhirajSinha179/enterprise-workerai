"use client";

import React, { useState } from 'react';
import { ContentLayout } from "@/components/layout/content-layout";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ParaInput from '@/components/generate/paraInput';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import MagicPrompt from '@/components/generate/MagicPropmt';
import { Trash } from 'lucide-react';
import EmailItem from '@/components/scheduler/email-item';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FancyArea } from '@/components/generate/fancyArea/fancy-area';

const EMAIL_TONE = [
    { name: "Warm" },
    { name: "Brutal" },
    { name: "BDSM" },
];
const SAMPLE_SUBJECT = "sample subject line";
const SAMPLE_GENERATED_OUTPUT = `
Dear [Recipient],

I hope this email finds you well. I am writing to introduce you to our new product, which has been designed to help streamline your workflow and increase productivity. Our product offers a range of features that are tailored to meet the needs of professionals like yourself.

We are confident that our product will provide significant value to your work, and we would be delighted to offer you a free trial to experience its benefits firsthand.

Thank you for considering our offer. We look forward to your positive response.

Best regards,
[Your Name]
`;

export default function EmailGen() {
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [paraInputs, setParaInputs] = useState<number[]>([1]);
    const [magicPrompt, setMagicPrompt] = useState<number[]>([1]);
    const [textAreas, setTextAreas] = useState<number[]>([1, 2, 3]);
    const [renderOutputs, setRenderOutputs] = useState<{ [key: number]: boolean }>({});
    const [placeholderTexts, setPlaceholderTexts] = useState<{ [key: number]: string }>({});
    const [renderResult, setRenderResult] = useState(false);
    const [tabs, setTabs] = useState([{ id: 1, name: "Follow Up" }]);

    const handleCardClick = (index: number) => {
        setSelectedCard(index);
    };

    const handleToneSubmit = (data: { tone: string[] }) => {
        console.log("Selected Tone:", data.tone);
    };

    const configParaInput = (index: number, placeholderText: string, showOutput: boolean) => {
        setRenderOutputs((prev) => ({ ...prev, [index]: showOutput }));
        setPlaceholderTexts((prev) => ({ ...prev, [index]: placeholderText }));
    };

    const addParaInput = (isPrompt: boolean, position: number) => {
        const newIndex = paraInputs.length + 1;
        const newParaInputs = [...paraInputs];
        newParaInputs.splice(position + 1, 0, newIndex);
        setParaInputs(newParaInputs);
        configParaInput(newIndex, isPrompt ? "prompt" : "string", isPrompt);
    };

    const addMagicPrompt = (position: number) => {
        const newIndex = magicPrompt.length + 1;
        const newMagicPrompts = [...magicPrompt];
        newMagicPrompts.splice(position + 1, 0, newIndex);
        setMagicPrompt(newMagicPrompts);
    };

    const deleteMagicPrompt = (index: number) => {
        setMagicPrompt((prev) => prev.filter(i => i !== index));
    }

    const deleteParaInput = (index: number) => {
        setParaInputs((prev) => prev.filter(i => i !== index));
        setRenderOutputs((prev) => {
            const newRenderOutputs = { ...prev };
            delete newRenderOutputs[index];
            return newRenderOutputs;
        });
        setPlaceholderTexts((prev) => {
            const newPlaceholderTexts = { ...prev };
            delete newPlaceholderTexts[index];
            return newPlaceholderTexts;
        });
    };

    const addTextArea = () => {
        setTextAreas([...textAreas, textAreas.length + 1]);
    };

    const removeTextArea = (index: number) => {
        if (textAreas.length > 3) {
            setTextAreas(textAreas.filter((_, i) => i !== index));
        }
    };

    const addNewTab = () => {
        setTabs([...tabs, { id: tabs.length + 1, name: `Follow Up ${tabs.length + 1}` }]);
    };

    return (
        <ContentLayout title="Email Generation">
            <Tabs defaultValue="emails">
                <div className="px-2 py-2 flex justify-between items-center w-3/4">
                    <div className='flex justify-start'>
                        <TabsList className="ml-auto">
                            <TabsTrigger value="emails">Emails</TabsTrigger>
                            {tabs.map((tab) => (
                                <TabsTrigger key={tab.id} value={`followup${tab.id}`}>
                                    {tab.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                    </div>
                    <div className='flex justify-end mx-4'>
                        <Button onClick={addNewTab} className="ml-4" variant={"secondary"}>
                            Add Follow Up
                        </Button>
                        <Button onClick={() => {
                            console.log("Reset button clicked")
                        }} className="ml-4" variant={"secondary"}>
                            Reset
                        </Button>

                    </div>

                </div>
                <TabsContent value="emails" className="m-0">
                    <div className='space-y-4'>
                        <div className='space-4 flex flex-row'>
                            <div className='w-3/4 m-2'>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Subject Line</CardTitle>
                                    </CardHeader>
                                    <CardDescription >
                                        <div className="flex flex-col px-4">
                                            <div className="">
                                                {textAreas.map((textArea, index) => (
                                                    <div key={index} className="relative">
                                                        <Textarea className="my-4" placeholder={SAMPLE_SUBJECT} />
                                                        {index >= 3 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => removeTextArea(index)}
                                                                className="absolute top-0 right-0 m-2"
                                                            >
                                                                <Trash size={15} />
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className='relative group mb-8'>
                                                <div className="flex justify-center -mt-8 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <Button type="button" onClick={addTextArea}>
                                                        Add Subject Line
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardDescription>
                                </Card>
                                <div className='mt-8'>
                                    <h1 className="text-xl font-bold my-2">Content Generation</h1>
                                    <Separator />
                                </div>
                                <div className='mt-5'>
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a Tone" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {EMAIL_TONE.map((tone) => (
                                                    <SelectItem key={tone.name} value={tone.name.toLowerCase()}>
                                                        {tone.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="relative group z-10 my-4">
                                    <Separator />
                                    <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4 -mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full justify-center">
                                        <Button
                                            type="button"
                                            onClick={() => addParaInput(true, -1)}
                                        >
                                            Prompt
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => addParaInput(false, -1)}
                                        >
                                            String
                                        </Button>
                                    </div>
                                </div>
                                {paraInputs.map((index, position) => (


                                    <div key={index}>

                                        <ParaInput
                                            index={index}
                                            onDelete={deleteParaInput}
                                            placeholderText={placeholderTexts[index] || ""}
                                            showOutput={renderOutputs[index] || false}
                                        />
                                        <div className="relative group z-10 my-4">
                                            <Separator />
                                            <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4 -mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full justify-center">
                                                <Button
                                                    type="button"
                                                    onClick={() => addParaInput(true, position)}
                                                >
                                                    Prompt
                                                </Button>
                                                <Button
                                                    type="button"
                                                    onClick={() => addParaInput(false, position)}
                                                >
                                                    String
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className='pt-8 mt-8'>
                                    {magicPrompt.map((index, position) => (
                                        <div key={index}>
                                            <MagicPrompt
                                                index={index}
                                                onDelete={deleteMagicPrompt}
                                            />
                                            <div className="relative group z-10">
                                                <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full justify-center">
                                                    <Button
                                                        type="button"
                                                        onClick={() => addMagicPrompt(position)}
                                                    >
                                                        Add
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='mt-8 flex justify-end'>
                                    <Button
                                        onClick={() => {
                                            setRenderResult(true);
                                        }}
                                    >
                                        Final Output
                                    </Button>
                                </div>

                                {renderResult && (
                                    <div>
                                        <div className='mt-8'>
                                            <h1 className="text-xl font-bold my-2">Generated Output</h1>
                                            <Separator />
                                        </div>

                                        {/* <Textarea className='min-h-[300px] my-4'>
                                            {SAMPLE_GENERATED_OUTPUT}
                                        </Textarea> */}
                                        <div>
                                            <Card>
                                                <div className="flex w-full flex-col items-start gap-2 rounded-lg border p-4 text-left transition-all">
                                                    <div className="flex w-full flex-col gap-1">
                                                        <div className="flex justify-between">
                                                            <div className="text-2xl font-semibold flex">
                                                                {/* {item.leadInfo.firstName}
                                                                 */}
                                                                Ayan
                                                            </div>
                                                            <div className="flex">
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <div>
                                                                                {/* {item.status && renderStatusIcons(item.status)} */}
                                                                            </div>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            {/* <p>{item.status} Email sent</p> */}
                                                                            <p>Email sent</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>

                                                                <div className="flex items-center h-6 mx-2">
                                                                    <Separator orientation="vertical" />
                                                                </div>
                                                                {/* <div className={cn("ml-auto")}>{format(new Date(item.createdAt), "PP")}</div> */}
                                                                <div className="ml-auto">Aug 23, 2024</div>
                                                            </div>
                                                        </div>
                                                        {/* <div className="text-md font-medium">{subject}</div> */}
                                                        <div className="text-md font-medium">subject subject subject </div>
                                                    </div>
                                                    <div className="text-xs text-foreground">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas itaque ab impedit! Odio obcaecati voluptatem repellendus quaerat consequuntur iste odit commodi, sequi laudantium totam non sed minus adipisci quisquam aliquid.</div>



                                                </div>
                                            </Card>
                                        </div>



                                    </div>

                                )}
                                <div className='my-4'>
                                    <FancyArea />
                                </div>
                            </div>
                            <div className='bg-muted w-1/4 mx-4 h-fit'>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Lead details</CardTitle>
                                        <CardDescription>askjkdkhajsd</CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {tabs.map((tab) => (
                    <TabsContent key={tab.id} value={`followup${tab.id}`} className="m-0">
                        <div className="p-4">
                            <h2 className="text-lg font-semibold">{tab.name} Content</h2>
                            {/* Place your content for each follow-up tab here */}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </ContentLayout>
    );
}
