"use client";

import React, { useState } from 'react';
import { ContentLayout } from "@/components/layout/content-layout";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ParaInput from '@/components/generate/paraInput';
import ToneSelectForm from '@/components/generate/ToneSelectForm';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EMAIL_TONE = [
    { name: "Warm " },
    { name: "Mild Warm" },
    { name: "Direct" },
];
const SAMPLE_SUBJECT = "sample subject line ";

export default function EmailGen() {
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [paraInputs, setParaInputs] = useState<number[]>([1]);
    const [textAreas, setTextAreas] = useState<number[]>([1, 2, 3]);
    const [renderOutputs, setRenderOutputs] = useState<{ [key: number]: boolean }>({});
    const [placeholderTexts, setPlaceholderTexts] = useState<{ [key: number]: string }>({});
    const [renderResult, setRenderResult] = useState(false);

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

    const addParaInput = (isPrompt: boolean) => {
        const newIndex = paraInputs.length + 1;
        setParaInputs((prev) => [...prev, newIndex]);
        configParaInput(newIndex, isPrompt ? "prompt" : "string", isPrompt);
    };

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

    return (
        <ContentLayout title="Email Generation">
            <Tabs defaultValue="emails">
                <div className="flex items-center px-4 py-2">
                    <h1 className="text-xl font-bold">Email</h1>
                    <TabsList className="ml-auto">
                        <TabsTrigger
                            value="emails"
                        >
                            Emails
                        </TabsTrigger>
                        <TabsTrigger
                            value="followups"
                        >
                            Follow Up
                        </TabsTrigger>
                    </TabsList>
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
                                                                &#x2716;
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className='relative group mb-8'>
                                                <div className="flex justify-center  -mt-8 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                                    <Separator></Separator>
                                </div>

                                <div className='mt-5'>
                                    <ToneSelectForm
                                        options={EMAIL_TONE}
                                        onSubmit={handleToneSubmit}
                                    />
                                </div>
                                {paraInputs.map((index) => (
                                    <div key={index}>
                                        <ParaInput
                                            index={index}
                                            onDelete={deleteParaInput}
                                            placeholderText={placeholderTexts[index] || ""}
                                            showOutput={renderOutputs[index] || false}
                                        />
                                        <div className="relative group z-10  ">
                                            <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300  w-full justify-center">
                                                <Button
                                                    type="button"
                                                    onClick={() => addParaInput(true)}
                                                >
                                                    Prompt
                                                </Button>
                                                <Button
                                                    className=""
                                                    onClick={() => addParaInput(false)}
                                                >
                                                    String
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className='  mt-8 flex justify-end'>
                                    <Button
                                        onClick={() => {
                                            setRenderResult(true);
                                        }}
                                    >
                                        Final Output
                                    </Button>
                                </div>
                                <div className='   pt-8 mt-8 '>
                                    {renderResult && (
                                        <Textarea className='min-h-32' disabled>
                                            jashfhsjfjfh

                                        </Textarea>

                                    )
                                    }

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
                <TabsContent value="followups" className="m-0">
                    <div>
                        hshsa
                    </div>
                </TabsContent>
            </Tabs>
        </ContentLayout>
    );
}
