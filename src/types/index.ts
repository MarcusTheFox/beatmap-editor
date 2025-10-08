import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export interface NotePosition {
    beat: number;
    id: number;
}

export interface Note {
    pos: NotePosition;
    properties: NoteProperties;
}

export interface NoteProperties {
    power: number;
}

export interface NotesState {
    notes: Note[];
    selectedNote: Note | null;
}

export type NoteAction = 
    | { type: 'ADD_NOTE'; payload: { pos: NotePosition, properties: NoteProperties } }
    | { type: 'REMOVE_NOTE'; payload: NotePosition }
    | { type: 'SELECT_NOTE'; payload: NotePosition | null }
    | { type: 'UPDATE_NOTE_PROPERTIES'; payload: { pos: NotePosition; properties: Partial<NoteProperties> } }
    | { type: 'REMOVE_NOTE'; payload: NotePosition }
    | { type: 'CLEAR_NOTES' }
    | { type: 'SET_NOTES'; payload: Note[] }

export interface InfoJson {
    trackID: string;
    displayName: string;
    artistName: string;
    bpm: number;
    audioFile: string;
    beatmapFile: string;
    totalTargets: number;
}

export interface BeatmapSettings {
    bpm: number;
    power: number;
    offset: number;
}

export type BeatmapNote = NotePosition & Partial<NoteProperties>;

export interface BeatmapJson {
    settings: BeatmapSettings;
    notes: BeatmapNote[];
}

export interface LevelData {
    info: InfoJson;
    audioFile: File;
    beatmap: BeatmapJson;
}