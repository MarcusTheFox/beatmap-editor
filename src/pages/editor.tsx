import { EditorLayout } from "@/layouts/EditorLayout";
import { UploadAudioSection } from "@/sections/UploadAudioSection";
import { TrackInfoSection } from "@/sections/TrackInfoSection";
import { SpawnerGridSection } from "@/sections/SpawnerGridSection";
import { NotePropertiesSection } from "@/sections/NotePropertiesSection";
import { TimelineSection } from "@/sections/TimelineSection";
import { ExportSection } from "@/sections/ExportSection";
import { EditorProvider } from "@/contexts/EditorContext";
import { useEffect } from "react";
import { EditorNotFound } from "./editorNotFound";
import { useAudio } from "@/hooks/useAudio";

export default function EditorPage() {
    const { audioUrl } = useAudio();
    
    if (!audioUrl) {
        return <EditorNotFound />;
    }

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, []);

    return (
        <EditorProvider>
            <EditorLayout>
                <div className="grid grid-cols-[1fr_2fr_1fr] justify-stretch">
                    <div className="flex flex-col gap-4">
                        <UploadAudioSection />
                        <TrackInfoSection />
                    </div>
                    <SpawnerGridSection />
                    <div className="flex flex-col gap-4">
                        <ExportSection />
                        <NotePropertiesSection />
                    </div>
                </div>
                <TimelineSection />
            </EditorLayout>
        </EditorProvider>
    );
}
