import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Custom404: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className=" text-center bg-muted shadow-lg  px-10 py-4">
                <div className='flex justify-center '>

                    <Image src="/assets/404/404.png" alt="Microsoft logo" width={400} height={400}></Image>
                </div>
                {/* <h1 className="text-9xl font-bold text-foreground">404</h1> */}
                {/* <p className="text-2xl mt-4 text-foreground">The page you requested could not be found</p> */}
                <div className="mt-6  flex   space-x-4 justify-center">
                    <Button className=''>
                        <Link href="/.">
                            Home
                        </Link>
                    </Button>
                    <Button>
                        <Link href="/dashboard">
                            Dashboard
                        </Link>
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Custom404;
