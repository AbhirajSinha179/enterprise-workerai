'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2 } from 'lucide-react'

interface ClosingOptionsEditorProps {
    closingOptions: string[]
    setClosingOptions: (options: string[]) => void
}

export default function ClosingOptionsEditor({
    closingOptions,
    setClosingOptions
}: ClosingOptionsEditorProps) {
    const handleChange = (index: number, value: string) => {
        const updated = [...closingOptions]
        updated[index] = value
        setClosingOptions(updated)
    }

    const handleAdd = () => {
        setClosingOptions([...closingOptions, ''])
    }

    const handleDelete = (index: number) => {
        const updated = [...closingOptions]
        updated.splice(index, 1)
        setClosingOptions(updated)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Closing Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {closingOptions.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <Input
                            value={option}
                            onChange={(e) => handleChange(index, e.target.value)}
                            placeholder="Add closing line..."
                        />
                        <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(index)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
                <Button variant="outline" onClick={handleAdd}>
                    + Add Closing
                </Button>
            </CardContent>
        </Card>
    )
}
