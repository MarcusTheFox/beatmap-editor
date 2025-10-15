import { NoteProperties } from "..";

export interface TimelineSettings {
    bpm: number,
    offset: number
}

export interface BeatmapSettings extends TimelineSettings {
    properties: NoteProperties
}