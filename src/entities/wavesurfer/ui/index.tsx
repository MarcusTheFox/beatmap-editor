import { minimapOptions, regionOptions, wavesurferOptions } from "@/shared/config";
import { getTotalBeats } from "@/shared/lib";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import WaveSurfer from "wavesurfer.js";
import MinimapPlugin from "wavesurfer.js/dist/plugins/minimap.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.js";
import { useWaveSurfer, WaveSurferControls } from "../model/useWaveSurfer";

interface WaveSurferComponentOptions {
    audioUrl: string;
    bpm: number;
    offset: number;
}

interface WaveSurferComponentEvents {
    onReady: () => void;
    onPlay: () => void;
    onPause: () => void;
    onFinish: () => void;
    onTimeUpdate: (time: number) => void;
    onControlsUpdate: (controls: WaveSurferControls) => void;
}

export interface WaveSurferComponentRef {
    getControls: () => WaveSurferControls | undefined;
}

type WaveSurferComponentProps = WaveSurferComponentOptions & Partial<WaveSurferComponentEvents>;

export const WaveSurferComponent = forwardRef<WaveSurferComponentRef, WaveSurferComponentProps>((props, ref) => {
    const waveSurfer = useWaveSurfer(props.bpm, props.offset);

    const waveSurferRef = useRef<WaveSurfer | undefined>();
    const waveSurferControlsRef = useRef<WaveSurferControls | undefined>();
    const regionsPluginRef = useRef<RegionsPlugin>(RegionsPlugin.create());

    const drawBpmMarkers = () => {
        const controls = getControls();
        const regionsPlugin = regionsPluginRef.current;
        if (!controls) return;

        regionsPlugin.clearRegions();
        const totalBeats = getTotalBeats(controls.getDuration(), props.bpm, props.offset)
        for (let index = 0; index <= totalBeats; index++) {
            regionsPlugin.addRegion({
                start: 60 / props.bpm * index + props.offset,
                id: index.toString(),
                ...regionOptions
            });
        }
    };
    
    const getControls = (): WaveSurferControls | undefined => {
        return waveSurferControlsRef.current
    }

    useEffect(() => {
        const minimapPlugin = MinimapPlugin.create({ ...minimapOptions, container: "#minimapContainer" });
        waveSurferRef.current = WaveSurfer.create({
            container: "#waveform",
            ...wavesurferOptions,
            plugins: [ regionsPluginRef.current, minimapPlugin ]
        });

        const waveSurferInstance = waveSurferRef.current;
        waveSurferRef.current.load(props.audioUrl);

        const onReady = () => {
            waveSurferControlsRef.current = waveSurfer.set(waveSurferInstance);
            drawBpmMarkers();
            if (props.onReady) props.onReady();
        }
        
        waveSurferRef.current.on("ready", onReady);
        if (props.onPlay) waveSurferRef.current.on("play", props.onPlay);
        if (props.onPause) waveSurferRef.current.on("pause", props.onPause);
        if (props.onFinish) waveSurferRef.current.on("finish", props.onFinish);
        if (props.onTimeUpdate) waveSurferRef.current.on("timeupdate", props.onTimeUpdate);

        return () => {
            regionsPluginRef.current.clearRegions();
            if (waveSurferRef.current) {
                waveSurferRef.current.unregisterPlugin(regionsPluginRef.current);
                waveSurferRef.current.unregisterPlugin(minimapPlugin);
                waveSurferRef.current.unAll();
                waveSurferRef.current.empty();
                waveSurferRef.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        const waveSurferInstance = waveSurferRef.current;
        if (!waveSurferInstance) return;

        const newControls = waveSurfer.set(waveSurferInstance)
        waveSurferControlsRef.current = newControls;

        if (props.onControlsUpdate) {
            props.onControlsUpdate(newControls);
        }

        drawBpmMarkers();
    }, [props.bpm, props.offset]);

    useImperativeHandle(ref, () => ({
        getControls
    }), []);

    return (
        <>
            <div id="waveform" />
            <div id="minimapContainer" />
        </>
    )
});