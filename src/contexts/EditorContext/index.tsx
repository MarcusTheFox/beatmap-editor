import { createContext, ReactNode, useContext, useState } from "react";
import { WaveSurferControls } from "@/sections/TimelineSection/WaveSurferComponent/useWaveSurfer";

interface EditorContextType {
    controls: WaveSurferControls | null;
    setControls: (controls: WaveSurferControls | null) => void;

    isPlaying: boolean;
    setIsPlaying: (playing: boolean) => void;
    currentTime: number;
    setCurrentTime: (beat: number) => void;
}

export const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ controls, setControls ] = useState<WaveSurferControls | null>(null);
    const [ isPlaying, setIsPlaying ] = useState<boolean>(false);
    const [ currentTime, setCurrentTime ] = useState<number>(0);

    const value = {
        controls, setControls,
        isPlaying, setIsPlaying,
        currentTime, setCurrentTime
    };

    return (
        <EditorContext.Provider value={value}>
            {children}
        </EditorContext.Provider>
    );
};

export const useEditorContext = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error('useEditorContext must be used within EditorProvider');
    }

    return context;
};