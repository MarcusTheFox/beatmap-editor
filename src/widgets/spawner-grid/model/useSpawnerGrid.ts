import { useTimelineContext } from "@/src/features/timeline/model/context";
import { useTimelineSettings } from "@/src/entities/level/model/timeline-settings";
import { useNote } from "@/src/entities/note/model/useNote";
import { convertTimeToBeats } from "@/src/shared/lib";

export const useSpawnerGrid = () => {
    const { currentTime, isPlaying } = useTimelineContext();
    const { timelineSettings: { bpm, offset } } = useTimelineSettings();
    const { contains, add, remove, select, isSelected: IsNoteSelected } = useNote();

    const currentBeat = convertTimeToBeats(currentTime, bpm, offset);

    const getSpawnerState = (id: number) => {
        const isChecked = contains(currentBeat, id);
        const isHighlighted = isPlaying && contains(currentBeat - 1, currentBeat, id);
        const isSelected = IsNoteSelected(currentBeat, id);

        return { isChecked, isHighlighted, isSelected };
    };

    const handleLeftClick = (id: number, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
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