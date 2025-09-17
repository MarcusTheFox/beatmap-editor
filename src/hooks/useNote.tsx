import { NoteContext } from "@/contexts/NoteContext";
import { NoteProperties } from "@/types";
import { useCallback, useContext } from "react"

export const useNote = () => {
    const context = useContext(NoteContext);
    if (!context) {
      throw new Error('useNote must be used within NoteProvider');
    }

    const selectedNote = context.state.selectedNote;
    const contains = useCallback((beat: number, id: number) => {
        return context.state.notes.some(spawner => spawner.pos.beat === beat && spawner.pos.id === id);
    }, [context.state.notes]);

    const add = useCallback((beat: number, id: number, properties: NoteProperties) => {
        context.dispatch({type: "ADD_NOTE", payload: {pos: {beat, id}, properties}});
    }, []);

    const select = useCallback((beat: number, id: number) => {
        context.dispatch({type: "SELECT_NOTE", payload: {beat, id}});
    }, []);

    const update = useCallback((beat: number, id: number, properties: Partial<NoteProperties>) => {
        context.dispatch({type: "UPDATE_NOTE_PROPERTIES", payload: {pos: {beat, id}, properties}});
    }, []);

    const remove = useCallback((beat: number, id: number) => {
        context.dispatch({type: "REMOVE_NOTE", payload: {beat, id}});
    }, []);

    return {
        selectedNote,
        contains,
        add,
        select,
        update,
        remove
    };
}