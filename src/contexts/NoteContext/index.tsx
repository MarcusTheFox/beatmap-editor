import { initialState, noteReducer } from "@/reducers/NoteReducer";
import { NoteAction, NotesState } from "@/types";
import { createContext, ReactNode, useReducer } from "react";

interface NoteContextType {
    state: NotesState;
    dispatch: React.Dispatch<NoteAction>;
}

export const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(noteReducer, initialState);

    return (
        <NoteContext.Provider value={{ state, dispatch }}>
            {children}
        </NoteContext.Provider>
    );
};