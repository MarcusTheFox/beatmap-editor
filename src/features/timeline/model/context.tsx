import { WaveSurferControls } from "@/entities/wavesurfer";
import { createContext, ReactNode, useContext, useState } from "react";

interface TimelineContextType {
    controls: WaveSurferControls | null;
    setControls: (controls: WaveSurferControls | null) => void;

    isPlaying: boolean;
    setIsPlaying: (playing: boolean) => void;
    currentTime: number;
    setCurrentTime: (beat: number) => void;
}

export const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

export const TimelineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ controls, setControls ] = useState<WaveSurferControls | null>(null);
    const [ isPlaying, setIsPlaying ] = useState<boolean>(false);
    const [ currentTime, setCurrentTime ] = useState<number>(0);

    const value = {
        controls, setControls,
        isPlaying, setIsPlaying,
        currentTime, setCurrentTime
    };

    return (
        <TimelineContext.Provider value={value}>
            {children}
        </TimelineContext.Provider>
    );
};

export const useTimelineContext = () => {
    const context = useContext(TimelineContext);
    if (!context) {
        throw new Error('useTimelineContext must be used within TimelineProvider');
    }

    return context;
};