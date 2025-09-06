import { CardTitle } from "@/components/CardTitle";
import { UploadButton } from "@/components/UploadAudio";
import { Card, CardHeader, CardBody } from "@heroui/card";

export function UploadAudioSection() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload Audio</CardTitle>
            </CardHeader>
            <CardBody className="pt-0 gap-2">
                <UploadButton accept=".zip" color="primary">Import Project (.zip)</UploadButton>
                <UploadButton accept=".wav">Start with new .wav</UploadButton>
                <p className="text-sm text-center">Loaded: <span className="font-mono font-bold">file.wav</span></p>
            </CardBody>
        </Card>
    )
}