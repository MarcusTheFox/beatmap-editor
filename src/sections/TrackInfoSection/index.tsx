import { CardTitle } from "@/components/CardTitle";
import { useLevel } from "@/hooks/useLevel";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { useCallback } from "react";

export function TrackInfoSection() {
    const { setBpm, setPower, setOffset } = useLevel();

    const handleValueChange = useCallback((
        setter: (value: number) => void,
        condition: (value: number) => boolean,
        value: string
    ) => {
        const numericValue = Number(value);
        if (!isNaN(numericValue) && condition(numericValue)) {
            setter(numericValue);
        }
    }, []);

    const handleBpmChange = useCallback((value: string) => {
        handleValueChange( setBpm, (v: number) => v > 0, value );
    }, [ handleValueChange ]);

    const handlePowerChange = useCallback((value: string) => {
        handleValueChange( setPower, (v: number) => v > 0, value );
    }, [ handleValueChange ]);

    const handleOffsetChange = useCallback((value: string) => {
        handleValueChange( setOffset, (v: number) => v >= 0, value );
    }, [ handleValueChange ]);

    return (
        <Card className="grow">
            <CardHeader><CardTitle>Track Info</CardTitle></CardHeader>
            <CardBody className="pt-0 grid grid-cols-2 grow-0 gap-4">
                <Input label="Track name" labelPlacement="outside-top"/>
                <Input label="Artist name" labelPlacement="outside-top"/>
                <Input label="Mapper name" labelPlacement="outside-top"/>
                <Input label="Version" defaultValue="1.0.0" labelPlacement="outside-top" placeholder="1.0.0"/>
                <Input type="number" min={1.0} defaultValue="120" onValueChange={handleBpmChange} label="Initial BPM" labelPlacement="outside-top"/>
                <Input type="number" min={0} defaultValue="1500" onValueChange={handlePowerChange} label="Initial Power" labelPlacement="outside-top"/>
                <Input type="number" min={0} step={0.001} defaultValue="0" onValueChange={handleOffsetChange} label="Audio Offset (s)" labelPlacement="outside-top"/>
            </CardBody>
        </Card>
    )
}