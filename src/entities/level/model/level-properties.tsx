"use client";

import { NoteProperties } from "@/src/entities/note";
import { createContext, ReactNode, useContext, useState } from "react";

interface LevelPropertiesContextType {
    levelProperties: NoteProperties;
    setLevelProperties: ( properties: NoteProperties ) => void;
}

export const LevelPropertiesContext = createContext<LevelPropertiesContextType | undefined>( undefined );

export const LevelPropertiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ levelProperties, setLevelProperties ] = useState<NoteProperties>({ power: 1500 });

    const value = { levelProperties, setLevelProperties };

    return (
        <LevelPropertiesContext.Provider value={ value }>
            { children }
        </LevelPropertiesContext.Provider>
    );
};

export const useLevelProperties = () => {
    const context = useContext( LevelPropertiesContext );
    if ( !context ) {
        throw new Error( "useLevelProperties must be used within LevelPropertiesProvider" );
    }

    return context;
};
