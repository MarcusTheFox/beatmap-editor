export interface Note extends NotePosition {
    properties?: Partial<NoteProperties>
}

export interface NotePosition {
    beat: number,
    id: number
}

export type NotePositionKey = `${ number }-${ number }`;

export interface NoteProperties {
    power: number
}

export interface NotesState {
    notes: Note[];
    selectedNote: Note | null;
}

export type NotesAction =
    | { type: "ADD_NOTE"; payload: NotePosition }
    | { type: "REMOVE_NOTE"; payload: NotePosition }
    | { type: "SELECT_NOTE"; payload: NotePosition | null }
    | { type: "UPDATE_NOTE_PROPERTIES"; payload: Required<Note> }
    | { type: "REMOVE_NOTE"; payload: NotePosition }
    | { type: "CLEAR_NOTES" }
    | { type: "SET_NOTES"; payload: Note[] };
