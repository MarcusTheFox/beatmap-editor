import { useNote } from "@/hooks/useNote";
import { Button } from "@heroui/button";

interface SpawnerProps {
  id: number;
}

export function Spawner({ id }: SpawnerProps) {
    const { contains, add, select, remove } = useNote();
    const isChecked = contains(0, id);

    const handleLeftClick = () => {
        if (isChecked) {
            remove(0, id);
        } else {
            add(0, id);
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
                size="lg"
                radius="sm"
                color={isChecked ? "warning" : "default"}>
            {id}
        </Button>
    );
}
