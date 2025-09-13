import { CardTitle } from "@/components/CardTitle";
import { UploadButton } from "@/components/UploadAudio";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { useState } from "react";

export function UploadAudioSection() {
    const [ audioFile, setAudioFile ] = useState<File | null>(null);
    const [ audioUrl, setAudioUrl ] = useState<string>("");

    const handleAudioFileSelected = (file: File) => {
        setAudioFile(file);
        setAudioUrl(URL.createObjectURL(file));
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload Audio</CardTitle>
            </CardHeader>
            <CardBody className="pt-0 gap-2">
                <UploadButton 
                    accept=".zip" 
                    color="primary">
                    Import Project (.zip)
                </UploadButton>
                <UploadButton 
                    accept=".wav"
                    onFileSelect={handleAudioFileSelected}>
                    Start with new .wav
                </UploadButton>
                {audioFile && <p className="text-sm text-center">Loaded: <span className="font-mono font-bold">{audioFile.name}</span></p>}
            </CardBody>
        </Card>
    )
}