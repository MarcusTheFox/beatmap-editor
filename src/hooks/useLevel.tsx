import { LevelContext } from "@/contexts/LevelContext";
import { useContext } from "react";

export const useLevel = () => {
    const context = useContext(LevelContext);
    if (!context) {
        throw new Error('useAudio must be used within LevelProvider');
    }

    return {
        bpm: context.bpm,
        power: context.power,
        offset: context.offset,

        setBpm: context.setBpm,
        setPower: context.setPower,
        setOffset: context.setOffset,
    };
}