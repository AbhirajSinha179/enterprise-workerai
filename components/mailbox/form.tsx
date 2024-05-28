'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from 'framer-motion';
import Image from "next/image";
import { useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from 'zod';
import { FormDataSchema } from '@/app/(main)/dashboard/(mailbox)/data/formSchema';

type Inputs = z.infer<typeof FormDataSchema>;

const steps = [
    {
        id: 'Step 1',
        name: 'Personal Information',
        fields: ['firstName', 'lastName', 'email']
    },
    {
        id: 'Step 2',
        name: 'Address',
        fields: ['country', 'state', 'city', 'street', 'zip']
    },
    { id: 'Step 3', name: 'Complete' }
];

export default function Form() {
    const [previousStep, setPreviousStep] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedProvider, setSelectedProvider] = useState('');
    const delta = currentStep - previousStep;

    const {
        register,
        handleSubmit,
        reset,
        trigger,
        formState: { errors }
    } = useForm<Inputs>({
        resolver: zodResolver(FormDataSchema)
    });

    const processForm: SubmitHandler<Inputs> = data => {
        console.log(data);
        reset();
    };

    type FieldName = keyof Inputs;

    const next = async (provider: string) => {
        setSelectedProvider(provider);
        const fields = steps[currentStep].fields;
        const output = await trigger(fields as FieldName[], { shouldFocus: true });

        if (!output) return;

        if (currentStep < steps.length - 1) {
            if (currentStep === steps.length - 2) {
                await handleSubmit(processForm)();
            }
            setPreviousStep(currentStep);
            setCurrentStep(step => step + 1);
        }
    };

    const prev = () => {
        if (currentStep > 0) {
            setPreviousStep(currentStep);
            setCurrentStep(step => step - 1);
        }
    };

    return (
        <div className=''>
            {/* steps */}
            <nav aria-label='Progress'>
                <ol className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
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
            <div className='mt-20 pt-5'>
                <div className='flex justify-between'>
                    <button
                        type='button'
                        onClick={prev}
                        disabled={currentStep === 0}
                        className='rounded bg-primary px-2 py-1 text-sm font-semibold text-primary-foreground shadow-sm ring-1 ring-inset  hover:bg-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
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
                    {/* <button
                        type='button'
                        onClick={next}
                        disabled={currentStep === steps.length - 1}
                        className='rounded bg-primary px-2 py-1 text-sm font-semibold text-primary-foreground shadow-sm ring-1 ring-inset  hover:bg-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
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
                                d='M8.25 4.5l7.5 7.5-7.5 7.5'
                            />
                        </svg>
                    </button> */}
                </div>
            </div>

            {/* Form */}
            <form className='mt-12 py-12' onSubmit={handleSubmit(processForm)}>
                {currentStep === 0 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className="flex justify-center">
                            <h1 className='text-4xl font-semibold leading-7 text-primary'>
                                Connect a new email account
                            </h1>
                        </div>
                        <div className="my-10 py-5 flex items-center justify-center">
                            <div className="flex flex-col space-y-4 h-auto py-5 px-50 w-full justify-center items-center">
                                <div className="flex items-center p-4 border rounded-lg shadow-md justify-center w-1/3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" onClick={() => next('Google')}>
                                    <Image
                                        src="/assets/mailbox/googleLogo.png"
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
                                <div className="flex items-center p-4 border rounded-lg shadow-md justify-center w-1/3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" onClick={() => next('Microsoft')}>
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
                                <div className="flex items-center p-4 border rounded-lg shadow-md justify-center w-1/3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" onClick={() => next('Any Provider')}>
                                    <Image
                                        src="/assets/mailbox/imapLogo.png"
                                        alt="IMAP logo"
                                        className="mr-4 bg-"
                                        width={40}
                                        height={40}
                                    />
                                    <div>
                                        <div className="text-lg font-semibold text-primary">Any Provider</div>
                                        <div className="text-primary">IMAP / SMTP</div>
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
                        <h2 className='text-base font-semibold leading-7 text-gray-900'>
                            Address
                        </h2>
                        <p className='mt-1 text-sm leading-6 text-gray-600'>
                            Address where you can receive mail.
                        </p>
                        <p className='mt-4 text-sm leading-6 text-gray-600'>
                            Selected Provider: {selectedProvider}
                        </p>
                    </motion.div>
                )}
                {currentStep === 2 && (
                    <>
                        <h2 className='text-base font-semibold leading-7 text-gray-900'>
                            Complete
                        </h2>
                        <p className='mt-1 text-sm leading-6 text-gray-600'>
                            Thank you for your submission.
                        </p>
                    </>
                )}
            </form>


        </div>
    )
}
