"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";

const ViewButton: React.FC = () => {
    const [selectedColumn, setSelectedColumn] = useState("recent");

    const table = [
        "recent",
        "today",
        "this week",
        "this month",
        "custom"
    ];

    return (
        <div className="flex items-center">
            {selectedColumn === "custom" && (
                <div className="mr-4">
                    <DatePickerWithRange />
                </div>
            )}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="lg"
                        className="mx-2 hidden lg:flex"
                    >
                        <MixerHorizontalIcon className="mr-2 size-4" />
                        Filter
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[150px]">
                    <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={selectedColumn} onValueChange={setSelectedColumn}>
                        {table.map((column) => (
                            <DropdownMenuRadioItem key={column} value={column} className="capitalize">
                                {column}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ViewButton;
