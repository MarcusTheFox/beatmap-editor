import { useAudio } from "@/entities/audio";
import { useTimelineSettings } from "@/entities/level";
import { useBeatInput, usePlaybackControls, useTimelineState } from "@/entities/wavesurfer/model";
import { useRef } from "react";
import { Label } from "@/shared/ui";
import { convertTimeToBeats, formatTime } from "@/shared/lib";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Icon24Pause, Icon24Play, Icon24SkipBack, Icon24SkipForward, Icon24SkipNext, Icon24SkipPrevious } from "@vkontakte/icons";
import { WaveSurferComponent, WaveSurferComponentRef } from "@/entities/wavesurfer";
import { useTimelineContext } from "../model/context";

export function TimelineSection() {
    const { controls, setControls, currentTime, setCurrentTime, isPlaying, setIsPlaying } = useTimelineContext();
    const { timelineSettings: { bpm, offset } } = useTimelineSettings();
    const { audioUrl } = useAudio();
    const beatInput = useBeatInput(controls);
    const { nextBeat, playPause, prevBeat, toEnd, toStart } = usePlaybackControls(controls);
    const { loading, onPlayPause, onReady, onTimeUpdate } = useTimelineState({ setControls, setCurrentTime, setIsPlaying });

    const waveSurferRef = useRef<WaveSurferComponentRef>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleWaveSurferReady = () => {
        const newControls = waveSurferRef.current?.getControls();
        if (!newControls) return;
        onReady(newControls);
    }

    const beatLabel = (
        <Label className="w-48" onClick={beatInput.handleDisplayClick}>
            Beat: {convertTimeToBeats(currentTime, bpm, offset).toFixed(3)}
        </Label>
    )

    const beatForm = (
        <form onSubmit={beatInput.handleSubmit}>
            <Input
                ref={beatInput.inputRef}
                type="number"
                min={0}
                step={0.001}
                variant="faded"
                startContent={"Beat:"}
                className="max-w-48"
                value={beatInput.inputValue}
                onValueChange={(v) => beatInput.setInputValue(v)}
                onBlur={beatInput.handleInputBlur}
                />
        </form>
    )

    const timelineHeader = (
        <CardHeader className="flex pb-0 px-8">
            <div className="flex gap-2 w-full">
                <Label className="w-48">Time: {formatTime(currentTime)}</Label>
                { beatInput.isEditing ? beatForm : beatLabel }
            </div>
            <div className="flex gap-2 justify-center w-full">
                <Button isIconOnly disabled={ loading } onPress={ toStart }><Icon24SkipPrevious /></Button>
                <Button isIconOnly disabled={ loading } onPress={ prevBeat }><Icon24SkipBack /></Button>
                <Button isIconOnly disabled={ loading } onPress={ playPause } color={ isPlaying ? "primary" : "default" }>
                    { isPlaying ? <Icon24Pause /> : <Icon24Play /> }
                </Button>
                <Button isIconOnly disabled={ loading } onPress={ nextBeat }><Icon24SkipForward /></Button>
                <Button isIconOnly disabled={ loading } onPress={ toEnd }><Icon24SkipNext /></Button>
            </div>
            <div className="w-full"></div>
        </CardHeader>
    )

    return (
        <div>
            <Card
                id="timeline-container"
                className="rounded-none bg-transparent border-t-1 border-t-default-200 shadow-none"
                ref={cardRef}
            >
                { !loading && controls && timelineHeader }
                <CardBody className="px-0 overflow-hidden">
                    <WaveSurferComponent
                        ref={waveSurferRef}
                        audioUrl={audioUrl}
                        bpm={bpm}
                        offset={offset}
                        onReady={handleWaveSurferReady}
                        onTimeUpdate={onTimeUpdate}
                        onControlsUpdate={setControls}
                        onPlay={() => onPlayPause(true)}
                        onPause={() => onPlayPause(false)}
                    />
                </CardBody>
            </Card>
        </div>
    )
}