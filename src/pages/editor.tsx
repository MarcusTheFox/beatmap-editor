import { EditorLayout } from "@/layouts/EditorLayout";
import { UploadAudioSection } from "@/sections/UploadAudioSection";
import { TrackInfoSection } from "@/sections/TrackInfoSection";
import { SpawnerGridSection } from "@/sections/SpawnerGridSection";
import { NotePropertiesSection } from "@/sections/NotePropertiesSection";
import { TimelineSection } from "@/sections/TimelineSection";
import { NoteProvider } from "@/contexts/NoteContext";
import { AudioProvider } from "@/contexts/AudioContext";

export default function EditorPage() {
    return (
        <EditorLayout>
            <AudioProvider>
                <div className="grid grid-cols-[1fr_2fr_1fr] justify-stretch">
                    <div className="flex flex-col gap-4">
                        <UploadAudioSection />
                        <TrackInfoSection />
                    </div>
                <NoteProvider>
                    <SpawnerGridSection />
                    <NotePropertiesSection />
                </NoteProvider>
                </div>
                <TimelineSection />
            </AudioProvider>
        </EditorLayout>
    );
}
