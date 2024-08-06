"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { PauseCircle, PlayCircle } from "lucide-react";

const preWrittenOutput = `
Enter the Magic prompt 
`;

interface ParaInputProps {
    index: number;
    onDelete: (index: number) => void;
}

const MagicPrompt = ({ index, onDelete }: ParaInputProps) => {


    const [isPlaying, setIsPlaying] = useState(false);



    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="my-4 border-2 p-4 rounded-md relative group border-primary/25">
            <div className="col-span-full">
                <div className="flex flex-row justify-between mb-4">
                    <div className="flex flex-row gap-x-3 items-center">
                        <Button variant="ghost" onClick={handlePlayPause}>
                            {isPlaying ? <PauseCircle size={30} /> : <PlayCircle size={30} />}
                        </Button>
                        {/* <h1 className='font-bold text-2xl my-2'>
                        
                        </h1> */}
                        <h3 className="text-2xl font-semibold leading-none tracking-tight my-2">
                            Magic Prompt {index}
                        </h3>
                    </div>
                    <Button variant={'destructive'} onClick={() => onDelete(index)}>Delete</Button>
                </div>
                <div className="flex mx-2 w-full">
                    <Textarea
                        placeholder={preWrittenOutput}
                        className="h-[150px] w-full"
                    />
                </div>
                {/* <div className="my-4 ">
                    {isPlaying && (
                        <div className=" mx-2 w-full">
                            <Textarea
                                placeholder="Generated result Prompt "
                                className="h-[50px] w-full"
                            />
                        </div>
                    )}
                </div> */}
            </div>
        </div>
    );
}

export default MagicPrompt;
