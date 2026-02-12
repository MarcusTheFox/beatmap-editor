"use client";

import { AudioInfo, LevelInfo } from "../types";
import { createContext, ReactNode, useContext, useState } from "react";

type LevelMetadata = LevelInfo & AudioInfo;

interface LevelMetadataContextType {
    metadata: LevelMetadata;
    setMetadata: ( meta: LevelMetadata ) => void;
}

export const LevelMetadataContext = createContext<LevelMetadataContextType | undefined>( undefined );

export const LevelMetadataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ metadata, setMetadata ] = useState<LevelMetadata>({
        title: "",
        artist: "",
        authors: [],
        difficulty: "Normal",
        version: "1.0.0",
    });

    const value = { metadata, setMetadata };

    return (
        <LevelMetadataContext.Provider value={ value }>
            { children }
        </LevelMetadataContext.Provider>
    );
};

export const useLevelMetadata = () => {
    const context = useContext( LevelMetadataContext );
    if ( !context ) {
        throw new Error( "useLevelMetadata must be used within LevelMetadataProvider" );
    }

    return context;
};
