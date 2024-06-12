
import { BanIcon } from 'lucide-react';
import React from 'react';

interface EmptyStateProps {
    message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center mt-10 ">
            <BanIcon width={70} height={70} ></BanIcon>
            <h1 className=" text-foreground mt-5 font-semibold">{message}</h1>
        </div>
    );
};

export default EmptyState;
