"use client";

import React, { useState } from 'react';
import { ContentLayout } from "@/components/layout/content-layout";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ParaInput from '@/components/generate/paraInput';
import ToneSelectForm from '@/components/generate/ToneSelectForm';
import { Button } from '@/components/ui/button';
import Tiptap from '@/components/generate/Tiptap';
import Editor from '@/components/generate/Editor';

const locations = [
    { name: "India" },
    { name: "USA" },
    { name: "Germany" },
];

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
    const [paraInputs, setParaInputs] = useState<number[]>([1, 2, 3]);

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

    return (
        <ContentLayout title="Email Generation">
            <div>

                <Editor />

            </div>
        </ContentLayout>
    );
}
