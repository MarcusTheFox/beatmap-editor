import { useLevelMetadata } from "@/contexts/LevelMetadataContext"
import { useLevelProperties } from "@/contexts/LevelProperties"
import { useTimelineSettings } from "@/contexts/TimelineSettingsContext"
import { useAudio } from "@/hooks/useAudio"
import { useNote } from "@/hooks/useNote"
import { useZip } from "@/hooks/useZip"
import { Level } from "@/types"
import { Button, ButtonProps } from "@heroui/button"

export const ExportButton = (props: ButtonProps) => {
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
        <Button
            {...props}
            onPress={handleExportButtonPress}
        >
            {props.children}
        </Button>
    )
}