import { CardTitle } from "@/components/CardTitle";
import { useLevelMetadata } from "@/contexts/LevelMetadataContext";
import { useLevelProperties } from "@/contexts/LevelProperties";
import { useTimelineSettings } from "@/contexts/TimelineSettingsContext";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { useCallback } from "react";

export function TrackInfoSection() {
    const { metadata, setMetadata } = useLevelMetadata();
    const { timelineSettings, setTimelineSettings } = useTimelineSettings();
    const { levelProperties, setLevelProperties } = useLevelProperties();

    const handleBpmChange = useCallback((value: string) => {
        setTimelineSettings({ ...timelineSettings, bpm: Number(value) });
    }, [ setTimelineSettings, timelineSettings ]);

    const handleOffsetChange = useCallback((value: string) => {
        setTimelineSettings({ ...timelineSettings, offset: Number(value) });
    }, [ setTimelineSettings, timelineSettings ]);

    const handlePowerChange = useCallback((value: string) => {
        setLevelProperties({ ...levelProperties, power: Number(value) });
    }, [ setLevelProperties, levelProperties ]);

    return (
        <Card className="grow">
            <CardHeader><CardTitle>Track Info</CardTitle></CardHeader>
            <CardBody className="pt-0 grid grid-cols-2 grow-0 gap-4">
                <Input
                    label="Track name"
                    labelPlacement="outside-top"
                    value={metadata.title}
                    onValueChange={(v) => setMetadata({ ...metadata, title: v })}
                />
                <Input
                    label="Artist name"
                    labelPlacement="outside-top"
                    value={metadata.artist}
                    onValueChange={(v) => setMetadata({ ...metadata, artist: v })}
                />
                <Input
                    label="Mapper name"
                    labelPlacement="outside-top"
                    value={metadata.authors[0]}
                    onValueChange={(v) => setMetadata({ ...metadata, authors: [v] })}
                />
                <Input
                    label="Version"
                    defaultValue="1.0.0"
                    labelPlacement="outside-top"
                    placeholder="1.0.0"
                    value={metadata.version}
                    onValueChange={(v) => setMetadata({ ...metadata, version: v })}
                />
                <Input
                    type="number"
                    label="Initial BPM"
                    labelPlacement="outside-top"
                    min={1}
                    step={0.001}
                    value={timelineSettings.bpm.toString()}
                    onValueChange={handleBpmChange}
                />
                <Input
                    type="number"
                    label="Initial Power"
                    labelPlacement="outside-top"
                    min={0}
                    value={levelProperties.power.toString()}
                    onValueChange={handlePowerChange}
                />
                <Input
                    type="number"
                    label="Audio Offset (s)"
                    labelPlacement="outside-top"
                    min={0}
                    step={0.001}
                    value={timelineSettings.offset.toString()}
                    onValueChange={handleOffsetChange}
                />
            </CardBody>
        </Card>
    )
}