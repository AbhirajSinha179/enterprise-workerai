'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import ContentLayout from '@/components/layout/content-layout'
import { ContentLayout } from '@/components/layout/content-layout'

import DraggableParagraphFormList from '@/components/generate/DraggableParagraphFormList'
import SubjectOptionsEditor from '@/components/generate/SubjectOptionsEditor'

export default function EmailGen() {
    const [language, setLanguage] = useState('en')
    const [companyName, setCompanyName] = useState('E2E Networks')
    const [domain, setDomain] = useState('e2enetworks.com')
    const [description, setDescription] = useState('E2E Networks provides secure, cost-effective cloud infrastructure.')
    const [subjectOptions, setSubjectOptions] = useState([
        "Subject: {target_name}, cut costs with E2E Networks—worth a chat?",
        "Subject: {target_name}, reduce GPU/IT costs by 40%—interested?"
    ])
    const [tabs, setTabs] = useState([{ id: 1, name: 'Follow Up' }])

    const addNewTab = () => {
        setTabs([...tabs, { id: tabs.length + 1, name: `Follow Up ${tabs.length + 1}` }])
    }

    return (
        <ContentLayout title="Email Generation">
            <Tabs defaultValue="emails">
                <div className="px-2 py-2 flex justify-between items-center w-2/3">
                    <TabsList>
                        <TabsTrigger value="emails">Emails</TabsTrigger>
                        {tabs.map((tab) => (
                            <TabsTrigger key={tab.id} value={`followup${tab.id}`}>
                                {tab.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <div className="flex gap-2">
                        <Button onClick={addNewTab} variant="secondary">Add Follow Up</Button>
                        <Button variant="secondary">Reset</Button>
                    </div>
                </div>

                <TabsContent value="emails">
                    <div className="flex gap-4">
                        <div className="w-2/3 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>General Info</CardTitle>
                                </CardHeader>
                                {/* <CardDescription> */}
                                <div>
                                    <SubjectOptionsEditor
                                        language={language}
                                        setLanguage={setLanguage}
                                        companyName={companyName}
                                        setCompanyName={setCompanyName}
                                        domain={domain}
                                        setDomain={setDomain}
                                        description={description}
                                        setDescription={setDescription}
                                        subjectOptions={subjectOptions}
                                        setSubjectOptions={setSubjectOptions}
                                    />

                                </div>

                                {/* </CardDescription> */}
                            </Card>

                            <div className="mt-4">
                                <h1 className="text-xl font-bold my-2">Content Generation</h1>
                                <Separator />
                            </div>

                            <DraggableParagraphFormList />
                        </div>

                        <div className="w-1/3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Response</CardTitle>
                                    <CardDescription>Generated Response</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {tabs.map((tab) => (
                    <TabsContent key={tab.id} value={`followup${tab.id}`}>
                        <div className="p-4">
                            <h2 className="text-lg font-semibold">{tab.name} Content</h2>
                            {/* Follow-up content here */}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </ContentLayout>
    )
}
