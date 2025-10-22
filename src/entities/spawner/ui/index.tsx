import { Button } from "@heroui/button";

interface SpawnerProps {
  id: number;
  isChecked: boolean;
  isHighlighted: boolean;
  isSelected: boolean;
  onLeftClick: () => void;
  onRightClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Spawner(props: SpawnerProps) {
    const { id, isChecked, isHighlighted, isSelected, onLeftClick, onRightClick } = props;

    return (
        <Button isIconOnly 
                onPress={onLeftClick} 
                onContextMenu={onRightClick}
                radius="sm"
                className="w-18 h-18"
                variant={isSelected || isHighlighted ? "solid" : "ghost"}
                color={isChecked || isHighlighted ? "warning" : "default"}>
            {id}
        </Button>
    );
}
