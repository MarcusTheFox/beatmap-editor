import { NotesState, NotesAction, Note, NotePosition, NotePositionKey } from "@/types";

const getPositionKey = (position: NotePosition): NotePositionKey => `${position.beat}-${position.id}`;

const noteExists = (notes: Note[], position: NotePosition): boolean =>
    notes.some(note => getPositionKey(note.position) === getPositionKey(position));

const findNoteByPosition = (notes: Note[], position: NotePosition): Note | undefined =>
    notes.find(note => getPositionKey(note.position) === getPositionKey(position));

const sortNotesByBeat = (notes: Note[]): Note[] => 
    [...notes].sort((a, b) => a.position.beat - b.position.beat)

export function noteReducer(state: NotesState, action: NotesAction): NotesState {
    switch (action.type) {
        case "ADD_NOTE":
            if (noteExists(state.notes, action.payload)) return state;
            
            const newNote: Note = {
                position: action.payload
            };

            return {
                ...state,
                notes: sortNotesByBeat([...state.notes, newNote]),
                selectedNote: newNote
            }

        case "REMOVE_NOTE":
            return {
                ...state,
                notes: state.notes.filter(note => 
                    getPositionKey(note.position) !== getPositionKey(action.payload)
                ),
                selectedNote: 
                    state.selectedNote &&
                    getPositionKey(state.selectedNote.position) === getPositionKey(action.payload)
                    ? null : state.selectedNote
            };

        case "SELECT_NOTE":
            if (!action.payload) {
                return { ...state, selectedNote: null };
            }

            const selectedNote = findNoteByPosition(state.notes, action.payload)  || null;
            return { ...state, selectedNote };

        case "UPDATE_NOTE_PROPERTIES":
            return {
                ...state,
                notes: state.notes.map(note => 
                    getPositionKey(note.position) === getPositionKey(action.payload.position)
                    ? {
                        ...note,
                        properties: {
                            ...note.properties,
                            ...action.payload.properties
                        }
                    }
                    : note
                )
            };
            
        case "CLEAR_NOTES":
            return {
                notes: [],
                selectedNote: null,
            };

        case "SET_NOTES":
            return {
                notes: action.payload,
                selectedNote: null
            };

        default:
            return state;
    }
}

export const initialState: NotesState = {
    notes: [],
    selectedNote: null
}