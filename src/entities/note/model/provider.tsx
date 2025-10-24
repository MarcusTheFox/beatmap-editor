"use client"

import { NotesAction, NotesState } from "../types";
import { initialState, noteReducer } from "./reducer";
import { createContext, ReactNode, useReducer } from "react";

interface NoteContextType {
    state: NotesState;
    dispatch: React.Dispatch<NotesAction>;
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