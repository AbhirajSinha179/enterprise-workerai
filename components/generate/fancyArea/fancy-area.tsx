"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Write } from "@/components/generate/fancyArea/write";
// import { Preview } from "./preview";
// TODO: TabsList has an interesting tab focus. Need to investigate on it

const defaultText = `Temporary text `

export function FancyArea() {
    const [textValue, setTextValue] = React.useState(defaultText);

    return (
        <div
            defaultValue="write"
            className="w-full"
        >
            <Write {...{ textValue, setTextValue }} />
        </div>
    );
};