import { TrackInfoSection } from "@/sections/TrackInfoSection";
import { SpawnerGridSection } from "@/sections/SpawnerGridSection";
import { NotePropertiesSection } from "@/sections/NotePropertiesSection";

export default function EditorPage() {
    return (
        <div className="grow grid grid-cols-[2fr_3fr_2fr] justify-stretch">
            <TrackInfoSection />
            <SpawnerGridSection />
            <NotePropertiesSection />
        </div>
    );
}
