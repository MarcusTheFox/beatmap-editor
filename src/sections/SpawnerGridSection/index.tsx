import { Spawner } from "@/components/Spawner";
import { Card, CardBody, CardFooter } from "@heroui/card";

const TOTAL_SPAWNERS: number = 49;
const GRID_DIMENSION: number = 7;

export function SpawnerGridSection() {
    return (
        <Card className="p-3 text-sm max-w-fit max-h-fit mx-auto">
            <CardBody className="overflow-visible">
                <div className="grid grid-cols-7 grid-rows-7 gap-1 max-w-fit">
                    {Array.from({length: TOTAL_SPAWNERS}).map((_, index) => {
                        const col = index % GRID_DIMENSION;
                        const row = Math.floor(index / GRID_DIMENSION);
                        const id = (GRID_DIMENSION - 1 - row) * GRID_DIMENSION + col;
                        return <Spawner key={index} id={id}/>;
                    })}
                </div>
            </CardBody>
            <CardFooter className="p-0 justify-center">
                <p><b>Left-click</b> to add/remove a note. <b>Right-click</b> to select a note.</p>
            </CardFooter>
        </Card>
    )
}