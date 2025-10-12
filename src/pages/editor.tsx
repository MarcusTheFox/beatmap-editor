import { EditorLayout } from "@/layouts/EditorLayout";
import { UploadAudioSection } from "@/sections/UploadAudioSection";
import { TrackInfoSection } from "@/sections/TrackInfoSection";
import { SpawnerGridSection } from "@/sections/SpawnerGridSection";
import { NotePropertiesSection } from "@/sections/NotePropertiesSection";
import { TimelineSection } from "@/sections/TimelineSection";
import { ExportSection } from "@/sections/ExportSection";
import { useEditorModel } from "@/contexts/EditorContext/useEditorModel";

export default function EditorPage() {
    const model = useEditorModel();

    return (
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
            <TimelineSection model={model}/>
        </EditorLayout>
    );
}
