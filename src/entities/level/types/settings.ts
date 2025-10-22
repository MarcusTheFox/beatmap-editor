import { NoteProperties } from "@/entities/note"

export interface TimelineSettings {
    bpm: number,
    offset: number
}

export interface BeatmapSettings extends TimelineSettings {
    properties: NoteProperties
}