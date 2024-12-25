"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Target {
    id: string;
}

interface TargetContextType {
    targetId: string | null; // Currently selected target ID
    targetList: Target[]; // List of all stored targets
    setTargetId: (id: string) => void; // Set the selected target ID
    addTarget: (id: string) => void; // Add a new target to the list
    removeTarget: (id: string) => void; // Remove a target from the list
    resetTargets: () => void;
    setTarget: (targetId: any) => void
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

    const addTarget = (id: string) => {
        if (!targetList.some((target) => target.id === id)) {
            setTargetList((prevList) => [...prevList, { id }]);
            console.log(`Target added: ID - ${id}`);
        } else {
            console.log(`Duplicate target detected: ID - ${id}`);
            // console.log("TARGET ID NO :", targetList.length)
        }
    };

    const setTarget = (targetList: any) => {
        console.log(targetList);
        setTargetList(targetList);
    }



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
                setTarget
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
