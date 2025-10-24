import { Spawner } from "@/src/entities/spawner";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { useSpawnerGrid } from "../model/useSpawnerGrid";

const TOTAL_SPAWNERS: number = 49;
const GRID_DIMENSION: number = 7;

const getId = (index: number) => {
    const col = index % GRID_DIMENSION;
    const row = Math.floor(index / GRID_DIMENSION);
    return (GRID_DIMENSION - 1 - row) * GRID_DIMENSION + col;
}

export function SpawnerGridSection() {
    const { getSpawnerState, handleLeftClick, handleRightClick } = useSpawnerGrid();

    const spawners = Array.from({length: TOTAL_SPAWNERS}).map((_, index) => {
        const id = getId(index);
        const { isChecked, isHighlighted, isSelected } = getSpawnerState(id);

        return (
            <Spawner
                key={index}
                id={id}
                isChecked={isChecked}
                isHighlighted={isHighlighted}
                isSelected={isSelected}
                onLeftClick={() => handleLeftClick(id)}
                onRightClick={(e) => handleRightClick(id, e)}
            />
        );
    });

    return (
        <Card className="p-3 text-sm max-w-fit max-h-fit mx-auto rounded-none bg-transparent border-none shadow-none self-center">
            <CardBody className="overflow-visible">
                <div className="grid grid-cols-7 grid-rows-7 gap-1 max-w-fit">
                    {spawners}
                </div>
            </CardBody>
            <CardFooter className="p-0 justify-center">
                <p><b>Left-click</b> to add/remove a note. <b>Right-click</b> to select a note.</p>
            </CardFooter>
        </Card>
    )
}