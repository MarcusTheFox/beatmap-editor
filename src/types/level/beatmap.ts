import { BeatmapSettings, Note } from "..";

export interface Beatmap {
    settings: BeatmapSettings,
    notes: Note[]
}