"use client";

import { createContext, ReactNode, useState } from "react";

export interface AudioContextType {
    audioFile: File | null;
    audioUrl: string;
    setAudioFile: ( audioFile: File | null ) => void;
    setAudioUrl: ( audioUrl: string ) => void;
}

export const AudioContext = createContext<AudioContextType | undefined>( undefined );

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ audioFile, setAudioFile ] = useState<File | null>( null );
    const [ audioUrl, setAudioUrl ] = useState<string>( "" );

    return (
        <AudioContext.Provider value={{ audioFile, audioUrl, setAudioFile, setAudioUrl }}>
            { children }
        </AudioContext.Provider>
    );
};
