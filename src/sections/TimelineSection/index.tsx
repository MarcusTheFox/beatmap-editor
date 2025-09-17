import { useAudio } from "@/hooks/useAudio";
import { useLevel } from "@/hooks/useLevel";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon24Pause, Icon24Play, Icon24SkipBack, Icon24SkipForward, Icon24SkipNext, Icon24SkipPrevious } from "@vkontakte/icons";
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";
import Minimap from 'wavesurfer.js/dist/plugins/minimap.esm.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';

export function TimelineSection() {
    const { bpm, offset } = useLevel();
    const { audioUrl } = useAudio();

    const [ isLoaded, setIsLoaded ] = useState<boolean>(false);
    const [ isPlaying, setIsPlaying ] = useState<boolean>(false);

    const waveformRef = useRef<HTMLDivElement>(null);
    const wavesurferRef = useRef<WaveSurfer | null>(null);
    const regionsRef = useRef<RegionsPlugin | null>(null);

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

    const drawBpmMarkers = useCallback(() => {
        if (!regionsRef.current) {
            regionsRef.current = RegionsPlugin.create();
        }

        if (!wavesurferRef.current) return;
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

        if (isPlaying) {
            wavesurferRef.current.pause();
        } else {
            wavesurferRef.current.play();
        }

        setIsPlaying(v => !v);
    }, [ isPlaying, setIsPlaying, isLoaded ]);

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

        wavesurferRef.current.load(audioUrl);

        return () => {
            wavesurferRef.current?.destroy();
            setIsLoaded(false);
        };
    }, [audioUrl, bpm, offset]);

    return (
        <Card className="">
            <CardHeader className="flex justify-around pb-0">
                <div className="flex gap-2">
                    <Button isIconOnly disabled={ !isLoaded }><Icon24SkipPrevious /></Button>
                    <Button isIconOnly disabled={ !isLoaded }><Icon24SkipBack /></Button>
                    <Button isIconOnly disabled={ !isLoaded } onPress={ playPauseButtonHandler } color={ isPlaying ? "primary" : "default" }>
                        { isPlaying ? <Icon24Pause /> : <Icon24Play /> }
                    </Button>
                    <Button isIconOnly disabled={ !isLoaded }><Icon24SkipForward /></Button>
                    <Button isIconOnly disabled={ !isLoaded }><Icon24SkipNext /></Button>
                </div>
            </CardHeader>
            <CardBody>
                <div ref={waveformRef} />
            </CardBody>
        </Card>
    )
}