import { createContext, ReactNode, useState } from "react";

interface LevelContextType {
    bpm: number;
    setBpm: (bpm: number) => void;
    power: number;
    setPower: (power: number) => void;
    offset: number;
    setOffset: (offset: number) => void;
    currentTime: number;
    setCurrentTime: (time: number) => void;
    currentBeat: number;
    setCurrentBeat: (beat: number) => void;
}

export const LevelContext = createContext<LevelContextType | undefined>(undefined);

export const LevelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ bpm, setBpm ] = useState<number>(120);
    const [ power, setPower ] = useState<number>(1500);
    const [ offset, setOffset ] = useState<number>(0);
    const [ currentTime, setCurrentTime ] = useState<number>(0);
    const [ currentBeat, setCurrentBeat ] = useState<number>(0);

    const value = {
        bpm, setBpm,
        power, setPower,
        offset, setOffset,
        currentTime, setCurrentTime,
        currentBeat, setCurrentBeat,
    };

    return (
        <LevelContext.Provider value={value}>
            {children}
        </LevelContext.Provider>
    );
};