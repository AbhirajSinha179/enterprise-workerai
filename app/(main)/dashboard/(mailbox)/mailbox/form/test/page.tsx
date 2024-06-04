"use client"

import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { ContentLayout } from '@/components/layout/content-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function MailboxPage() {
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = () => {
        console.log("Submit button clicked");
        // Perform any additional logic here if needed
    };

    return (
        <ContentLayout title="Mailbox">
            <div className="p-5 m-5">
                <Input
                    type="text"
                    placeholder="User Name"
                    value={userName}
                    onChange={handleUserNameChange}
                    className="mt-5"
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="mt-10"
                />
                <Link
                    href={{
                        pathname: '/dashboard/mailbox',
                        query: { userName, password }
                    }}
                    passHref
                >
                    <Button onClick={handleSubmit} className="mt-10">
                        Submit
                    </Button>
                </Link>
            </div>
        </ContentLayout>
    );
}
