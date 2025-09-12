import { EditorLayout } from "@/layouts/EditorLayout";
import { UploadAudioSection } from "@/sections/UploadAudioSection";
import { TrackInfoSection } from "@/sections/TrackInfoSection";
import { SpawnerGridSection } from "@/sections/SpawnerGridSection";
import { NotePropertiesSection } from "@/sections/NotePropertiesSection";
import { TimelineSection } from "@/sections/TimelineSection";
import { SpawnerProvider } from "@/contexts/SpawnerContext";

export default function EditorPage() {
    return (
        <EditorLayout>
            <div className="grid grid-cols-[1fr_2fr_1fr] justify-stretch">
                <div className="flex flex-col gap-4">
                    <UploadAudioSection />
                    <TrackInfoSection />
                </div>
            <SpawnerProvider>
                <SpawnerGridSection />
                <NotePropertiesSection />
            </SpawnerProvider>
            </div>
            <TimelineSection />
        </EditorLayout>
    );
}
