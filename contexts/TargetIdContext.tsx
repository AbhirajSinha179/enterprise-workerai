"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { getTargetsIdByUser } from "@/lib/utils"; // Replace with your actual path
import { useAuth } from "@clerk/nextjs";

// Interface for a target object
interface Target {
    id: string;
    name?: string; // Optional name for the target
}

// Interface for the context type
interface TargetContextType {
    targetId: string | null; // Currently selected target ID
    targetList: Target[]; // List of all stored targets
    setTargetId: (id: string) => void; // Set the selected target ID
    addTarget: (id: string, name?: string) => void; // Add a new target to the list
    removeTarget: (id: string) => void; // Remove a target from the list
    resetTargets: () => void; // Reset all targets
    setTarget: (targetList: Target[]) => void; // Set the entire target list
    fetchTargets: () => Promise<void>; // Function to fetch targets
}

const TargetContext = createContext<TargetContextType | undefined>(undefined);

export const TargetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { userId } = useAuth();
    const [targetId, setTargetIdState] = useState<string | null>(null);
    const [targetList, setTargetList] = useState<Target[]>([]);

    console.log("TargetProvider initialized with userId:", userId);

    const setTargetId = (id: string) => {
        setTargetIdState(id);
        console.log(`Target ID updated: ${id}`);
    };

    const resetTargets = () => {
        console.log("Resetting all targets...");
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
        console.log("Setting target list:", newTargetList);
        setTargetList(newTargetList);
    };

    const removeTarget = (id: string) => {
        console.log(`Removing target with ID: ${id}`);
        setTargetList((prevList) => prevList.filter((target) => target.id !== id));
        if (targetId === id) {
            setTargetIdState(null);
            console.log(`Target ID ${id} was selected. Resetting targetId.`);
        }
    };

    const fetchTargets = useCallback(async () => {
        if (!userId) {
            console.error("No userId available. Cannot fetch targets.");
            return;
        }

        console.log("Fetching targets for userId:", userId);
        try {
            const response = await getTargetsIdByUser(userId); // Replace with your API or function call
            console.log("Fetched targets:", response);

            if (response && response.length > 0) {
                const formattedTargets = response.map((target: any) => ({
                    id: target.id,
                    name: target.targetName || `Unknown`, // Ensure every target has a name
                }));
                console.log("Formatted targets:", formattedTargets);
                setTarget(formattedTargets);
                setTargetId(formattedTargets[0]?.id || null); // Set the first target as selected
            } else {
                console.warn("No valid targets found.");
                resetTargets();
            }
        } catch (error) {
            console.error("Error fetching targets:", error);
        }
    }, [userId]);

    useEffect(() => {
        console.log("useEffect triggered for userId:", userId);
        if (userId) {
            fetchTargets();
        }
    }, [userId, fetchTargets]);

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
                fetchTargets,
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
