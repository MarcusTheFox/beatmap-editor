import { CardTitle } from "@/components/CardTitle";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";

export function TrackInfoSection() {
    return (
        <Card className="grow">
            <CardHeader><CardTitle>Track Info</CardTitle></CardHeader>
            <CardBody className="pt-0 grid grid-cols-2 grow-0 gap-4">
                <Input label="Track name" labelPlacement="outside-top"/>
                <Input label="Artist name" labelPlacement="outside-top"/>
                <Input type="number" min={1} defaultValue="120" label="Initial BPM" labelPlacement="outside-top"/>
                <Input type="number" min={0} defaultValue="1500" label="Initial Power" labelPlacement="outside-top"/>
                <Input type="number" min={0} defaultValue="0" label="Audio Offset (s)" labelPlacement="outside-top"/>
            </CardBody>
        </Card>
    )
}