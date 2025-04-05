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
import { Card } from '@/components/ui/card'
import { GripVertical, TrashIcon } from 'lucide-react'
import ParagraphForm from './ParagraphForm'

type Item = { id: number }

function SortableParagraph({ id, onRemove }: { id: number; onRemove: (id: number) => void }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
    const style = { transform: CSS.Transform.toString(transform), transition }

    return (
        <div ref={setNodeRef} style={style} className="relative mt-4">
            <div className="flex items-start gap-4">
                <div {...attributes} {...listeners} className="cursor-move mt-2 text-muted-foreground">
                    <GripVertical />
                    <Button size="sm" variant="secondary" onClick={() => onRemove(id)} className="mt-4 ml-2">
                        <TrashIcon size={10} />
                    </Button>
                </div>
                <div className="w-full">
                    <ParagraphForm />
                </div>
            </div>
        </div>
    )
}

export default function DraggableParagraphFormList() {
    const [items, setItems] = useState<Item[]>([{ id: 1 }])
    const sensors = useSensors(useSensor(PointerSensor))

    const handleDragEnd = (event: any) => {
        const { active, over } = event
        if (active.id !== over.id) {
            const oldIndex = items.findIndex((i) => i.id === active.id)
            const newIndex = items.findIndex((i) => i.id === over.id)
            setItems(arrayMove(items, oldIndex, newIndex))
        }
    }

    const addNewItem = () => setItems([...items, { id: Date.now() }])
    const removeItem = (id: number) => setItems(items.filter((item) => item.id !== id))

    return (
        <div>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                    {items.map((item) => (
                        <SortableParagraph key={item.id} id={item.id} onRemove={removeItem} />
                    ))}
                </SortableContext>
            </DndContext>

            <div className="mt-4 flex justify-end">
                <Button onClick={addNewItem}>Add Paragraph</Button>
            </div>
        </div>
    )
}
