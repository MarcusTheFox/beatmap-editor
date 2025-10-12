import { createContext, ReactNode } from "react";
import { EditorModel, useEditorModel } from "./useEditorModel";

export const EditorContext = createContext<EditorModel | undefined>(undefined);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const model = useEditorModel();

    return (
        <EditorContext.Provider value={model}>
            {children}
        </EditorContext.Provider>
    );
};