import { Button, PressEvent } from "@heroui/button";

interface SpawnerProps {
  id: number;
  isSelected: boolean;
  onLeftClick?: (event: PressEvent) => void;
  onRightClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Spawner(props: SpawnerProps) {
    const handleLeftClick = (event: PressEvent) => {
        if (props.onLeftClick) {
            props.onLeftClick(event);
        }
    }

    const handleRightClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (props.onRightClick) {
            props.onRightClick(event);
        }
    }

    return (
        <Button isIconOnly 
                onPress={handleLeftClick} 
                onContextMenu={handleRightClick} 
                size="md"
                radius="sm" 
                className="w-20 h-20" 
                color={props.isSelected ? "warning" : "default"}>
            {props.id}
        </Button>
    );
}
