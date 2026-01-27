"use client"

import { WaveSurferControls } from "./useWaveSurfer";
import { createWheelShortcut, useShortcuts } from "@/src/shared/lib/utils/hotkeys";

export const usePlaybackControls = (controls: WaveSurferControls | null) => {
    const playPause = () => controls?.playPause();
    const nextBeat = () => controls?.next();
    const prevBeat = () => controls?.previous();
    const toStart = () => controls?.start();
    const toEnd = () => controls?.end();
    const toStep = (step: number) => controls?.step(step);
    const toBeat = (beat: number) => controls?.setBeat(beat);
    const getDuration = () => controls?.getDuration() || 0;

    useShortcuts([
        createWheelShortcut("up", nextBeat),
        createWheelShortcut("down", prevBeat),
        createWheelShortcut("up", () => toStep(0.5), { shift: true }),
        createWheelShortcut("down", () => toStep(-0.5), { shift: true }),
        createWheelShortcut("up", () => toStep(0.25), { ctrl: true }),
        createWheelShortcut("down", () => toStep(-0.25), { ctrl: true }),
        createWheelShortcut("up", () => toStep(0.125), { alt: true }),
        createWheelShortcut("down", () => toStep(-0.125), { alt: true }),
    ]);

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