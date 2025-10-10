import { CardTitle } from "@/components/CardTitle"
import { useAudio } from "@/hooks/useAudio"
import { useLevel } from "@/hooks/useLevel"
import { useNote } from "@/hooks/useNote"
import { useZip } from "@/hooks/useZip"
import { Level } from "@/types"
import { Button } from "@heroui/button"
import { Card, CardBody, CardHeader } from "@heroui/card"

export const ExportSection = () => {
    const level = useLevel();
    const notes = useNote();
    const audio = useAudio();
    const { exportZip } = useZip();

    const handleExportButtonPress = async () => {
        if (!audio.audioFile) {
            console.log("Нет аудио файла");
            return;
        }

        const title = "Song name";
        const artist = "Artist name";
        const id = `${title} - ${artist}`;

        const exportLevel: Level = {
            audioFile: audio.audioFile,
            audioInfo: {
                title,
                artist,
                fileName: audio.audioFile.name
            },
            levelInfo: {
                authors: [
                    "test author"
                ],
                version: "0.0.0",
                difficulty: "Normal",
                beatmapFileName: "beatmap.json"
            },
            beatmap: {
                settings: {
                    bpm: level.bpm,
                    offset: level.offset,
                    properties: {
                        power: level.power
                    }
                },
                notes: notes.get()
            },
            id
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