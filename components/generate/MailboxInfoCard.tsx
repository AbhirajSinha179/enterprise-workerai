'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface MailboxInfoCardProps {
    title: string
    mailbox: string
    setMailbox: (val: string) => void
    salesRep: string
    setSalesRep: (val: string) => void
    leads: number
    setLeads: (val: number) => void
}

export default function MailboxInfoCard({
    title,
    mailbox,
    setMailbox,
    salesRep,
    setSalesRep,
    leads,
    setLeads
}: MailboxInfoCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <Label>Mailbox</Label>
                        <Input
                            value={mailbox}
                            onChange={(e) => setMailbox(e.target.value)}
                            placeholder="e.g. test@e2enetworks.com"
                        />
                    </div>

                    <div>
                        <Label>Sales Rep Name</Label>
                        <Input
                            value={salesRep}
                            onChange={(e) => setSalesRep(e.target.value)}
                            placeholder="e.g. John E2E"
                        />
                    </div>

                    <div>
                        <Label># Leads</Label>
                        <Input
                            type="number"
                            value={leads}
                            onChange={(e) => setLeads(parseInt(e.target.value))}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
