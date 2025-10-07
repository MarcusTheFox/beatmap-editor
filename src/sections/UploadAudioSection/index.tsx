import { CardTitle } from "@/components/CardTitle";
import { UploadButton } from "@/components/UploadAudio";
import { useAudio } from "@/hooks/useAudio";
import { useLevel } from "@/hooks/useLevel";
import { useNote } from "@/hooks/useNote";
import { useZip } from "@/hooks/useZip";
import { BeatmapJson, BeatmapNote, Note } from "@/types";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { useEffect } from "react";

export function UploadAudioSection() {
    const audio = useAudio();
    const level = useLevel();
    const zip = useZip();
    const notes = useNote();

    useEffect(() => {
        if (!zip.info || !zip.audioFile || !zip.beatmap) return;

        audio.setAudio(zip.audioFile);
        level.setBpm(zip.beatmap.settings.bpm || zip.info.bpm || 120);
        level.setOffset(zip.beatmap.settings.offset || 0);
        level.setPower(zip.beatmap.settings.power || 1500);
        notes.set(makeNotes(zip.beatmap));

    }, [zip.info, zip.audioFile, zip.beatmap]);

    const handleZipFileSelected = async (file: File) => {
        await zip.importZip(file);
    }

    const handleAudioFileSelected = (file: File) => {
        audio.setAudio(file);
    }

    const makeNotes = (beatmap: BeatmapJson): Note[] => {
        const noteArray: Note[] = [];
        beatmap.notes.map((note: BeatmapNote) => {
            const newNote: Note = {
                pos: {
                    beat: note.beat,
                    id: note.id
                },
                properties: {
                    power: note.power || beatmap.settings.power || 1500
                }
            }
            noteArray.push(newNote);
        });
        return noteArray;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload Audio</CardTitle>
            </CardHeader>
            <CardBody className="pt-0 gap-2">
                <UploadButton 
                    accept=".zip" 
                    color="primary"
                    onFileSelect={handleZipFileSelected}>
                    Import Project (.zip)
                </UploadButton>
                <UploadButton 
                    accept=".wav"
                    onFileSelect={handleAudioFileSelected}>
                    Start with new .wav
                </UploadButton>
                {audio.audioFile && <p className="text-sm text-center">Loaded: <span className="font-mono font-bold">{audio.audioFile.name}</span></p>}
            </CardBody>
        </Card>
    )
}