import { useAudio } from "@/src/entities/audio";
import { Level, useLevelMetadata, useLevelProperties, useTimelineSettings } from "@/src/entities/level";
import { useNote } from "@/src/entities/note";
import { Button, ButtonProps } from "@heroui/button";
import { useZip } from "../model";

export const ExportButton = ( props: ButtonProps ) => {
    const { metadata } = useLevelMetadata();
    const { levelProperties } = useLevelProperties();
    const { timelineSettings } = useTimelineSettings();
    const notes = useNote();
    const audio = useAudio();
    const { exportZip } = useZip();

    const handleExportButtonPress = async () => {
        if ( !audio.audioFile ) {
            console.log( "Нет аудио файла" );
            return;
        }

        const exportLevel: Level = {
            id: `${ metadata.title } - ${ metadata.artist }`,
            audioFile: audio.audioFile,
            audioInfo: {
                title: metadata.title,
                artist: metadata.artist,
                fileName: audio.audioFile.name,
            },
            levelInfo: {
                authors: metadata.authors,
                version: metadata.version,
                difficulty: metadata.difficulty,
                beatmapFileName: "beatmap.json",
            },
            beatmap: {
                settings: {
                    ...timelineSettings,
                    properties: { ...levelProperties },
                },
                notes: notes.get(),
            },
        };

        await exportZip( exportLevel );
    };

    return (
        <Button
            { ...props }
            preventFocusOnPress
            onClickCapture={ handleExportButtonPress }
        >
            { props.children }
        </Button>
    );
};
