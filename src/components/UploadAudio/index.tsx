import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

export function UploadAudio() {
    return (
        <div className="flex flex-col gap-2 text-center">
            <Input type="file" className="hidden"/>
            <Button>Select .wav File</Button>
            <p className="text-sm">Loaded: <span className="font-mono font-bold">file.wav</span></p>
        </div>
    )
}