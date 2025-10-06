import { LevelContext } from "@/contexts/LevelContext";
import { useCallback, useContext } from "react";

export const useLevel = () => {
    const context = useContext(LevelContext);
    if (!context) {
        throw new Error('useAudio must be used within LevelProvider');
    }
    
    const convertTimeToBeats = useCallback((time: number) => {
        if (time < context.offset) return 0;

        const timeInSong = time - context.offset;
        const beatsPerSecond = context.bpm / 60;
        return Math.round(timeInSong * beatsPerSecond * 1000) / 1000;
    }, [ context ]);

    const convertBeatsToTime = useCallback((beat: number): number => {
        const beatsPerSecond = context.bpm / 60;
        const timeInSong = beat / beatsPerSecond;
        return timeInSong + context.offset;
    }, [ context ]);

    const setPlay = useCallback(() => {
        context.setIsPlaying(true);
    }, []);

    const setPause = useCallback(() => {
        context.setIsPlaying(false);
    }, []);
    
    const setTime = (time: number) => {
        context.setCurrentTime(time);
        context.setCurrentBeat(convertTimeToBeats(time));
    };

    return {
        bpm: context.bpm,
        power: context.power,
        offset: context.offset,
        currentTime: context.currentTime,
        currentBeat: context.currentBeat,
        isPlaying: context.isPlaying,

        setBpm: context.setBpm,
        setPower: context.setPower,
        setOffset: context.setOffset,
        setPlay,
        setPause,
        setTime,
        convertTimeToBeats,
        convertBeatsToTime,
    };
}