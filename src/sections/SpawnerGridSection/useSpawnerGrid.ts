import { useEditorContext } from "@/contexts/EditorContext";
import { useTimelineSettings } from "@/contexts/TimelineSettingsContext";
import { useNote } from "@/hooks/useNote";
import { convertTimeToBeats } from "@/utils";

export const useSpawnerGrid = () => {
    const { currentTime, isPlaying } = useEditorContext();
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