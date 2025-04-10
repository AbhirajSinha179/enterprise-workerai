'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface Props {
    useRefinement: boolean
    setUseRefinement: (val: boolean) => void
    refineProvider: string
    setRefineProvider: (val: string) => void
    refineModel: string
    setRefineModel: (val: string) => void
    temperature: number
    setTemperature: (val: number) => void
    promptTemplate: string
    setPromptTemplate: (val: string) => void
    maxTokens: number
    setMaxTokens: (val: number) => void
}

export default function FinalRefinementEditor({
    useRefinement,
    setUseRefinement,
    refineProvider,
    setRefineProvider,
    refineModel,
    setRefineModel,
    temperature,
    setTemperature,
    promptTemplate,
    setPromptTemplate,
    maxTokens,
    setMaxTokens
}: Props) {
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Use Final Refinement?</CardTitle>
                <Switch checked={useRefinement} onCheckedChange={setUseRefinement} />
            </CardHeader>
            {useRefinement && (
                <CardContent className="space-y-4">
                    <div>
                        <Label>Refine Provider</Label>
                        <Input value={refineProvider} onChange={(e) => setRefineProvider(e.target.value)} />
                    </div>

                    <div>
                        <Label>Refine Model</Label>
                        <Input value={refineModel} onChange={(e) => setRefineModel(e.target.value)} />
                    </div>

                    <div>
                        <Label>Temperature</Label>
                        <Input
                            type="number"
                            step="0.1"
                            min="0"
                            max="1"
                            value={temperature}
                            onChange={(e) => setTemperature(parseFloat(e.target.value))}
                        />
                    </div>

                    <div>
                        <Label>Refine Prompt Template</Label>
                        <Textarea
                            rows={3}
                            value={promptTemplate}
                            onChange={(e) => setPromptTemplate(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Max Tokens</Label>
                        <Input
                            type="number"
                            value={maxTokens}
                            onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                        />
                    </div>
                </CardContent>
            )}
        </Card>
    )
}
