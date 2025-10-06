import { NotesState, NoteAction, Note } from "@/types";

export function noteReducer(state: NotesState, action: NoteAction): NotesState {
    switch (action.type) {
        case "ADD_NOTE":
            const exists = state.notes.some(spawner => 
                spawner.pos.beat === action.payload.pos.beat &&
                spawner.pos.id === action.payload.pos.id);
            if (exists) return state;
            
            const newSpawner: Note = {
                pos: action.payload.pos,
                properties: action.payload.properties
            };

            return {
                ...state,
                notes: [...state.notes, newSpawner].sort((a, b) => a.pos.beat - b.pos.beat),
                selectedNote: newSpawner
            }

        case "REMOVE_NOTE":
            return {
                ...state,
                notes: state.notes.filter(spawner => 
                    spawner.pos.beat !== action.payload.beat ||
                    spawner.pos.id !== action.payload.id),
                selectedNote: 
                    state.selectedNote?.pos.beat === action.payload.beat &&
                    state.selectedNote?.pos.id === action.payload.id
                    ? null : state.selectedNote
            };

        case "SELECT_NOTE":
            const selectedNote = action.payload 
                ? state.notes.find(note => 
                    note.pos.beat === action.payload?.beat && 
                    note.pos.id === action.payload.id
                ) || null
                : null;

            return {
                ...state,
                selectedNote
            };

        case "UPDATE_NOTE_PROPERTIES":
            return {
                ...state,
                notes: state.notes.map(spawner => 
                    spawner.pos.beat === action.payload.pos.beat &&
                    spawner.pos.id === action.payload.pos.id
                    ? {
                        ...spawner,
                        properties: {
                            ...spawner.properties,
                            ...action.payload.properties
                        }
                    }
                    : spawner
                )
            }
        default:
            return state;
    }
}

export const initialState: NotesState = {
    notes: [],
    selectedNote: null
}