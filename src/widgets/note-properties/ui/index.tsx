"use client";

import { useCallback, useEffect, useState } from "react";
import { CardTitle } from "@/src/shared/ui";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { useNote } from "@/src/entities/note";
import { useLevelProperties } from "@/src/entities/level";

export function NotePropertiesSection() {
    const { levelProperties: { power } } = useLevelProperties();
    const { selectedNote, update } = useNote();
    const [ powerInput, setPowerInput ] = useState<string>( "" );

    const handlePowerChange = useCallback(( value: string ) => {
        if ( !selectedNote ) return;

        const power = Number( value );
        setPowerInput( power.toString());

        if ( selectedNote.properties?.power !== power ) {
            update({ ...selectedNote, properties: { power } });
        }
    }, [ selectedNote, update, setPowerInput ]);

    useEffect(() => {
        if ( selectedNote?.properties?.power ) {
            setPowerInput( selectedNote.properties.power.toString());
        }
        else {
            setPowerInput( "" );
        }
    }, [ selectedNote ]);

    const id = selectedNote?.id;
    const beat = selectedNote?.beat;

    return (
        <Card className="grow">
            <CardHeader>
                <CardTitle>Свойства ноты</CardTitle>
            </CardHeader>

            <CardBody className="pt-0 grid grid-cols-2 grow-0 gap-4">
                { selectedNote
                    ? (
                        <>
                            <Input
                                readOnly
                                label="Позиция"
                                labelPlacement="outside-top"
                                type="number"
                                value={ id?.toString() }
                            />

                            <Input
                                readOnly
                                label="Бит"
                                labelPlacement="outside-top"
                                type="number"
                                value={ beat?.toString() }
                            />

                            <Input
                                label="Сила"
                                labelPlacement="outside-top"
                                min={ 0 }
                                placeholder={ power.toString() }
                                type="number"
                                value={ powerInput }
                                variant={ powerInput ? "flat" : "bordered" }
                                onValueChange={ handlePowerChange }
                            />
                        </>
                    )
                    : (
                        <p className="text-default-500">Нота не выбрана</p>
                    ) }
            </CardBody>
        </Card>
    );
}
