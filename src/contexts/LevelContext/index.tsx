import { createContext, ReactNode, useState } from "react";

interface LevelContextType {
    bpm: number;
    setBpm: (bpm: number) => void;
    power: number;
    setPower: (power: number) => void;
    offset: number;
    setOffset: (offset: number) => void;
}

export const LevelContext = createContext<LevelContextType | undefined>(undefined);

export const LevelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ bpm, setBpm ] = useState<number>(120);
    const [ power, setPower ] = useState<number>(1500);
    const [ offset, setOffset ] = useState<number>(0);

    const value = {
        bpm, setBpm,
        power, setPower,
        offset, setOffset
    };

    return (
        <LevelContext.Provider value={value}>
            {children}
        </LevelContext.Provider>
    );
};