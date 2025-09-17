import { useAudio } from "@/hooks/useAudio";
import { Card, CardBody } from "@heroui/card";
import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import Minimap from 'wavesurfer.js/dist/plugins/minimap.esm.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js'

export function TimelineSection() {
    const { audioUrl } = useAudio();
    const waveformRef = useRef<HTMLDivElement>(null);
    const wavesurferRef = useRef<WaveSurfer | null>(null);

    const colorSchemes = [
        {
            waveColor: ['rgb(100, 100, 100)'],
            progressColor: ['rgb(0, 200, 255)', 'rgb(0, 100, 255)'],
            regionColors: ["#ffffff30", "#ffffff15"],
            minimapProgress: "#3b82f6",
        }
    ];
    
    const colorScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];

    useEffect(() => {
        if (!waveformRef.current) return;
        const BPM = 88;
        const offset = 11.2;
        const regions = RegionsPlugin.create();
        const minimap = Minimap.create({
            height: 20,
            dragToSeek: true,
            progressColor: colorScheme.minimapProgress,
        });

        wavesurferRef.current = WaveSurfer.create({
            container: waveformRef.current,
            autoCenter: true,
            autoScroll: true,
            hideScrollbar: true,
            autoplay: true,
            minPxPerSec: 100,
            sampleRate: 16000,
            barWidth: 3,
            barRadius: 5,
            barGap: 1,
            barAlign: "bottom",
            waveColor: colorScheme.waveColor,
            progressColor: colorScheme.progressColor,
            cursorColor: "#ff8a00",
            cursorWidth: 3,
            plugins: [ regions, minimap ],
        });

        wavesurferRef.current.on('ready', () => {
            if (!wavesurferRef.current) return;
            const duration = wavesurferRef.current.getDuration() - offset;
            const totalBeats = Math.round(duration / (60 / BPM / 4));
            for (let index = 0; index < totalBeats; index++) {
                regions.addRegion({
                    start: 60 / BPM / 4 * index + offset,
                    color: index % 4 === 0 ? colorScheme.regionColors[0] : colorScheme.regionColors[1],
                    resize: false,
                    drag: false,
                    minLength: 1,
                    id: index.toString(),
                    contentEditable: false,
                    channelIdx: 3,
                });
            }
        })

        wavesurferRef.current.load(audioUrl);

        return () => {
            wavesurferRef.current?.destroy();
        };
    }, [audioUrl]);

    return (
        <Card className="">
            <CardBody>
                <div ref={waveformRef} />
            </CardBody>
        </Card>
    )
}