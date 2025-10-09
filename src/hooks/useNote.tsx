import { NoteContext } from "@/contexts/NoteContext";
import { Note, NoteProperties } from "@/types";
import { useCallback, useContext } from "react"

type ExactMatchArgs = [beat: number, id: number];
type RangeMatchArgs = [beatMin: number, beatMax: number, id: number];
type ContainsArgs = ExactMatchArgs | RangeMatchArgs;

interface ContainsFunction {
    (...args: ExactMatchArgs): boolean;
    (...args: RangeMatchArgs): boolean;
}

export const useNote = () => {
    const context = useContext(NoteContext);
    if (!context) {
      throw new Error('useNote must be used within NoteProvider');
    }

    const selectedNote = context.state.selectedNote;

    const contains = useCallback<ContainsFunction>((...args: ContainsArgs): boolean => {
        if (args.length === 2) {
            const [beat, id] = args as ExactMatchArgs;
            return context.state.notes.some(spawner => 
                spawner.position.beat === beat && spawner.position.id === id
            );
        } else {
            const [beatMin, beatMax, id] = args as RangeMatchArgs;
            return context.state.notes.some(spawner => 
                spawner.position.beat >= beatMin && 
                spawner.position.beat <= beatMax && 
                spawner.position.id === id
            );
        }
    }, [context.state.notes]) as ContainsFunction;

    const add = useCallback((beat: number, id: number) => {
        context.dispatch({type: "ADD_NOTE", payload: {beat, id}});
    }, []);

    const select = useCallback((beat: number, id: number) => {
        context.dispatch({type: "SELECT_NOTE", payload: {beat, id}});
    }, []);

    const update = useCallback((beat: number, id: number, properties: Partial<NoteProperties>) => {
        context.dispatch({type: "UPDATE_NOTE_PROPERTIES", payload: {position: {beat, id}, properties}});
    }, []);

    const remove = useCallback((beat: number, id: number) => {
        context.dispatch({type: "REMOVE_NOTE", payload: {beat, id}});
    }, []);

    const clear = useCallback(() => {
        context.dispatch({type: "CLEAR_NOTES"})
    }, []);

    const set = useCallback((notes: Note[]) => {
        context.dispatch({type: "SET_NOTES", payload: notes})
    }, []);

    const isSelected = (beat: number, id: number): boolean => {
        return !!selectedNote && selectedNote.position.beat == beat && selectedNote.position.id == id;
    }

    return {
        selectedNote,
        contains,
        add,
        select,
        update,
        remove,
        clear,
        set,
        isSelected
    };
}