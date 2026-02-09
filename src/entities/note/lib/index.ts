import { Note, NotePosition, NotePositionKey } from "../types";

export const getPositionKey = ( note: NotePosition ): NotePositionKey => {
    return `${ note.beat }-${ note.id }`;
};

export const noteExists = ( notes: Note[], position: NotePosition ): boolean => {
    return notes.some(
        ( note ) => getPositionKey( note ) === getPositionKey( position ),
    );
};

export const findNoteByPosition = ( notes: Note[], position: NotePosition ): Note | undefined => {
    return notes.find(
        ( note ) => getPositionKey( note ) === getPositionKey( position ),
    );
};

export const sortNotesByBeat = ( notes: Note[]): Note[] => {
    return [ ...notes ].sort(( a, b ) => a.beat - b.beat );
};
