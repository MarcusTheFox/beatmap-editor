import { CardTitle } from "@/components/CardTitle";
import { UploadButton } from "@/components/UploadAudio";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { useState } from "react";

export function UploadAudioSection() {
    const [ loadedFile, setLoadedFile ] = useState<string | undefined>(undefined);

    const handleAudioFileSelected = (file: File) => {
        setLoadedFile(file.name);
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
                {loadedFile && <p className="text-sm text-center">Loaded: <span className="font-mono font-bold">{loadedFile}</span></p>}
            </CardBody>
        </Card>
    )
}