'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash } from 'lucide-react'

type Props = {
    language: string
    setLanguage: (value: string) => void
    companyName: string
    setCompanyName: (value: string) => void
    domain: string
    setDomain: (value: string) => void
    description: string
    setDescription: (value: string) => void
    subjectOptions: string[]
    setSubjectOptions: (options: string[]) => void
}

export default function SubjectOptionsEditor({
    language,
    setLanguage,
    companyName,
    setCompanyName,
    domain,
    setDomain,
    description,
    setDescription,
    subjectOptions,
    setSubjectOptions,
}: Props) {
    const handleSubjectChange = (value: string, index: number) => {
        const updated = [...subjectOptions]
        updated[index] = value
        setSubjectOptions(updated)
    }

    const removeSubject = (index: number) => {
        const updated = subjectOptions.filter((_, i) => i !== index)
        setSubjectOptions(updated)
    }

    const addSubject = () => {
        setSubjectOptions([...subjectOptions, ''])
    }

    return (
        // <Card>
        //     <CardHeader>
        //         <CardTitle>General Info</CardTitle>
        //     </CardHeader>
        // <CardContent className="space-y-4">
        <div className='mx-2 p-4'>
            <div>
                <label className="text-sm font-medium">Language</label>
                <Input value={language} onChange={(e) => setLanguage(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="text-sm font-medium">Company Name</label>
                    <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </div>
                <div>
                    <label className="text-sm font-medium">Domain</label>
                    <Input value={domain} onChange={(e) => setDomain(e.target.value)} />
                </div>
                <div>
                    <label className="text-sm font-medium">Description</label>
                    <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
            </div>

            <div>
                <label className="text-sm font-medium">Subject Options</label>
                <div className="flex flex-col">
                    {subjectOptions.map((subject, index) => (
                        <div key={index} className="relative flex items-center my-2">
                            <Input
                                className="flex-1"
                                placeholder="Subject line"
                                value={subject}
                                onChange={(e) => handleSubjectChange(e.target.value, index)}
                            />
                            <Button
                                type="button"
                                size="icon"
                                variant="destructive"
                                onClick={() => removeSubject(index)}
                                className="ml-2"
                            >
                                <Trash size={16} />
                            </Button>
                        </div>
                    ))}
                    <Button variant="outline" onClick={addSubject} className="mt-2 w-fit">
                        + Add Subject
                    </Button>
                </div>
            </div>
        </div>

        //     </CardContent>
        // </Card>
    )
}
