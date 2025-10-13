import { useAudio } from "@/hooks/useAudio";
import { useLevel } from "@/hooks/useLevel";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useEffect, useRef, useState } from "react";
import { Icon24Pause, Icon24Play, Icon24SkipBack, Icon24SkipForward, Icon24SkipNext, Icon24SkipPrevious } from "@vkontakte/icons";
import { Input } from "@heroui/input";
import { Label } from "@/components/Label";
import { convertTimeToBeats, formatTime } from "@/utils";
import { WaveSurferComponent, WaveSurferComponentRef } from "./WaveSurferComponent";
import { WaveSurferControls } from "./WaveSurferComponent/useWaveSurfer";
import { useEditorContext } from "@/contexts/EditorContext";

export function TimelineSection() {
    const { controls, setControls } = useEditorContext();
    const { bpm, offset } = useLevel();
    const { audioUrl } = useAudio();

    const [ isLoaded, setIsLoaded ] = useState<boolean>(false);
    const [ currentTime, setCurrentTime ] = useState<number>(0);
    const [ isPlaying, setIsPlaying ] = useState<boolean>(false);
    const [ isBeatEditing, setIsBeatEditing ] = useState<boolean>(false);
    const [ beatInput, setBeatInput ] = useState<string>('');

    const waveSurferRef = useRef<WaveSurferComponentRef>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const beatInputRef = useRef<HTMLInputElement>(null);
    
    const playPauseButtonHandler = () => {
        if (!controls) return;
        controls.playPause();
        setIsPlaying(controls.isPlaying);
    }
    const nextBeatButtonHandler = () => controls?.next();
    const previousBeatButtonHandler = () => controls?.previous();
    const startBeatButtonHandler = () => controls?.start();
    const lastBeatButtonHandler = () => controls?.end();
    
    const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        
        const delta = Math.sign(event.deltaY);
        if (delta > 0) previousBeatButtonHandler();
        else nextBeatButtonHandler();
    };

    const handleBeatInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        controls?.setBeat(Number(beatInput));
        setIsBeatEditing(false);
        setBeatInput('');
    }

    const handleBeatDisplayClick = () => {
        if (!controls) return;
        setIsBeatEditing(true);
        setBeatInput(controls.getBeat().toFixed(3))
    }

    const handleBeatInputBlur = () => {
        setIsBeatEditing(false);
        setBeatInput('');
    }

    const handleWaveSurferReady = () => {
        if (!waveSurferRef.current) return;

        const newControls = waveSurferRef.current.getControls();
        if (!newControls) return;

        setControls(newControls);

        setIsPlaying(newControls.isPlaying());
        setIsLoaded(true);
    }

    const handleTimeUpdate = (time: number) => {
        setCurrentTime(time);
    }

    const handleControlsUpdate = (newControls: WaveSurferControls) => {
        setControls(newControls);
    }

    useEffect(() => {
        const wheelContainer = document.getElementById("main-container");
        if (!wheelContainer) return;

        const handleCardWheel = (event: WheelEvent) => handleWheel(event);
        wheelContainer.addEventListener('wheel', handleCardWheel, { passive: false });

        return () => wheelContainer.removeEventListener('wheel', handleCardWheel);
    }, [handleWheel]);

    useEffect(() => {
        if (isBeatEditing) {
            beatInputRef.current?.focus();
            beatInputRef.current?.select();
        }
    }, [isBeatEditing]);

    const beatLabel = (
        <Label className="w-48" onClick={handleBeatDisplayClick}>
            Beat: {convertTimeToBeats(currentTime, bpm, offset).toFixed(3)}
        </Label>
    )

    const beatForm = (
        <form onSubmit={handleBeatInputSubmit}>
            <Input
                ref={beatInputRef}
                type="number"
                min={0}
                step={0.001}
                variant="faded"
                startContent={"Beat:"}
                className="max-w-48"
                value={beatInput}
                onValueChange={(v) => setBeatInput(v)}
                onBlur={handleBeatInputBlur}
                />
        </form>
    )

    const timelineHeader = (
        <CardHeader className="flex pb-0">
            <div className="flex gap-2 w-full">
                <Label className="w-48">Time: {formatTime(currentTime)}</Label>
                { !isBeatEditing ? beatLabel : beatForm }
            </div>
            <div className="flex gap-2 justify-center w-full">
                <Button isIconOnly disabled={ !isLoaded } onPress={ startBeatButtonHandler }><Icon24SkipPrevious /></Button>
                <Button isIconOnly disabled={ !isLoaded } onPress={ previousBeatButtonHandler }><Icon24SkipBack /></Button>
                <Button isIconOnly disabled={ !isLoaded } onPress={ playPauseButtonHandler } color={ isPlaying ? "primary" : "default" }>
                    { isPlaying ? <Icon24Pause /> : <Icon24Play /> }
                </Button>
                <Button isIconOnly disabled={ !isLoaded } onPress={ nextBeatButtonHandler }><Icon24SkipForward /></Button>
                <Button isIconOnly disabled={ !isLoaded } onPress={ lastBeatButtonHandler }><Icon24SkipNext /></Button>
            </div>
            <div className="w-full"></div>
        </CardHeader>
    )

    return (
        <div>
            <Card className="" ref={cardRef}>
                { isLoaded && controls && timelineHeader }
                <CardBody>
                    <WaveSurferComponent
                        ref={waveSurferRef}
                        audioUrl={audioUrl}
                        bpm={bpm}
                        offset={offset}
                        onReady={handleWaveSurferReady}
                        onTimeUpdate={handleTimeUpdate}
                        onControlsUpdate={handleControlsUpdate}
                    />
                </CardBody>
            </Card>
        </div>
    )
}