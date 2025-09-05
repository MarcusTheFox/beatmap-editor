import { CardTitle } from "@/components/CardTitle";
import { UploadAudio } from "@/components/UploadAudio";
import { Card, CardHeader, CardBody } from "@heroui/card";

export function UploadAudioSection() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload Audio</CardTitle>
            </CardHeader>
            <CardBody className="pt-0">
                <UploadAudio />
            </CardBody>
        </Card>
    )
}