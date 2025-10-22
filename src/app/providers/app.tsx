import { AudioProvider } from "@/entities/audio";
import { LevelMetadataProvider, LevelPropertiesProvider, TimelineSettingsProvider } from "@/entities/level";
import { NoteProvider } from "@/entities/note";
import { TimelineProvider } from "@/features/timeline";
import { ReactNode } from "react";

export const AppProvider = ({ children } : { children: ReactNode }) => {
    return (
        <AudioProvider>
            <NoteProvider>
                <LevelMetadataProvider>
                    <LevelPropertiesProvider>
                        <TimelineSettingsProvider>
                            <TimelineProvider>
                                {children}
                            </TimelineProvider>
                        </TimelineSettingsProvider>
                    </LevelPropertiesProvider>
                </LevelMetadataProvider>
            </NoteProvider>
        </AudioProvider>
    )
}