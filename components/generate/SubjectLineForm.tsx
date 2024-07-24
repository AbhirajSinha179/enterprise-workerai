"use client";

import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function SubjectLineForm() {
    const [textAreas, setTextAreas] = useState([1, 2, 3]);

    const addTextArea = () => {
        setTextAreas([...textAreas, textAreas.length + 1]);
    };

    const removeTextArea = (index: any) => {
        if (textAreas.length > 3) {
            setTextAreas(textAreas.filter((_, i) => i !== index));
        }
    };

    return (

        <div className="flex flex-col">
            <div className="gap-y-2 my-2 ">
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
            <div className="flex justify-end mb-4">
                <Button type="button" onClick={addTextArea}>
                    Add Subject Line
                </Button>

            </div>


        </div>

    );
}
