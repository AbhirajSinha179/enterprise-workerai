"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Target {
    id: string;
    name: string;
}

interface TargetContextType {
    targetId: string | null; // Currently selected target ID
    targetName: string | null; // Currently selected target name
    targetList: Target[]; // List of all stored targets
    setTargetId: (id: string, name?: string) => void; // Set the selected target ID and name
    addTarget: (id: string, name: string) => void; // Add a new target to the list
    removeTarget: (id: string) => void; // Remove a target from the list
}

const TargetContext = createContext<TargetContextType | undefined>(undefined);

export const TargetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [targetId, setTargetIdState] = useState<string | null>(null);
    const [targetName, setTargetNameState] = useState<string | null>(null);
    const [targetList, setTargetList] = useState<Target[]>([]); // List of all targets

    const setTargetId = (id: string, name?: string) => {
        setTargetIdState(id);
        if (name) {
            setTargetNameState(name);
        } else {
            const target = targetList.find((target) => target.id === id);
            setTargetNameState(target ? target.name : null);
        }
        console.log(`Target ID updated: ${id}, Name: ${name || "Unnamed"}`);
    };

    const addTarget = (id: string, name: string) => {
        if (!targetList.some((target) => target.id === id)) {
            setTargetList((prevList) => [...prevList, { id, name }]);
        }
        console.log(`Target added: ID - ${id}, Name - ${name}`);
    };

    const removeTarget = (id: string) => {
        setTargetList((prevList) => prevList.filter((target) => target.id !== id));
        if (targetId === id) {
            setTargetIdState(null);
            setTargetNameState(null);
        }
        console.log(`Target removed: ID - ${id}`);
    };

    return (
        <TargetContext.Provider
            value={{
                targetId,
                targetName,
                targetList,
                setTargetId,
                addTarget,
                removeTarget,
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
