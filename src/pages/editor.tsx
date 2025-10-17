import { EditorLayout } from "@/layouts/EditorLayout";
import { TrackInfoSection } from "@/sections/TrackInfoSection";
import { SpawnerGridSection } from "@/sections/SpawnerGridSection";
import { NotePropertiesSection } from "@/sections/NotePropertiesSection";
import { TimelineSection } from "@/sections/TimelineSection";
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
                <div className="flex-1 mx-8 grid grid-cols-[2fr_3fr_2fr] justify-stretch">
                    <TrackInfoSection />
                    <SpawnerGridSection />
                    <NotePropertiesSection />
                </div>
                <TimelineSection />
            </EditorLayout>
        </EditorProvider>
    );
}
