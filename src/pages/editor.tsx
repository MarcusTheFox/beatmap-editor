import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";

import { ItemsGrid } from "@/components/SpawnerGrid";
import { EditorLayout } from "@/layouts/EditorLayout";
import { Spawner } from "@/components/Spawner";
import { Badge } from "@heroui/badge";
import { useState } from "react";
import { PressEvent } from "@react-types/shared";

interface SpawnerState {
    power: number | "inherit";
}

export default function EditorPage() {
    const [spawnerState, setSpawnerState] = useState<{ [id: number]: SpawnerState }>({});

    const handleSpawnerLeftClick = (event: PressEvent, id: number) => {
        setSpawnerState(prev => {
            if (prev[id]) {
                const newState = { ...prev };
                delete newState[id];
                return newState;
            } else {
                return {
                    ...prev,
                    [id]: { power: "inherit" }
                }
            }
        });
    }

    const handleSpawnerRightClick = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
        setSpawnerState(prev => ({
            ...prev,
            [id]: { power: 1800 }
        }));
    }
    
    const createSpawner = (key: number, id: number) => {
        const state = spawnerState[id];
        const isSelected = !!state;
        const hasCustomPower = isSelected && state?.power !== "inherit";
        const powerValue = state?.power;

        return (
            <Badge key={key} isInvisible={!hasCustomPower} color="secondary" content={powerValue ?? ""} size="sm">
                <Spawner key={key} 
                         id={id} 
                         isSelected={isSelected} 
                         onLeftClick={(e) => handleSpawnerLeftClick(e, id)} 
                         onRightClick={(e) => handleSpawnerRightClick(e, id)}/>
            </Badge>
        )
    }
    
    return (
        <EditorLayout>
            <Card className="p-3 text-sm">
                <CardBody className="overflow-visible">
                    <ItemsGrid renderItem={createSpawner} />
                </CardBody>
                <CardFooter className="p-0 justify-center">
                    <p><b>Left-click</b> to add/remove a note. <b>Right-click</b> to set custom power.</p>
                </CardFooter>
            </Card>
        </EditorLayout>
    );
}
