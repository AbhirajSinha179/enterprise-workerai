import React, { ReactNode } from 'react';

interface EmptyStateProps {
    headerMessage: string;
    containerMessage?: string;
    icon: ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ headerMessage, containerMessage, icon }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center mt-5">
            <div className="mb-4">
                {icon}
            </div>
            <h2 className="text-foreground font-bold text-2xl">{headerMessage}</h2>
            {/* <p style={{ fontSize: '16px' }}></p> */}
            <p className='text-lg'>{containerMessage}</p>
        </div>
    );
};

export default EmptyState;
