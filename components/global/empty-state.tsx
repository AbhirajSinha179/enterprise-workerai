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
            <h2 className="text-foreground my-4 font-semibold">{headerMessage}</h2>
            {/* <p style={{ fontSize: '16px' }}></p> */}
            <p style={{ fontSize: '16px' }}>{containerMessage}</p>
        </div>
    );
};

export default EmptyState;
