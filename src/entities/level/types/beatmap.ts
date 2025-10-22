import { Note } from "@/entities/note";
import { BeatmapSettings } from "./settings";

export interface Beatmap {
    settings: BeatmapSettings,
    notes: Note[]
}