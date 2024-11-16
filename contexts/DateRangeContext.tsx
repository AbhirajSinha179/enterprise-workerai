"use client"
import moment from "moment";
import React, { createContext, useContext, useState } from "react";

interface DateRangeContextProps {
    startDate: string;
    endDate: string;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
}

const DateRangeContext = createContext<DateRangeContextProps | undefined>(undefined);

export const DateRangeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // const [startDate, setStartDate] = useState<string>(new Date().toISOString());
    // const [endDate, setEndDate] = useState<string>(new Date().toISOString());
    const [startDate, setStartDate] = useState<string>(moment().startOf("day").subtract(1, "months").toISOString())
    const [endDate, setEndDate] = useState<string>(moment().endOf("day").toISOString())

    return (
        <DateRangeContext.Provider value={{ startDate, endDate, setStartDate, setEndDate }}>
            {children}
        </DateRangeContext.Provider>
    );
};

export const useDateRange = (): DateRangeContextProps => {
    const context = useContext(DateRangeContext);
    if (!context) {
        throw new Error("useDateRange must be used within a DateRangeProvider");
    }
    return context;
};
