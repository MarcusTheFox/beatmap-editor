import { LevelContext } from "@/contexts/LevelContext";
import { convertTimeToBeats } from "@/utils";
import { useCallback, useContext, useEffect } from "react";

export const useLevel = () => {
    const context = useContext(LevelContext);
    if (!context) {
        throw new Error('useAudio must be used within LevelProvider');
    }

    useEffect(() => {
        return () => {
            setPause();
            setTime(0);
        }
    }, []);

    const setPlay = useCallback(() => {
        context.setIsPlaying(true);
    }, []);

    const setPause = useCallback(() => {
        context.setIsPlaying(false);
    }, []);
    
    const setTime = (time: number) => {
        context.setCurrentTime(time);
        context.setCurrentBeat(convertTimeToBeats(time, context.bpm, context.offset));
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
    };
}