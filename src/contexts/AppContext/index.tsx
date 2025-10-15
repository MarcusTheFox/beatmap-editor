import { ReactNode } from "react";
import { AudioProvider } from "../AudioContext";
import { NoteProvider } from "../NoteContext";
import { TimelineSettingsProvider } from "../TimelineSettingsContext";
import { LevelMetadataProvider } from "../LevelMetadataContext";
import { LevelPropertiesProvider } from "../LevelProperties";

export const AppProvider = ({ children } : { children: ReactNode }) => {
    return (
        <AudioProvider>
            <NoteProvider>
                <LevelMetadataProvider>
                    <LevelPropertiesProvider>
                        <TimelineSettingsProvider>
                                    {children}
                        </TimelineSettingsProvider>
                    </LevelPropertiesProvider>
                </LevelMetadataProvider>
            </NoteProvider>
        </AudioProvider>
    )
}