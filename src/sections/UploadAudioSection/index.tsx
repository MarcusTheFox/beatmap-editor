import { CardTitle } from "@/components/CardTitle";
import { UploadButton } from "@/components/UploadAudio";
import { useAudio } from "@/hooks/useAudio";
import { Card, CardHeader, CardBody } from "@heroui/card";

export function UploadAudioSection() {
    const { audioFile, setAudio } = useAudio();

    const handleAudioFileSelected = (file: File) => {
        setAudio(file);
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