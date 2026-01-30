import { useLevelMetadata, useLevelProperties, useTimelineSettings } from "@/src/entities/level";
import { CardTitle } from "@/src/shared/ui";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { NumberInput } from "@heroui/number-input";
import { useCallback } from "react";

export function TrackInfoSection() {
    const { metadata, setMetadata } = useLevelMetadata();
    const { timelineSettings, setTimelineSettings } = useTimelineSettings();
    const { levelProperties, setLevelProperties } = useLevelProperties();

    const handleBpmChange = useCallback((value: number) => {
        setTimelineSettings({ ...timelineSettings, bpm: value });
    }, [ setTimelineSettings, timelineSettings ]);

    const handleOffsetChange = useCallback((value: number) => {
        setTimelineSettings({ ...timelineSettings, offset: value });
    }, [ setTimelineSettings, timelineSettings ]);

    const handlePowerChange = useCallback((value: number) => {
        setLevelProperties({ ...levelProperties, power: value });
    }, [ setLevelProperties, levelProperties ]);

    return (
        <Card className="grow">
            <CardHeader><CardTitle>Информация</CardTitle></CardHeader>
            <CardBody className="pt-0 grid grid-cols-2 grow-0 gap-4">
                <Input
                    label="Название трека"
                    labelPlacement="outside-top"
                    value={metadata.title}
                    onValueChange={(v) => setMetadata({ ...metadata, title: v })}
                />
                <Input
                    label="Автор трека"
                    labelPlacement="outside-top"
                    value={metadata.artist}
                    onValueChange={(v) => setMetadata({ ...metadata, artist: v })}
                />
                <Input
                    label="Маппер"
                    labelPlacement="outside-top"
                    value={metadata.authors[0]}
                    onValueChange={(v) => setMetadata({ ...metadata, authors: [v] })}
                />
                <Input
                    label="Версия"
                    defaultValue="1.0.0"
                    labelPlacement="outside-top"
                    placeholder="1.0.0"
                    value={metadata.version}
                    onValueChange={(v) => setMetadata({ ...metadata, version: v })}
                />
                <NumberInput
                    type="number"
                    label="BPM трека"
                    labelPlacement="outside-top"
                    minValue={1}
                    step={0.001}
                    value={timelineSettings.bpm}
                    onValueChange={handleBpmChange}
                />
                <NumberInput
                    type="number"
                    label="Сила по умолчанию"
                    labelPlacement="outside-top"
                    minValue={0}
                    value={levelProperties.power}
                    onValueChange={handlePowerChange}
                />
                <NumberInput
                    type="number"
                    label="Отступ первого бита (сек)"
                    labelPlacement="outside-top"
                    minValue={0}
                    step={0.001}
                    value={timelineSettings.offset}
                    onValueChange={handleOffsetChange}
                />
            </CardBody>
        </Card>
    )
}