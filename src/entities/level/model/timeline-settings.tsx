"use client"

import { TimelineSettings } from "../types";
import { createContext, ReactNode, useContext, useState } from "react";

interface TimelineSettingsContextType {
    timelineSettings: TimelineSettings;
    setTimelineSettings: (settings: TimelineSettings) => void;
}

export const TimelineSettingsContext = createContext<TimelineSettingsContextType | undefined>(undefined);

export const TimelineSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ timelineSettings, setTimelineSettings ] = useState<TimelineSettings>({ bpm: 120, offset: 0 });

    const value = { timelineSettings, setTimelineSettings };

    return (
        <TimelineSettingsContext.Provider value={value}>
            {children}
        </TimelineSettingsContext.Provider>
    );
};

export const useTimelineSettings = () => {
    const context = useContext(TimelineSettingsContext);
    if (!context) {
        throw new Error('useTimelineSettings must be used within TimelineSettingsProvider');
    }

    return context;
};