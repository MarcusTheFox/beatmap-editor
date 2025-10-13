import { useLevel } from "@/hooks/useLevel"
import { useNote } from "@/hooks/useNote";

export const useSpawnerGrid = () => {
    const { currentBeat, isPlaying } = useLevel();
    const { contains, add, remove, select, isSelected: IsNoteSelected } = useNote();

    const getSpawnerState = (id: number) => {
        const isChecked = contains(currentBeat, id);
        const isHighlighted = isPlaying && contains(Math.floor(currentBeat), currentBeat, id);
        const isSelected = IsNoteSelected(currentBeat, id);

        return { isChecked, isHighlighted, isSelected };
    };

    const handleLeftClick = (id: number) => {
        if (contains(currentBeat, id)) {
            remove(currentBeat, id);
        } else {
            add(currentBeat, id);
        }
    }

    const handleRightClick = (id: number, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        select(currentBeat, id);
    }

    return {
        getSpawnerState,
        handleLeftClick,
        handleRightClick
    }
}