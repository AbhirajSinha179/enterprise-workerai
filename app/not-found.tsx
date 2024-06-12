import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Custom404: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="p-8 text-center bg-muted shadow-lg">
                <h1 className="text-9xl font-bold text-foreground">404</h1>
                <p className="text-2xl mt-4 text-foreground">The page you requested could not be found</p>
                <div className="mt-6">
                    <Button>
                        {/* <Link href="/dashboard"> */}
                        <Link href="/.">
                            {/* <a className="text-white">Go to Dashboard</a> */}
                            Return to home
                        </Link>
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Custom404;
