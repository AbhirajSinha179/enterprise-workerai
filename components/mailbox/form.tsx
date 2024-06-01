'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from 'zod';
import { FormDataSchema } from '@/app/(main)/dashboard/(mailbox)/data/formSchema';
import { Button } from "../ui/button";

type Inputs = z.infer<typeof FormDataSchema>;

const steps = [
    {
        id: 'Step 1',
        name: '',
        fields: ['firstName', 'lastName', 'email']
    },
    {
        id: 'Step 2',
        name: '',
        fields: ['country', 'state', 'city', 'street', 'zip']
    },
    { id: 'Step 3', name: '' }
];

export default function Form() {
    const [previousStep, setPreviousStep] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
    const [imap, setImap] = useState<string | null>(null);
    const delta = currentStep - previousStep;

    const {

        handleSubmit,
        reset,
        trigger,
    } = useForm<Inputs>({
        resolver: zodResolver(FormDataSchema)
    });

    const processForm: SubmitHandler<Inputs> = data => {
        console.log("Form submitted:", data);
        reset();
    };

    type FieldName = keyof Inputs;

    const handleGoogleClick = async () => {
        console.log("Google button clicked");
        await next('Google');
    };

    const handleMicrosoftClick = async () => {
        console.log("Microsoft button clicked");
        await next('Microsoft');
    };

    const handleImapEnabledClick = async () => {
        console.log("IMAP enabled button clicked");
        setImap("True");
        await next("");
    };

    const handleSmtpEnabledClick = async () => {
        console.log("SMTP enabled button clicked");
        setImap("False");
        // await next("");
    };

    const handleLoginClick = () => {
        console.log("Login button clicked");
    };

    const next = async (provider: string) => {
        if (provider) {
            setSelectedProvider(provider);
        }
        const step = steps[currentStep];
        const fields = step?.fields || [];
        const output = await trigger(fields as FieldName[], { shouldFocus: true });

        if (!output) { return; }

        if (currentStep < steps.length - 1) {
            if (currentStep === steps.length - 2) {
                await handleSubmit(processForm)();
            }
            setPreviousStep(currentStep);
            setCurrentStep(step => step + 1);
        }
    };

    const prev = () => {
        console.log("Previous button clicked");
        if (currentStep > 0) {
            setPreviousStep(currentStep);
            setCurrentStep(step => step - 1);
        }
    };

    return (
        < >
            {/* steps */}
            <nav aria-label='Progress' >
                <ol className='space-y-4 md:flex md:space-x-8 md:space-y-0 '>
                    {steps.map((step, index) => (
                        <li key={step.name} className='md:flex-1'>
                            {currentStep > index ? (
                                <div className='group flex w-full flex-col border-l-4 border-primary py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                    <span className='text-sm font-medium text-primary transition-colors '>
                                        {step.id}
                                    </span>
                                    <span className='text-sm font-medium '>{step.name}</span>
                                </div>
                            ) : currentStep === index ? (
                                <div
                                    className='flex w-full flex-col border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                                    aria-current='step'
                                >
                                    <span className='text-sm font-medium text-primary'>
                                        {step.id}
                                    </span>
                                    <span className='text-sm font-medium'>{step.name}</span>
                                </div>
                            ) : (
                                <div className='group flex w-full flex-col border-l-4 border-secondary py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                    <span className='text-sm font-medium text-primary transition-colors'>
                                        {step.id}
                                    </span>
                                    <span className='text-sm font-medium'>{step.name}</span>
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
            {/* Navigation */}
            {currentStep !== 0 && (
                <div className='mt-10 flex '>
                    <div className='flex justify-between'>
                        <button
                            type='button'
                            onClick={prev}
                            disabled={currentStep === 0}
                            className='rounded bg-primary px-2 py-1 text-sm font-semibold text-primary-foreground shadow-sm ring-1 ring-inset hover:bg-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='size-6'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15.75 19.5L8.25 12l7.5-7.5'
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(processForm)} >
                {currentStep === 0 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className="flex justify-center mt-8">
                            <h1 className='text-4xl font-semibold leading-7 text-primary'>
                                Connect a new email account
                            </h1>
                        </div>
                        <div className="my-10 py-5 flex items-center justify-center">
                            <div className="flex flex-col space-y-4 h-auto py-5 px-50 w-full justify-center items-center">
                                <div className="flex items-center p-4 border rounded-lg shadow-md 
                                justify-center w-1/3 transition ease-in-out delay-150 hover:-translate-y-1 
                                hover:scale-110 duration-300 cursor-pointer " onClick={handleGoogleClick}>
                                    <Image
                                        src="/assets/mailbox/search.png"
                                        alt="Google logo"
                                        className="mr-4"
                                        width={40}
                                        height={40}
                                    />
                                    <div>
                                        <div className="text-lg font-semibold text-primary">Google</div>
                                        <div className="text-primary">Gmail / G-Suite</div>
                                    </div>
                                </div>
                                <div className="flex items-center p-4 border rounded-lg shadow-md
                                 justify-center w-1/3 transition ease-in-out delay-150 hover:-translate-y-1
                                  hover:scale-110 duration-300 cursor-pointer " onClick={handleMicrosoftClick}>
                                    <Image
                                        src="/assets/mailbox/microsoftLogo.png"
                                        alt="Microsoft logo"
                                        className="mr-4"
                                        width={40}
                                        height={40}
                                    />
                                    <div>
                                        <div className="text-lg font-semibold text-primary">Microsoft</div>
                                        <div className="text-primary">Office 365 / Outlook</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {currentStep === 1 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className=" flex  justify-center items-center my-2  ">
                            {selectedProvider === "Google" && (
                                <div className=" shadow-md rounded-lg p-6 max-w-md w-full bg-muted">
                                    <h1 className="text-2xl font-bold mb-4">Connect Your Google Account</h1>
                                    <p className="mb-6">
                                        First, let’s
                                        <Link href={""} className="text-blue-600 px-1">
                                            Enable IMAP
                                        </Link>
                                        access for your Google account.
                                    </p>
                                    <ol className="list-decimal list-inside mb-6 space-y-4">
                                        <li>
                                            On your computer, open Gmail.
                                        </li>
                                        <li>
                                            Click the gear icon in the top right corner.
                                        </li>
                                        <li>
                                            Click <span className="font-semibold">All Settings</span>.
                                        </li>
                                        <li>
                                            Click the <span className="font-semibold">Forwarding and POP/IMAP</span> tab.
                                        </li>
                                        <li>
                                            In the <span className="font-semibold">IMAP access</span> section, select{' '}
                                            <Link href={""} className="text-blue-600 px-1">
                                                Enable IMAP
                                            </Link>
                                        </li>
                                        <li>
                                            Click <span className="font-semibold">Save Changes</span>.
                                        </li>
                                    </ol>
                                    <div className="flex justify-center">
                                        <button
                                            type="button"
                                            className="bg-primary font-bold text-primary-foreground py-2 px-4 rounded hover:-translate-y-1 
                                            hover:scale-110 duration-300"
                                            onClick={handleImapEnabledClick}>
                                            Yes, IMAP has been enabled
                                        </button>
                                    </div>
                                </div>
                            )}
                            {selectedProvider === "Microsoft" && (
                                <div className="   shadow-md rounded-lg p-6  w-full bg-muted ">
                                    <h1 className="text-2xl font-bold mb-4 text-foreground">Connect Your Microsoft Account</h1>
                                    <p className="mb-6">
                                        First, let’s
                                        <Link href={""} className="text-blue-600 px-1">
                                            Enable SMTP
                                        </Link>
                                        access for your Microsoft account.
                                    </p>
                                    <div className="flex flex-col md:flex-row gap-8 ">
                                        <div className="bg-card shadow rounded-lg p-4 w-full">
                                            <h2 className="text-xl font-semibold mb-2">Microsoft accounts purchased directly from Microsoft</h2>
                                            <ol className="list-decimal list-inside space-y-2">
                                                <li>On your computer, log in to your
                                                    <Link href={""} className="text-blue-600 px-1">
                                                        Microsoft Admin center
                                                    </Link>
                                                    .</li>
                                                <li>Open
                                                    <Link href={""} className="text-blue-600 px-1">
                                                        Active Users
                                                    </Link>
                                                    .</li>
                                                <li>
                                                    In the side window, click on Mail tab, and then on
                                                    <Link href={""} className="text-blue-600 px-1">
                                                        Manage email apps
                                                    </Link>
                                                    .
                                                </li>
                                                <li>
                                                    Check the Authenticated SMTP box .
                                                </li>
                                                <li>
                                                    Click Save Changes.
                                                </li>
                                                <li>
                                                    Wait for one hour and connect your account to Instantly.
                                                </li>
                                            </ol>
                                        </div>
                                        <div className="bg-card shadow rounded-lg p-4 w-full">
                                            <h2 className="text-xl font-semibold mb-2">Microsoft accounts purchased from GoDaddy</h2>
                                            <ol className="list-decimal list-inside space-y-2">
                                                <li>On your computer, log in to your
                                                    <Link href={""} className="text-blue-600 px-1">
                                                        GoDaddy account
                                                    </Link>.
                                                </li>
                                                <li>
                                                    Go to My Products page.
                                                </li>
                                                <li>
                                                    Scroll down and go to Email and Office section.
                                                </li>
                                                <li>
                                                    Find the user you want to enable SMTP for and click Manage.
                                                </li>
                                                <li>
                                                    Scroll down, click on Advanced Settings.
                                                </li>
                                                <li>
                                                    Click on SMTP Authentication - the button will turn from gray to green.
                                                </li>
                                                <li>
                                                    Wait for one hour and proceed to connect the account to Instantly.
                                                </li>

                                            </ol>
                                        </div>
                                    </div>
                                    <div className="flex justify-center pt-10 ">
                                        <Button
                                            type="button"
                                            className="bg-primary font-bold text-primary-foreground py-2 px-4 rounded hover:-translate-y-1 
                                            hover:scale-110 duration-300"
                                            onClick={handleSmtpEnabledClick}>
                                            Yes, SMTP has been enabled
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {currentStep === 2 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}>
                        <>
                            {imap === "True" && (
                                <div className="flex justify-center ">
                                    <div className="shadow-md rounded-lg p-6  w-1/2 bg-muted">
                                        <h1 className="text-2xl font-bold mb-4">Connect Your Google Account</h1>
                                        <p className="mb-6">Allow Instantly to access your Google workspace. You only need to do this once per domain.</p>
                                        <ol className="list-decimal list-inside mb-6 space-y-4">
                                            <li>
                                                Go to your
                                                <Link href="https://admin.google.com/" className="text-blue-600 px-1" target="_blank">
                                                    Google Workspace Admin Panel
                                                </Link>
                                                .
                                            </li>
                                            <li>
                                                Click <span className="font-semibold">Add App</span> and then select{' '}
                                                <span className="font-semibold">OAuth App Name or Client ID</span>.
                                            </li>
                                            <li>
                                                Use the following Client-ID to search for Instantly:
                                                <div className="bg-foreground overflow-y-auto overflow-x-hidden">
                                                    <code className="text-background p-2 rounded-md mt-2 whitespace-normal">
                                                        536726988839-pt93ora4685dtb1emb0pp2vjgjoI5mls.apps.googleusercontent.com
                                                    </code>
                                                </div>
                                            </li>
                                            <li>
                                                Select and approve Instantly to access your Google Workspace.
                                            </li>
                                        </ol>
                                        <div className="flex justify-center">
                                            <button
                                                type="button"
                                                className="bg-primary font-bold text-primary-foreground py-2 px-4 rounded hover:-translate-y-1 
                                                hover:scale-110 duration-300"
                                                onClick={handleLoginClick}>
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </>
                    </motion.div>
                )}
            </form>
        </>
    );
}
