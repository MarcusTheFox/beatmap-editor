import { useLevel } from "@/hooks/useLevel";
import { useNote } from "@/hooks/useNote";
import { Button } from "@heroui/button";

interface SpawnerProps {
  id: number;
}

export function Spawner({ id }: SpawnerProps) {
    const { power } = useLevel();
    const { contains, add, select, remove } = useNote();
    const isChecked = contains(0, id);

    const handleLeftClick = () => {
        if (isChecked) {
            remove(0, id);
        } else {
            add(0, id, { power });
        }
    }

    const handleRightClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        select(0, id);
    }

    return (
        <Button isIconOnly 
                onPress={handleLeftClick} 
                onContextMenu={handleRightClick}
                radius="sm"
                className="w-20 h-20"
                color={isChecked ? "warning" : "default"}>
            {id}
        </Button>
    );
}
