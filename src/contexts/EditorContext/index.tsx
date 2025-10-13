import { createContext, ReactNode, useContext, useState } from "react";
import { WaveSurferControls } from "@/sections/TimelineSection/WaveSurferComponent/useWaveSurfer";

interface EditorContextType {
    controls: WaveSurferControls | null;
    setControls: (controls: WaveSurferControls | null) => void;
}

export const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ controls, setControls ] = useState<WaveSurferControls | null>(null);
    const value = { controls, setControls };

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