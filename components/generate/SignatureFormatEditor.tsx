'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Props {
    signature: string
    setSignature: (value: string) => void
}

export default function SignatureFormatEditor({ signature, setSignature }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Signature Format</CardTitle>
            </CardHeader>
            <CardContent>
                <Input
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    placeholder="Best, {sender_name}{sender_title}, {sender_company_name}"
                />
            </CardContent>
        </Card>
    )
}
