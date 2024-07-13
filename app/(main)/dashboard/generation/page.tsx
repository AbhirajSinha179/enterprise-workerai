"use client";

import React, { useState } from 'react';
import { ContentLayout } from "@/components/layout/content-layout";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextareaForm } from '@/components/generate/TextareaForm';

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
            <div >

                <Tabs defaultValue="prompt" className="mt-4 space-y-4">
                    <TabsList>
                        <TabsTrigger value="prompt">Prompt</TabsTrigger>
                        <TabsTrigger value="template">Template</TabsTrigger>
                        <TabsTrigger value="followup">Follow Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="prompt" className="space-y-4 mx-2">
                        <div className=' space-4 flex flex-row'>
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
                                        <h1 className='font bold text-2xl my-2'>
                                            Param 1
                                        </h1>
                                        {/* <Card className="">
                                        <CardHeader>
                                            <CardTitle>Para 1 </CardTitle>
                                        </CardHeader>
                                        <CardDescription>
                                            <TextareaForm />
                                        </CardDescription>
                                    </Card> */}
                                        <TextareaForm></TextareaForm>

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
