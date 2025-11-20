import { AudioProvider } from "@/src/entities/audio";
import { LevelMetadataProvider, LevelPropertiesProvider, TimelineSettingsProvider } from "@/src/entities/level";
import { NoteProvider } from "@/src/entities/note";
import { TimelineProvider } from "@/src/features/timeline";
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