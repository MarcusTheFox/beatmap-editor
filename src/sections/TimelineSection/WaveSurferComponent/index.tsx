import { minimapOptions, regionOptions, wavesurferOptions } from "@/config/wavesurfer";
import { convertBeatsToTime, convertTimeToBeats, getFirstBeatTime, getNextBeatTime, getPreviousBeatTime } from "@/utils";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import WaveSurfer from "wavesurfer.js";
import MinimapPlugin from "wavesurfer.js/dist/plugins/minimap.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.js";

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
}

export interface WaveSurferComponentRef {
    play: () => void,
    pause: () => void,
    togglePlay: () => void,
    next: () => void,
    previous: () => void,
    start: () => void,
    end: () => void,
    isPlaying: () => boolean,
    getDuration: () => number,
    getTime: () => number,
    getBeat: () => number,
    setBeat: (value: number) => void,
}

export type WaveSurferComponentProps = WaveSurferComponentOptions & Partial<WaveSurferComponentEvents>;

const getTotalBeats = (waveSurfer: WaveSurfer, bpm: number, offset: number) => {
    const duration = waveSurfer.getDuration() - offset;
    return Math.round(duration / (60 / bpm));
}

export const WaveSurferComponent = forwardRef<WaveSurferComponentRef, WaveSurferComponentProps>((props, ref) => {
    const {
        audioUrl,
        bpm,
        offset,
        onReady,
        onPlay,
        onPause,
        onFinish,
        onTimeUpdate
    } = props;

    const waveformRef = useRef<HTMLDivElement>(null);

    const regionsPlugin = RegionsPlugin.create();
    const minimapPlugin = MinimapPlugin.create({ ...minimapOptions, container: "#minimapContainer" });
    let waveSurfer: WaveSurfer;

    const drawBpmMarkers = () => {
        regionsPlugin.clearRegions();
        const totalBeats = getTotalBeats(waveSurfer, bpm, offset)
        for (let index = 0; index <= totalBeats; index++) {
            regionsPlugin.addRegion({
                start: 60 / bpm * index + offset,
                id: index.toString(),
                ...regionOptions
            });
        }
    };

    useEffect(() => {
        waveSurfer.load(audioUrl);
    }, [audioUrl]);

    useEffect(() => {
        drawBpmMarkers();
    }, [bpm, offset]);

    const getDuration = () => {
        return waveSurfer.getDuration();
    }

    const getTime = () => {
        return waveSurfer.getCurrentTime();
    }

    const getBeat = () => {
        return convertTimeToBeats(waveSurfer.getCurrentTime(), bpm, offset);
    }

    const isPlaying = () => {
        return waveSurfer.isPlaying();
    }

    const play = () => {
        waveSurfer.play();
    }

    const pause = () => {
        waveSurfer.pause();
    }

    const togglePlay = () => {
        if (isPlaying()) pause();
        else play();
    }

    const next = () => {
        const current = waveSurfer.getCurrentTime();
        const duration = getDuration();

        if (current === duration) return;
        if (current < offset) {
            waveSurfer.setTime(offset);
            return;
        }
        
        const time = getNextBeatTime(current, duration, bpm, offset);
        waveSurfer.setTime(time);
    }

    const previous = () => {
        const current = waveSurfer.getCurrentTime();
        if (current === 0) return;

        const currentBeat = convertTimeToBeats(current, bpm, offset);
        if (currentBeat === 0) {
            waveSurfer.setTime(0);
            return;
        }

        const time = getPreviousBeatTime(current, bpm, offset);
        waveSurfer.setTime(time);
    }

    const start = () => {
        const current = waveSurfer.getCurrentTime();
        if (current === 0) return;

        const currentBeat = convertTimeToBeats(current, bpm, offset);
        if (currentBeat === 0) {
            waveSurfer.setTime(0);
            return;
        }

        const time = getFirstBeatTime(bpm, offset);
        waveSurfer.setTime(time);
    }

    const end = () => {
        const current = waveSurfer.getCurrentTime();
        const duration = getDuration();
        if (current === duration) return;

        waveSurfer.setTime(duration);
    }

    const setBeat = (value: number) => {
        const beatTime = convertBeatsToTime(value, bpm, offset);
        const duration = getDuration();

        const time = Math.max(Math.min(beatTime, duration), 0);
        waveSurfer.setTime(time);
    }

    useEffect(() => {
        if (!waveformRef.current) return;

        waveSurfer = WaveSurfer.create({
            container: waveformRef.current,
            ...wavesurferOptions,
            plugins: [ regionsPlugin, minimapPlugin ]
        });
        
        if (onReady) waveSurfer.on("ready", onReady);
        if (onPlay) waveSurfer.on("play", onPlay);
        if (onPause) waveSurfer.on("pause", onPause);
        if (onFinish) waveSurfer.on("finish", onFinish);
        if (onTimeUpdate) waveSurfer.on("timeupdate", onTimeUpdate);
    }, [waveformRef]);

    useEffect(() => {
        return () => {
            regionsPlugin.clearRegions();
            waveSurfer.unregisterPlugin(regionsPlugin);
            waveSurfer.unregisterPlugin(minimapPlugin);
            waveSurfer.unAll();
            waveSurfer.empty();
            waveSurfer.destroy();
        };
    }, []);

    useImperativeHandle(ref, () => ({
        play,
        pause,
        togglePlay,
        next,
        previous,
        start,
        end,
        isPlaying,
        getDuration,
        getTime,
        getBeat,
        setBeat,
    }), []);

    return (
        <>
            <div ref={waveformRef} id="waveform" />
            <div id="minimapContainer" />
        </>
    )
});