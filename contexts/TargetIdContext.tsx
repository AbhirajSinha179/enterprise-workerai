"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Target {
    id: string;
    name?: string; // Optional name for the target
}

interface TargetContextType {
    targetId: string | null; // Currently selected target ID
    targetList: Target[]; // List of all stored targets
    setTargetId: (id: string) => void; // Set the selected target ID
    addTarget: (id: string, name?: string) => void; // Add a new target to the list
    removeTarget: (id: string) => void; // Remove a target from the list
    resetTargets: () => void; // Reset all targets
    setTarget: (targetList: Target[]) => void; // Set the entire target list
}

const TargetContext = createContext<TargetContextType | undefined>(undefined);

export const TargetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [targetId, setTargetIdState] = useState<string | null>(null);
    const [targetList, setTargetList] = useState<Target[]>([]); // List of all targets

    const setTargetId = (id: string) => {
        setTargetIdState(id);
        console.log(`Target ID updated: ${id}`);
    };

    const resetTargets = () => {
        setTargetList([]);
        setTargetIdState(null);
    };

    const addTarget = (id: string, name?: string) => {
        if (!targetList.some((target) => target.id === id)) {
            const targetName = name || `Target ${id}`;
            setTargetList((prevList) => [...prevList, { id, name: targetName }]);
            console.log(`Target added: ID - ${id}, Name - ${targetName}`);
        } else {
            console.log(`Duplicate target detected: ID - ${id}`);
        }
    };

    const setTarget = (newTargetList: Target[]) => {
        console.log(newTargetList);
        setTargetList(newTargetList);
    };

    const removeTarget = (id: string) => {
        setTargetList((prevList) => prevList.filter((target) => target.id !== id));
        if (targetId === id) {
            setTargetIdState(null);
        }
        console.log(`Target removed: ID - ${id}`);
    };

    return (
        <TargetContext.Provider
            value={{
                targetId,
                targetList,
                setTargetId,
                addTarget,
                removeTarget,
                resetTargets,
                setTarget,
            }}
        >
            {children}
        </TargetContext.Provider>
    );
};

export const useTargetContext = (): TargetContextType => {
    const context = useContext(TargetContext);
    if (!context) {
        throw new Error("useTargetContext must be used within a TargetProvider");
    }
    return context;
};
