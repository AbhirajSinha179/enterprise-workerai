"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

interface TargetIdContextType {
    targetId: string | null;
    setTargetId: (id: string) => void;
}

const TargetIdContext = createContext<TargetIdContextType | undefined>(undefined);

export const TargetIdProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [targetId, setTargetIdState] = useState<string | null>(null);

    const setTargetId = (id: string) => {
        setTargetIdState(id);
        console.log(`Target ID updated: ${id}`);
    };

    return (
        <TargetIdContext.Provider value={{ targetId, setTargetId }}>
            {children}
        </TargetIdContext.Provider>
    );
};

export const useTargetId = (): TargetIdContextType => {
    const context = useContext(TargetIdContext);
    if (!context) {
        throw new Error("useTargetId must be used within a TargetIdProvider");
    }
    return context;
};
