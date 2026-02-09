import { Button } from "@heroui/button";

interface SpawnerProps {
    id: number;
    isChecked: boolean;
    isHighlighted: boolean;
    isSelected: boolean;
    onLeftClick: ( event: React.MouseEvent<HTMLButtonElement> ) => void;
    onRightClick: ( event: React.MouseEvent<HTMLButtonElement> ) => void;
}

export function Spawner( props: SpawnerProps ) {
    const { id, isChecked, isHighlighted, isSelected, onLeftClick, onRightClick } = props;

    return (
        <Button isIconOnly
            preventFocusOnPress
            className="w-18 h-18"
            color={ isChecked || isHighlighted ? "warning" : "default" }
            radius="sm"
            variant={ isSelected || isHighlighted ? "solid" : "ghost" }
            onClickCapture={ onLeftClick }
            onContextMenu={ onRightClick }
        >
            { id }
        </Button>
    );
}
