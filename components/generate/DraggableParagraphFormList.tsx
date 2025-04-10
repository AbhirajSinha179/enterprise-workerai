'use client'

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectItem,
    SelectContent,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import { GripVertical, TrashIcon } from 'lucide-react'

function ParagraphForm({
    item,
    updateItem,
    removeItem,
}: {
    item: any
    updateItem: (id: number, field: string, value: any) => void
    removeItem: (id: number) => void
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id })
    const style = { transform: CSS.Transform.toString(transform), transition }

    const handleChange = (field: string, value: any) => {
        if (field in item.formData.dataInclusions) {
            updateItem(item.id, 'formData', {
                ...item.formData,
                dataInclusions: { ...item.formData.dataInclusions, [field]: value },
            })
        } else if (field === 'type') {
            updateItem(item.id, 'type', value)
        } else {
            updateItem(item.id, 'formData', { ...item.formData, [field]: value })
        }
    }

    return (
        <div ref={setNodeRef} style={style} className="relative mt-4">
            <div className="flex items-start gap-4">
                <div {...attributes} {...listeners} className="cursor-move mt-2 text-muted-foreground">
                    <GripVertical />
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => removeItem(item.id)}
                        className="mt-4 ml-2"
                    >
                        <TrashIcon size={10} />
                    </Button>
                </div>
                <div className="w-full">
                    <Card>
                        <CardContent className="space-y-4 py-4">
                            <div>
                                <Label>Type</Label>
                                <Select value={item.type} onValueChange={(val) => handleChange('type', val)}>
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

                            {item.type === 'static' && (
                                <div>
                                    <Label>Content</Label>
                                    <Textarea
                                        placeholder="Write static content..."
                                        value={item.formData.content}
                                        onChange={(e) => handleChange('content', e.target.value)}
                                    />
                                </div>
                            )}

                            {item.type === 'gpt' && (
                                <>
                                    <Label>Prompt Template</Label>
                                    <Textarea
                                        placeholder="Prompt for GPT..."
                                        value={item.formData.promptTemplate}
                                        onChange={(e) => handleChange('promptTemplate', e.target.value)}
                                    />
                                    <Label>Provider</Label>
                                    <Input
                                        placeholder="openai"
                                        value={item.formData.provider}
                                        onChange={(e) => handleChange('provider', e.target.value)}
                                    />
                                    <Label>Model</Label>
                                    <Input
                                        value={item.formData.model}
                                        onChange={(e) => handleChange('model', e.target.value)}
                                    />
                                    <Label>Temperature</Label>
                                    <Input
                                        value={item.formData.temperature}
                                        onChange={(e) => handleChange('temperature', e.target.value)}
                                    />
                                </>
                            )}

                            {item.type === 'linkedin' && (
                                <>
                                    <Label>Prompt Template</Label>
                                    <Textarea
                                        value={item.formData.promptTemplate}
                                        onChange={(e) => handleChange('promptTemplate', e.target.value)}
                                    />
                                    <Label>Model</Label>
                                    <Input
                                        value={item.formData.model}
                                        onChange={(e) => handleChange('model', e.target.value)}
                                    />
                                    <Label>Temperature</Label>
                                    <Input
                                        value={item.formData.temperature}
                                        onChange={(e) => handleChange('temperature', e.target.value)}
                                    />
                                    <Label className="mt-2 block">Data Inclusions:</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(item.formData.dataInclusions).map(([key, val]: any) => (
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

                            {item.type === 'perplexity' && (
                                <>
                                    <Label>Prompt Template</Label>
                                    <Textarea
                                        value={item.formData.promptTemplate}
                                        onChange={(e) => handleChange('promptTemplate', e.target.value)}
                                    />
                                    <Label>API Key</Label>
                                    <Input
                                        value={item.formData.apiKey}
                                        onChange={(e) => handleChange('apiKey', e.target.value)}
                                    />
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default function DraggableParagraphFormList({
    paragraphs,
    setParagraphs,
    updateParagraph,
}: {
    paragraphs: any[]
    setParagraphs: (items: any[]) => void
    updateParagraph: (id: number, field: string, value: any) => void
}) {
    const sensors = useSensors(useSensor(PointerSensor))
    const [items, setItems] = useState([
        {
            id: Date.now(),
            type: 'static',
            formData: {
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
            },
        },
    ])

    const handleDragEnd = (event: any) => {
        const { active, over } = event
        if (active.id !== over.id) {
            const oldIndex = items.findIndex((i) => i.id === active.id)
            const newIndex = items.findIndex((i) => i.id === over.id)
            setItems(arrayMove(items, oldIndex, newIndex))
        }
    }

    const addNewItem = () => {
        const newItem = {
            id: Date.now(),
            type: 'static',
            formData: {
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
            },
        }
        setItems((prev) => [...prev, newItem])
    }

    const removeItem = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id))
    }

    const updateItem = (id: number, field: string, value: any) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        )
    }

    const handleSubmit = () => {
        console.log('Submitted Paragraphs:', items)
        alert('Submitted! Check console for full list.')
    }

    return (
        <div>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                    {items.map((item) => (
                        <ParagraphForm
                            key={item.id}
                            item={item}
                            updateItem={updateItem}
                            removeItem={removeItem}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            <div className="mt-4 flex justify-between">
                <Button onClick={addNewItem}>Add Paragraph</Button>
                <Button variant="secondary" onClick={handleSubmit}>Submit All</Button>
            </div>
        </div>
    )
}
