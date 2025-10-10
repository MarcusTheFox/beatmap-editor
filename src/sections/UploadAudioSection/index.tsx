import { CardTitle } from "@/components/CardTitle";
import { UploadButton } from "@/components/UploadAudio";
import { useAudio } from "@/hooks/useAudio";
import { useLevel } from "@/hooks/useLevel";
import { useNote } from "@/hooks/useNote";
import { useZip } from "@/hooks/useZip";
import { Beatmap, Note } from "@/types";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { useState } from "react";

export function UploadAudioSection() {
    const audio = useAudio();
    const level = useLevel();
    const notes = useNote();
    const { importZip } = useZip();
    
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');

    const handleZipFileSelected = async (file: File) => {
        setLoading(true);
        setError('');
        try {
            const levelData = await importZip(file);
            audio.setAudio(levelData.audioFile);
            level.setBpm(levelData.beatmap.settings.bpm || 120);
            level.setOffset(levelData.beatmap.settings.offset || 0);
            level.setPower(levelData.beatmap.settings.properties.power || 1500);
            notes.set(makeNotes(levelData.beatmap));
        } catch (e: any) {
            console.error(e);
            setError(e.message || "Ошибка при чтении архива");
        } finally {
            setLoading(false);
        }
    }

    const handleAudioFileSelected = (file: File) => {
        audio.setAudio(file);
    }

    const makeNotes = (beatmap: Beatmap): Note[] => {
        const noteArray: Note[] = [];
        beatmap.notes.map((note: Note) => {
            const newNote: Note = {
                ...note,
                properties: {
                    power: note.properties?.power || beatmap.settings.properties.power || 1500
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