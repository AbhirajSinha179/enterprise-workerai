"use client";

import React, { useState } from 'react';
import { ContentLayout } from "@/components/layout/content-layout";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ParaInput from '@/components/generate/paraInput';
import ToneSelectForm from '@/components/generate/ToneSelectForm';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

const locations = [
    { name: "India" },
    { name: "USA" },
    { name: "Germany" },
];

export default function EmailGen() {
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [paraInputs, setParaInputs] = useState<number[]>([1, 2, 3]);
    const [textAreas, setTextAreas] = useState<number[]>([1, 2, 3]);

    const handleCardClick = (index: number) => {
        setSelectedCard(index);
    };

    const handleToneSubmit = (data: { tone: string[] }) => {
        console.log("Selected Tone:", data.tone);
    };

    const addParaInput = () => {
        setParaInputs((prev) => [...prev, prev.length + 1]);
    };

    const deleteParaInput = (index: number) => {
        setParaInputs((prev) => prev.filter(i => i !== index));
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
            <div className='space-y-4'>
                <div className='space-4 flex flex-row'>
                    <div className='w-3/4 m-2'>
                        <Card>
                            <CardHeader>
                                <CardTitle>Subject Line</CardTitle>
                            </CardHeader>
                            <CardDescription className='px-4'>
                                <div className="flex flex-col">
                                    <div className="gap-y-2 my-2">
                                        {textAreas.map((textArea, index) => (
                                            <div key={index} className="relative">
                                                <Textarea className="my-6" placeholder="Subject Line" />
                                                {index >= 3 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeTextArea(index)}
                                                        className="absolute top-0 right-0 m-2"
                                                    >
                                                        &#x2716; {/* Unicode for cross symbol */}
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    {/* <div className="flex justify-end mb-4">
                                        <Button type="button" onClick={addTextArea}>
                                            Add Subject Line
                                        </Button>
                                    </div> */}
                                </div>
                            </CardDescription>
                        </Card>

                        <div className='mt-5'>
                            <ToneSelectForm
                                options={locations}
                                onSubmit={handleToneSubmit}
                            />
                        </div>
                        {paraInputs.map((index) => (
                            <div>

                                <ParaInput key={index} index={index} onDelete={deleteParaInput} />
                                <div className="relative group z-10">
                                    <Separator />
                                    <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Button
                                            type="button"
                                            onClick={addTextArea}
                                        >
                                            Subject Line
                                        </Button>
                                        <Button
                                            className=""
                                            onClick={addParaInput}
                                        >
                                            Para
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        ))}

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
                <div className='mt-4 w-3/4 px-4'>
                    <Textarea value="sdfsdfsdf" disabled className='min-h-[300px] overflow-auto' />
                </div>
            </div>
        </ContentLayout>
    );
}
