import React, { ReactNode } from 'react';

interface EmptyStateProps {
    message: string;
    icon: ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, icon }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center mt-5">
            <div className="mb-4">
                {icon}
            </div>
            <h2 className="text-foreground my-4 font-semibold">{message}</h2>
            <p style={{ fontSize: '16px' }}>There are currently no leads available. Please check back later or Upload CSV.</p>
        </div>
    );
};

export default EmptyState;
