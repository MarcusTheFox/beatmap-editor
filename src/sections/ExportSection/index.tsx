import { CardTitle } from "@/components/CardTitle"
import { useLevelMetadata } from "@/contexts/LevelMetadataContext"
import { useLevelProperties } from "@/contexts/LevelProperties"
import { useTimelineSettings } from "@/contexts/TimelineSettingsContext"
import { useAudio } from "@/hooks/useAudio"
import { useNote } from "@/hooks/useNote"
import { useZip } from "@/hooks/useZip"
import { Level } from "@/types"
import { Button } from "@heroui/button"
import { Card, CardBody, CardHeader } from "@heroui/card"

export const ExportSection = () => {
    const { metadata } = useLevelMetadata();
    const { levelProperties } = useLevelProperties();
    const { timelineSettings } = useTimelineSettings();
    const notes = useNote();
    const audio = useAudio();
    const { exportZip } = useZip();

    const handleExportButtonPress = async () => {
        if (!audio.audioFile) {
            console.log("Нет аудио файла");
            return;
        }

        const exportLevel: Level = {
            id: `${metadata.title} - ${metadata.artist}`,
            audioFile: audio.audioFile,
            audioInfo: {
                title: metadata.title,
                artist: metadata.artist,
                fileName: audio.audioFile.name
            },
            levelInfo: {
                authors: metadata.authors,
                version: metadata.version,
                difficulty: metadata.difficulty,
                beatmapFileName: "beatmap.json"
            },
            beatmap: {
                settings: {
                    ...timelineSettings,
                    properties: { ...levelProperties }
                },
                notes: notes.get()
            }
        }

        await exportZip(exportLevel);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Export Level</CardTitle>
            </CardHeader>
            <CardBody className="pt-0 gap-2">
                <Button 
                    color="primary"
                    onPress={handleExportButtonPress}>
                    Export
                </Button>
            </CardBody>
        </Card>
    )
}