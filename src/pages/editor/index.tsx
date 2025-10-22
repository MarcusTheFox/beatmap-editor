import { TrackInfoSection } from "@/widgets/track-info";
import { NotePropertiesSection } from "@/widgets/note-properties";
import { SpawnerGridSection } from "@/widgets/spawner-grid";

export default function EditorPage() {
    return (
        <div className="grow grid grid-cols-[2fr_3fr_2fr] justify-stretch">
            <TrackInfoSection />
            <SpawnerGridSection />
            <NotePropertiesSection />
        </div>
    );
}
