import { NotesState, NoteAction, Note } from "@/types";

export function spawnerReducer(state: NotesState, action: NoteAction): NotesState {
    switch (action.type) {
        case "ADD_NOTE":
            const exists = state.notes.some(spawner => 
                spawner.pos.beat === action.payload.beat &&
                spawner.pos.id === action.payload.id);
            if (exists) return state;
            
            const newSpawner: Note = {
                pos: action.payload,
                properties: {
                    power: 1500
                }
            };

            return {
                ...state,
                notes: [...state.notes, newSpawner],
                selectedNote: newSpawner.pos
            }

        case "REMOVE_NOTE":
            return {
                ...state,
                notes: state.notes.filter(spawner => 
                    spawner.pos.beat !== action.payload.beat ||
                    spawner.pos.id !== action.payload.id),
                selectedNote: 
                    state.selectedNote === action.payload ? null : state.selectedNote
            };

        case "SELECT_NOTE":
            return {
                ...state,
                selectedNote: action.payload
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