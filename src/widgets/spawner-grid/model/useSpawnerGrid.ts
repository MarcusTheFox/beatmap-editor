import { useTimelineContext } from "@/features/timeline/model/context";
import { useTimelineSettings } from "@/entities/level/model/timeline-settings";
import { useNote } from "@/entities/note/model/useNote";
import { convertTimeToBeats } from "@/shared/lib";

export const useSpawnerGrid = () => {
    const { currentTime, isPlaying } = useTimelineContext();
    const { timelineSettings: { bpm, offset } } = useTimelineSettings();
    const { contains, add, remove, select, isSelected: IsNoteSelected } = useNote();

    const currentBeat = convertTimeToBeats(currentTime, bpm, offset);

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