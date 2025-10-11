import { useAudio } from "@/hooks/useAudio";
import { useLevel } from "@/hooks/useLevel";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon24Pause, Icon24Play, Icon24SkipBack, Icon24SkipForward, Icon24SkipNext, Icon24SkipPrevious } from "@vkontakte/icons";
import WaveSurfer from "wavesurfer.js";
import Minimap from 'wavesurfer.js/dist/plugins/minimap.esm.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';
import { Input } from "@heroui/input";
import { Label } from "@/components/Label";
import { convertBeatsToTime, formatTime } from "@/utils";
import { WaveSurferComponent, WaveSurferComponentRef } from "./WaveSurferComponent";

export function TimelineSection() {
    const {
        bpm,
        offset,
        currentTime,
        currentBeat,
        isPlaying,
        setPlay,
        setPause,
        setTime
    } = useLevel();
    const { audioUrl } = useAudio();

    const [ isLoaded, setIsLoaded ] = useState<boolean>(false);
    const [ isBeatEditing, setIsBeatEditing ] = useState<boolean>(false);
    const [ beatInput, setBeatInput ] = useState<string>('');

    const wavesurferRef = useRef<WaveSurferComponentRef>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const beatInputRef = useRef<HTMLInputElement>(null);
    
    const playPauseButtonHandler = () => {
        wavesurferRef.current?.togglePlay();
    };

    const nextBeatButtonHandler = () => {
        wavesurferRef.current?.next();
    };

    const previousBeatButtonHandler = () => {
        wavesurferRef.current?.previous();
    };

    const startBeatButtonHandler = () => {
        wavesurferRef.current?.start()
    }

    const lastBeatButtonHandler = () => {
        wavesurferRef.current?.end();
    }
    
    const handleWheel = (event: WheelEvent) => {
        if (!wavesurferRef.current) return;
        
        event.preventDefault();
        
        const delta = Math.sign(event.deltaY);
        if (delta > 0) previousBeatButtonHandler();
        else nextBeatButtonHandler();
    };

    const handleBeatInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        wavesurferRef.current?.setBeat(Number(beatInput));
        setIsBeatEditing(false);
        setBeatInput('');
    }

    const handleBeatDisplayClick = () => {
        setIsBeatEditing(true);
        setBeatInput(currentBeat.toFixed(3))
    }

    const handleBeatInputBlur = () => {
        setIsBeatEditing(false);
        setBeatInput('');
    }

    useEffect(() => {
        const wheelContainer = document.getElementById("main-container");
        if (!wheelContainer) return;

        const handleCardWheel = (event: WheelEvent) => {
            handleWheel(event);
        };

        wheelContainer.addEventListener('wheel', handleCardWheel, { passive: false });

        return () => {
            wheelContainer.removeEventListener('wheel', handleCardWheel);
        };
    }, [handleWheel]);

    useEffect(() => {
        if (isBeatEditing) {
            beatInputRef.current?.focus();
            beatInputRef.current?.select();
        }
    }, [isBeatEditing]);

    return (
        <div>
            <Card className="" ref={cardRef}>
                <CardHeader className="flex pb-0">
                    <div className="flex gap-2 w-full">
                        <Label className="w-48">Time: {formatTime(currentTime)}</Label>
                        { !isBeatEditing
                            ? <Label className="w-48" onClick={handleBeatDisplayClick}>Beat: {currentBeat.toFixed(3)}</Label>
                            : (
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
                        }
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
                <CardBody>
                    <WaveSurferComponent
                        ref={wavesurferRef}
                        audioUrl={audioUrl}
                        bpm={bpm}
                        offset={offset}
                    />
                </CardBody>
            </Card>
        </div>
    )
}6