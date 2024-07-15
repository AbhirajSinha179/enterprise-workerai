"use client";

import React, { useState } from 'react';
import { ContentLayout } from "@/components/layout/content-layout";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextareaForm } from '@/components/generate/TextareaForm';
import MultiSelectForm from '@/components/generate/MultiSelectForm';
import { Textarea } from '@/components/ui/textarea';

const locations = [
    { name: "India" },
    { name: "USA" },
    { name: "Germany" },
];

const preWrittenOutput = `
Dear [Recipient],

I hope this email finds you well. I am writing to introduce you to our new product, which has been designed to help streamline your workflow and increase productivity. Our product offers a range of features that are tailored to meet the needs of professionals like yourself.

We are confident that our product will provide significant value to your work, and we would be delighted to offer you a free trial to experience its benefits firsthand.

Thank you for considering our offer. We look forward to your positive response.

Best regards,
[Your Name]
`;



const cardData = [
    {
        title: "Title 1",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet sed obcaecati delectus exercitationem sequi accusantium",
        href: "/path-to-page-1",
    },
    {
        title: "Title 2",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet sed obcaecati delectus exercitationem sequi accusantium",
        href: "/path-to-page-2",
    },
    {
        title: "Title 3",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet sed obcaecati delectus exercitationem sequi accusantium",
        href: "/path-to-page-3",
    },
    {
        title: "Title 4",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet sed obcaecati delectus exercitationem sequi accusantium",
        href: "/path-to-page-3",
    },
    {
        title: "Title 5",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet sed obcaecati delectus exercitationem sequi accusantium",
        href: "/path-to-page-3",
    },
    {
        title: "Title 6",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet sed obcaecati delectus exercitationem sequi accusantium",
        href: "/path-to-page-3",
    },
];

export default function EmailGen() {
    const [selectedCard, setSelectedCard] = useState<number | null>(null);

    const handleCardClick = (index: number) => {
        setSelectedCard(index);
    };

    return (
        <ContentLayout title="Inbox">
            <div>
                <Tabs defaultValue="prompt" className="mt-4 space-y-4">
                    <TabsList>
                        <TabsTrigger value="prompt">Prompt</TabsTrigger>
                        <TabsTrigger value="template">Template</TabsTrigger>
                        <TabsTrigger value="followup">Follow Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="prompt" className="space-y-4 mx-2">
                        <div className='space-4 flex flex-row'>
                            <div className='w-3/4'>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
                                    {cardData.map((card, index) => (
                                        <a
                                            key={index}
                                            // href={card.href}
                                            onClick={() => handleCardClick(index)}
                                            className="block"
                                        >
                                            <Card className={` ${selectedCard === index ? 'bg-primary' : ''} w-full`}>
                                                <CardHeader>
                                                    <CardTitle>{card.title}</CardTitle>
                                                    <CardDescription>{card.description}</CardDescription>
                                                </CardHeader>
                                            </Card>
                                        </a>
                                    ))}
                                    <div className="col-span-full">
                                        <h1 className='font-bold text-2xl my-2'>
                                            Param 1
                                        </h1>
                                        <TextareaForm />
                                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                            <MultiSelectForm
                                                title="Select Tone"
                                                description="Choose one or more locations from the list below."
                                                options={locations}
                                            />
                                            <MultiSelectForm
                                                title="Select Signal"
                                                description="Choose one or more locations from the list below."
                                                options={locations}
                                            />
                                            <MultiSelectForm
                                                title="See result"
                                                description="Choose one or more locations from the list below."
                                                options={locations}
                                            />
                                        </div>
                                        <div className=' mt-4'>
                                            <Textarea value={preWrittenOutput} disabled className='min-h-[300px] overflow-auto' />
                                        </div>
                                        <h1 className='font-bold text-2xl my-2'>
                                            Param 2
                                        </h1>
                                        <TextareaForm />
                                    </div>
                                </div>
                            </div>
                            <div className='bg-muted w-1/4 mx-4'>
                                <Card className={`  `}>
                                    <CardHeader>
                                        <CardTitle>Lead details</CardTitle>
                                        <CardDescription>askjkdkhajsd</CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="template" className="space-y-4">
                        <div>
                            Template tab content
                        </div>
                    </TabsContent>

                    <TabsContent value="followup" className="space-y-4">
                        <div>
                            Follow Up tab content
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </ContentLayout>
    );
}
