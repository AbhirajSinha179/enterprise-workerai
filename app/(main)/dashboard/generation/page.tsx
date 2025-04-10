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
import ClosingOptionsEditor from '@/components/generate/ClosingOptionsEditor'
import SignatureFormatEditor from '@/components/generate/SignatureFormatEditor'
import FinalRefinementEditor from '@/components/generate/FinalRefinementEditor'
import MailboxInfoCard from '@/components/generate/MailboxInfoCard'

export default function EmailGen() {
    const [language, setLanguage] = useState('en')
    const [companyName, setCompanyName] = useState('E2E Networks')
    const [domain, setDomain] = useState('e2enetworks.com')
    const [description, setDescription] = useState('E2E Networks provides secure, cost-effective cloud infrastructure.')
    const [subjectOptions, setSubjectOptions] = useState([
        "Subject: {target_name}, cut costs with E2E Networks—worth a chat?",
        "Subject: {target_name}, reduce GPU/IT costs by 40%—interested?"
    ])
    const [closingOptions, setClosingOptions] = useState([
        'Looking forward to your thoughts!',
        'Could we schedule a chat next week?'
    ])
    const [signature, setSignature] = useState('Best, {sender_name}{sender_title}, {sender_company_name}')

    const [useRefinement, setUseRefinement] = useState(true)
    const [refineProvider, setRefineProvider] = useState('openai')
    const [refineModel, setRefineModel] = useState('gpt-4o-mini')
    const [temperature, setTemperature] = useState(0.7)
    const [promptTemplate, setPromptTemplate] = useState(
        'Below is a sales email. Make changes if necessary to make it crisp...'
    )
    const [maxTokens, setMaxTokens] = useState(500)
    const [mailbox, setMailbox] = useState('test@e2enetworks.com')
    const [salesRep, setSalesRep] = useState('John E2E')
    const [leads, setLeads] = useState(3)
    const [paragraphs, setParagraphs] = useState([
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
    const updateParagraph = (id: number, field: string, value: any) => {
        setParagraphs((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        )
    }




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

                            <DraggableParagraphFormList
                                paragraphs={paragraphs}
                                setParagraphs={setParagraphs}
                                updateParagraph={updateParagraph}
                            />
                            <Button onClick={() => console.log('Final Submission:', paragraphs)}>
                                Submit All
                            </Button>

                            <ClosingOptionsEditor
                                closingOptions={closingOptions}
                                setClosingOptions={setClosingOptions}
                            />
                            <SignatureFormatEditor
                                signature={signature}
                                setSignature={setSignature}
                            />

                            <FinalRefinementEditor
                                useRefinement={useRefinement}
                                setUseRefinement={setUseRefinement}
                                refineProvider={refineProvider}
                                setRefineProvider={setRefineProvider}
                                refineModel={refineModel}
                                setRefineModel={setRefineModel}
                                temperature={temperature}
                                setTemperature={setTemperature}
                                promptTemplate={promptTemplate}
                                setPromptTemplate={setPromptTemplate}
                                maxTokens={maxTokens}
                                setMaxTokens={setMaxTokens}
                            />
                            <MailboxInfoCard
                                title="Test with /test-e2e"
                                mailbox={mailbox}
                                setMailbox={setMailbox}
                                salesRep={salesRep}
                                setSalesRep={setSalesRep}
                                leads={leads}
                                setLeads={setLeads}
                            />

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
