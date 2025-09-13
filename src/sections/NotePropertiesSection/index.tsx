import { useCallback, useEffect, useState } from "react";
import { CardTitle } from "@/components/CardTitle";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { useNote } from "@/hooks/useNote";

export function NotePropertiesSection() {
    const { selectedNote, update } = useNote();
    const [ powerInput, setPowerInput ] = useState<number>(0);

    const handlePowerChange = useCallback((value: string) => {
        if (!selectedNote) return;

        const power = Number(value);
        setPowerInput(power);

        if (selectedNote.properties.power !== power) {
            update(selectedNote.pos.beat, selectedNote.pos.id, { power });
        }
    }, [selectedNote, update, setPowerInput]);

    useEffect(() => {
        if (selectedNote) {
            setPowerInput(selectedNote.properties.power);
        }
    }, [selectedNote])

    const id = selectedNote?.pos.id;
    const beat = selectedNote?.pos.beat;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Note Properties</CardTitle>
            </CardHeader>
            <CardBody className="pt-0 grid grid-cols-2 grow-0 gap-4">
                {selectedNote ? (
                    <>
                        <Input
                            type="number"
                            readOnly
                            value={id?.toString()}
                            label="Spawner ID"
                            labelPlacement="outside-top"
                        />
                        <Input
                            type="number"
                            readOnly
                            value={beat?.toString()}
                            label="Beat"
                            labelPlacement="outside-top"
                        />
                        <Input
                            type="number"
                            value={powerInput.toString()}
                            min={0}
                            onValueChange={handlePowerChange}
                            label="Power"
                            labelPlacement="outside-top"
                        />
                    </>
                ) : (
                    <p className="text-gray-500">No note selected</p>
                )}
            </CardBody>
        </Card>
    )
}