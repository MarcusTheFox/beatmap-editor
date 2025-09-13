import { initialState, spawnerReducer } from "@/reducers/SpawnerGridReducer";
import { NoteAction, NotesState } from "@/types";
import { createContext, ReactNode, useReducer } from "react";

interface SpawnerContextType {
    state: NotesState;
    dispatch: React.Dispatch<NoteAction>;
}

export const SpawnerContext = createContext<SpawnerContextType | undefined>(undefined);

export const SpawnerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(spawnerReducer, initialState);

    return (
        <SpawnerContext.Provider value={{ state, dispatch }}>
            {children}
        </SpawnerContext.Provider>
    );
};