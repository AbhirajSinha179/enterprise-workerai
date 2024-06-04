"use client"

import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { ContentLayout } from '@/components/layout/content-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function MailboxPage() {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        domain: '',
        warmupCapacity: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
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
                    name="id"
                    placeholder="ID"
                    value={formData.id}
                    onChange={handleChange}
                    className="mt-5"
                />
                <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-5"
                />
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-5"
                />
                <Input
                    type="text"
                    name="domain"
                    placeholder="Domain"
                    value={formData.domain}
                    onChange={handleChange}
                    className="mt-5"
                />
                <Input
                    type="text"
                    name="warmupCapacity"
                    placeholder="Warmup Capacity"
                    value={formData.warmupCapacity}
                    onChange={handleChange}
                    className="mt-5"
                />
                <Link
                    href={{
                        pathname: '/dashboard/mailbox',
                        query: { ...formData }
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
