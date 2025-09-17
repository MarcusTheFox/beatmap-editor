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