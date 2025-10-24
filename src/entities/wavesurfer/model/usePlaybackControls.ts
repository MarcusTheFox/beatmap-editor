"use client"

import { useEffect } from "react";
import { WaveSurferControls } from "./useWaveSurfer";

export const usePlaybackControls = (controls: WaveSurferControls | null) => {
    const playPause = () => controls?.playPause();
    const nextBeat = () => controls?.next();
    const prevBeat = () => controls?.previous();
    const toStart = () => controls?.start();
    const toEnd = () => controls?.end();

    useEffect(() => {
        const wheelContainer = document.getElementById("main-container");
        const timelineContainer = document.getElementById("timeline-container");
        if (!wheelContainer || !timelineContainer || !controls) return;

        const handleWheel = (event: WheelEvent) => {
            event.preventDefault();
            const delta = Math.sign(event.deltaY);
            if (delta > 0) prevBeat();
            else nextBeat();
        };

        const handleCardWheel = (event: WheelEvent) => handleWheel(event);
        wheelContainer.addEventListener('wheel', handleCardWheel, { passive: false });
        timelineContainer.addEventListener('wheel', handleCardWheel, { passive: false });

        return () => {
            wheelContainer.removeEventListener('wheel', handleCardWheel);
            timelineContainer.removeEventListener('wheel', handleCardWheel);
        }
    }, [controls]);

    return {
        playPause,
        nextBeat,
        prevBeat,
        toStart,
        toEnd
    }
}