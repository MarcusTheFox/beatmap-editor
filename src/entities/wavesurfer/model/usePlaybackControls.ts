"use client"

import { WaveSurferControls } from "./useWaveSurfer";

export const usePlaybackControls = (controls: WaveSurferControls | null) => {
    const playPause = () => controls?.playPause();
    const nextBeat = () => controls?.next();
    const prevBeat = () => controls?.previous();
    const toStart = () => controls?.start();
    const toEnd = () => controls?.end();
    const toStep = (step: number) => controls?.step(step);
    const toBeat = (beat: number) => controls?.setBeat(beat);
    const getDuration = () => controls?.getDuration() || 0;

    return {
        playPause,
        nextBeat,
        prevBeat,
        toStart,
        toEnd,
        toStep,
        toBeat,
        getDuration
    }
}