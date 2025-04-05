'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'

export default function ParagraphForm() {
    const [type, setType] = useState('static')
    const [formData, setFormData] = useState({
        content: '',
        promptTemplate: '',
        model: '',
        temperature: '',
        provider: '',
        apiKey: '',
        dataInclusions: {
            about: true,
            experience: true,
            recommendations: true,
            education: true,
        },
    })

    const handleChange = (field: string, value: string | boolean) => {
        if (field in formData.dataInclusions) {
            setFormData((prev: any) => ({
                ...prev,
                dataInclusions: { ...prev.dataInclusions, [field]: value },
            }))
        } else {
            setFormData((prev) => ({ ...prev, [field]: value }))
        }
    }

    const handleSubmit = () => {
        console.log({ type, ...formData })
        alert('Submitted! Check console for data.')
    }

    return (
        <Card className="  ">
            <CardContent className="space-y-4 py-4">
                <div>
                    <Label>Type</Label>
                    <Select defaultValue={type} onValueChange={(value) => setType(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="static">Static</SelectItem>
                            <SelectItem value="gpt">GPT</SelectItem>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                            <SelectItem value="perplexity">Perplexity</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {type === 'static' && (
                    <div>
                        <Label>Content</Label>
                        <Textarea
                            placeholder="Write static content..."
                            value={formData.content}
                            onChange={(e) => handleChange('content', e.target.value)}
                        />
                    </div>
                )}

                {type === 'gpt' && (
                    <>
                        <Label>Prompt Template</Label>
                        <Textarea
                            placeholder="Provide a short compliment for {lead_first_name}..."
                            value={formData.promptTemplate}
                            onChange={(e) => handleChange('promptTemplate', e.target.value)}
                        />

                        <Label>AI Provider Config</Label>
                        <Input
                            placeholder="Provider"
                            value={formData.provider}
                            onChange={(e) => handleChange('provider', e.target.value)}
                        />
                        <Input
                            placeholder="Model"
                            value={formData.model}
                            onChange={(e) => handleChange('model', e.target.value)}
                        />
                        <Input
                            placeholder="Temperature"
                            value={formData.temperature}
                            onChange={(e) => handleChange('temperature', e.target.value)}
                        />
                    </>
                )}

                {type === 'linkedin' && (
                    <>
                        <Label>Prompt Template</Label>
                        <Textarea
                            placeholder="Provide a short compliment for {lead_first_name}..."
                            value={formData.promptTemplate}
                            onChange={(e) => handleChange('promptTemplate', e.target.value)}
                        />
                        <Label>Model</Label>
                        <Input
                            value={formData.model}
                            onChange={(e) => handleChange('model', e.target.value)}
                        />
                        <Label>Temperature</Label>
                        <Input
                            value={formData.temperature}
                            onChange={(e) => handleChange('temperature', e.target.value)}
                        />

                        <Label className="mt-2 block">Data Inclusions:</Label>
                        <div className="grid grid-cols-2 gap-2">
                            {Object.entries(formData.dataInclusions).map(([key, val]) => (
                                <div className="flex items-center space-x-2" key={key}>
                                    <Checkbox
                                        id={key}
                                        checked={val}
                                        onCheckedChange={(checked) => handleChange(key, !!checked)}
                                    />
                                    <label htmlFor={key} className="capitalize">{key}</label>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {type === 'perplexity' && (
                    <>
                        <Label>Prompt Template</Label>
                        <Textarea
                            placeholder="Provide a short compliment for {lead_first_name}..."
                            value={formData.promptTemplate}
                            onChange={(e) => handleChange('promptTemplate', e.target.value)}
                        />
                        <Label>API Key</Label>
                        <Input
                            value={formData.apiKey}
                            onChange={(e) => handleChange('apiKey', e.target.value)}
                        />
                    </>
                )}

                <Button onClick={handleSubmit} className="w-full mt-4">
                    Submit
                </Button>
            </CardContent>
        </Card>
    )
}
