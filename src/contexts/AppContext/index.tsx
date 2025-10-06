import { ReactNode } from "react";
import { LevelProvider } from "../LevelContext";
import { AudioProvider } from "../AudioContext";
import { NoteProvider } from "../NoteContext";

export const AppProvider = ({ children } : { children: ReactNode }) => {
    return (
        <LevelProvider>
            <AudioProvider>
                <NoteProvider>
                    {children}
                </NoteProvider>
            </AudioProvider>
        </LevelProvider>
    )
}