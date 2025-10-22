import { useCallback, useEffect, useState } from "react";
import { CardTitle } from "@/shared/ui";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { useNote } from "@/entities/note";
import { useLevelProperties } from "@/entities/level";

export function NotePropertiesSection() {
    const { levelProperties: { power } } = useLevelProperties();
    const { selectedNote, update } = useNote();
    const [ powerInput, setPowerInput ] = useState<string>("");

    const handlePowerChange = useCallback((value: string) => {
        if (!selectedNote) return;

        const power = Number(value);
        setPowerInput(power.toString());

        if (selectedNote.properties?.power !== power) {
            update({ ...selectedNote, properties: { power }});
        }
    }, [selectedNote, update, setPowerInput]);

    useEffect(() => {
        if (selectedNote?.properties?.power) {
            setPowerInput(selectedNote.properties.power.toString());
        } else {
            setPowerInput('')
        }
    }, [selectedNote])

    const id = selectedNote?.id;
    const beat = selectedNote?.beat;

    return (
        <Card className="grow">
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
                            placeholder={power.toString()}
                            value={powerInput}
                            min={0}
                            onValueChange={handlePowerChange}
                            label="Power"
                            labelPlacement="outside-top"
                            variant={powerInput ? "flat" : "bordered"}
                        />
                    </>
                ) : (
                    <p className="text-default-500">No note selected</p>
                )}
            </CardBody>
        </Card>
    )
}