import { useAudio } from "@/hooks/useAudio";
import { useLevel } from "@/hooks/useLevel";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon24Pause, Icon24Play, Icon24SkipBack, Icon24SkipForward, Icon24SkipNext, Icon24SkipPrevious } from "@vkontakte/icons";
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";
import Minimap from 'wavesurfer.js/dist/plugins/minimap.esm.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';
import { Input } from "@heroui/input";

export function TimelineSection() {
    const {
        bpm,
        offset,
        currentTime,
        currentBeat,
        setTime,
        convertBeatsToTime,
    } = useLevel();
    const { audioUrl } = useAudio();

    const [ isLoaded, setIsLoaded ] = useState<boolean>(false);
    const [ isPlaying, setIsPlaying ] = useState<boolean>(false);

    const waveformRef = useRef<HTMLDivElement>(null);
    const wavesurferRef = useRef<WaveSurfer | null>(null);
    const regionsRef = useRef<RegionsPlugin | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const colorScheme = {
        waveColor: ["rgb(150, 150, 150)", "rgb(100, 100, 100)"],
        progressColor: ["rgb(0, 200, 255)", "rgb(0, 100, 255)"],
        cursorColor: "#ff8a00",
        regionColors: ["#ffffff30", "#ffffff15"],
        minimapProgress: "#3b82f6",
    };

    const waveformSettings: Partial<WaveSurferOptions> = {
        autoCenter: true,
        autoScroll: true,
        hideScrollbar: true,
        minPxPerSec: 100,
        sampleRate: 16000,
        barWidth: 3,
        barRadius: 5,
        barGap: 1,
        barAlign: "bottom",
        waveColor: colorScheme.waveColor,
        progressColor: colorScheme.progressColor,
        cursorColor: colorScheme.cursorColor,
        cursorWidth: 3
    };
    
    const formatTime = useCallback((seconds: number): string => {
        const mins = Math.max(Math.floor(seconds / 60), 0);
        const secs = Math.max(Math.floor(seconds % 60), 0);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }, []);

    const drawBpmMarkers = useCallback(() => {
        if (!wavesurferRef.current) return;

        if (!regionsRef.current) {
            regionsRef.current = RegionsPlugin.create();
        }

        const duration = wavesurferRef.current.getDuration() - offset;
        const totalBeats = Math.round(duration / (60 / bpm / 4));
        
        for (let index = 0; index < totalBeats; index++) {
            regionsRef.current.addRegion({
                start: 60 / bpm / 4 * index + offset,
                color: index % 4 === 0 ? colorScheme.regionColors[0] : colorScheme.regionColors[1],
                resize: false,
                drag: false,
                minLength: 1,
                id: index.toString(),
                contentEditable: false,
                channelIdx: 3,
            });
        }
        
    }, [ wavesurferRef, regionsRef, bpm, offset ]);
    
    const playPauseButtonHandler = useCallback(() => {
        if (!wavesurferRef.current || !isLoaded) return;
        if (isPlaying) wavesurferRef.current.pause();
        else wavesurferRef.current.play();
        setIsPlaying(v => !v);
    }, [ isPlaying, setIsPlaying, isLoaded ]);

    const previousBeatButtonHandler = () => {
        if (!wavesurferRef.current || !isLoaded || currentTime === 0) return;
        if (currentBeat === 0) {
            wavesurferRef.current.setTime(0);
            return;
        }

        const time = convertBeatsToTime(Math.ceil(currentBeat) - 1);
        wavesurferRef.current.setTime(time);
    };

    const nextBeatButtonHandler = () => {
        if (!wavesurferRef.current || !isLoaded) return;
        
        const soundDuration = wavesurferRef.current.getDuration();        
        if (currentTime === soundDuration) return;

        if (currentTime < offset) {
            wavesurferRef.current.setTime(offset);
            return;
        }

        const time = Math.min(convertBeatsToTime(Math.floor(currentBeat) + 1), soundDuration);
        wavesurferRef.current.setTime(time);
    };
    
    const handleWheel = (event: WheelEvent) => {
        if (!wavesurferRef.current || !isLoaded) return;
        
        event.preventDefault();
        
        const delta = Math.sign(event.deltaY);
        if (delta > 0) previousBeatButtonHandler();
        else nextBeatButtonHandler();
    };

    useEffect(() => {
        if (!waveformRef.current) return;

        regionsRef.current = RegionsPlugin.create();
        const minimap = Minimap.create({
            height: 20,
            dragToSeek: true,
            progressColor: colorScheme.minimapProgress,
        });

        wavesurferRef.current = WaveSurfer.create({
            container: waveformRef.current,
            plugins: [ minimap, regionsRef.current ],
            ...waveformSettings
        });
        
        wavesurferRef.current.on("ready", () => {
            drawBpmMarkers();
            setIsLoaded(true);
        });
        wavesurferRef.current.on("play", () => setIsPlaying(true));
        wavesurferRef.current.on("pause", () => setIsPlaying(false));
        wavesurferRef.current.on("finish", () => setIsPlaying(false));
        wavesurferRef.current.on("timeupdate", (time: number) => setTime(time));

        wavesurferRef.current.load(audioUrl);

        return () => {
            wavesurferRef.current?.destroy();
            setIsLoaded(false);
            setTime(0);
        };
    }, [audioUrl, bpm, offset]);

    useEffect(() => {
        const cardElement = cardRef.current;
        if (!cardElement) return;

        const handleCardWheel = (event: WheelEvent) => {
            handleWheel(event);
        };

        cardElement.addEventListener('wheel', handleCardWheel, { passive: false });

        return () => {
            cardElement.removeEventListener('wheel', handleCardWheel);
        };
    }, [handleWheel]);

    return (
        <div>
            <Card className="" ref={cardRef}>
                <CardHeader className="flex pb-0">
                    <div className="flex gap-2 w-full">
                        <Input disabled startContent={"Time:"} className="max-w-48 align-baseline" value={formatTime(currentTime)}/>
                        <Input disabled startContent={"Beat:"} className="max-w-48" value={currentBeat.toFixed(3).toString()}/>
                    </div>
                    <div className="flex gap-2 justify-center w-full">
                        <Button isIconOnly disabled={ !isLoaded }><Icon24SkipPrevious /></Button>
                        <Button isIconOnly disabled={ !isLoaded } onPress={ previousBeatButtonHandler }><Icon24SkipBack /></Button>
                        <Button isIconOnly disabled={ !isLoaded } onPress={ playPauseButtonHandler } color={ isPlaying ? "primary" : "default" }>
                            { isPlaying ? <Icon24Pause /> : <Icon24Play /> }
                        </Button>
                        <Button isIconOnly disabled={ !isLoaded } onPress={ nextBeatButtonHandler }><Icon24SkipForward /></Button>
                        <Button isIconOnly disabled={ !isLoaded }><Icon24SkipNext /></Button>
                    </div>
                    <div className="w-full"></div>
                </CardHeader>
                <CardBody>
                    <div ref={waveformRef} />
                </CardBody>
            </Card>
        </div>
    )
}6