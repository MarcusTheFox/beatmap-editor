import { convertBeatsToTime, convertTimeToBeats, getFirstBeatTime, getNextBeatTime, getPreviousBeatTime } from "@/shared/lib";
import { useCallback } from "react";
import WaveSurfer from "wavesurfer.js"

export const useWaveSurfer = (bpm: number, offset: number) => {
    const set = useCallback((waveSurfer: WaveSurfer) => {
        const getDuration = () => waveSurfer.getDuration();
        const getTime = () => waveSurfer.getCurrentTime();
        const getBeat = () => convertTimeToBeats(getTime(), bpm, offset);

        const setTime = (time: number) => waveSurfer.setTime(time);
        const setBeat = (beat: number) => {
            const beatTime = convertBeatsToTime(beat, bpm, offset);
            const duration = getDuration();
            const time = Math.max(Math.min(beatTime, duration), 0);
            setTime(time);
        }

        const isPlaying = () => waveSurfer.isPlaying();

        const play = () => waveSurfer.play();
        const pause = () => waveSurfer.pause();
        const playPause = () => waveSurfer.playPause();

        const next = () => {
            const current = getTime();
            const duration = getDuration();

            if (current === duration) return;
            if (current < offset) {
                setTime(offset);
                return;
            }

            const time = getNextBeatTime(current, duration, bpm, offset);
            setTime(time);
        }

        const previous = () => {
            const current = getTime();
            if (current === 0) return;

            const currentBeat = convertTimeToBeats(current, bpm, offset);
            if (currentBeat === 0) {
                setTime(0);
                return;
            }

            const time = getPreviousBeatTime(current, bpm, offset);
            setTime(time);
        }

        const start = () => {
            const current = getTime();
            if (current === 0) return;

            const currentBeat = convertTimeToBeats(current, bpm, offset);
            if (currentBeat === 0) {
                setTime(0);
                return;
            }

            const time = getFirstBeatTime(bpm, offset);
            setTime(time);
        }

        const end = () => {
            const current = getTime();
            const duration = getDuration();
            if (current === duration) return;
            setTime(duration);
        }

        return {
            getDuration,
            getTime,
            getBeat,

            setTime,
            setBeat,

            isPlaying,

            play,
            pause,
            playPause,

            next,
            previous,
            start,
            end
        }
    }, [bpm, offset]);

    return { set };
}

export type WaveSurferControls = ReturnType<ReturnType<typeof useWaveSurfer>["set"]>;