import { useLevel } from "@/hooks/useLevel";
import { useNote } from "@/hooks/useNote";
import { Button } from "@heroui/button";

interface SpawnerProps {
  id: number;
}

export function Spawner({ id }: SpawnerProps) {
    const { power, currentBeat, isPlaying } = useLevel();
    const { isSelected, contains, add, select, remove } = useNote();
    const isChecked = contains(currentBeat, id);
    const isHighlighted = isPlaying && contains(Math.floor(currentBeat), id);

    const handleLeftClick = () => {
        if (isChecked) {
            remove(currentBeat, id);
        } else {
            add(currentBeat, id, { power });
        }
    }

    const handleRightClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        select(currentBeat, id);
    }

    return (
        <Button isIconOnly 
                onPress={handleLeftClick} 
                onContextMenu={handleRightClick}
                radius="sm"
                className="w-18 h-18"
                variant={isSelected(currentBeat, id) || isHighlighted ? "solid" : "ghost"}
                color={isChecked || isHighlighted ? "warning" : "default"}>
            {id}
        </Button>
    );
}
