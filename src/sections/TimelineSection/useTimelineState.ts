import { useState } from "react";
import { WaveSurferControls } from "./WaveSurferComponent/useWaveSurfer"

export const useTimelineState = (setControls: (controls: WaveSurferControls) => void) => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ currentTime, setCurrentTime ] = useState<number>(0);
    const [ isPlaying, setIsPlaying ] = useState<boolean>(false);

    const onReady = (controls: WaveSurferControls) => {
        setControls(controls);
        setIsPlaying(controls.isPlaying());
        setLoading(false);
    }

    const onTimeUpdate = (time: number) => {
        setCurrentTime(time);
    }

    const onPlayPause = (playing: boolean) => {
        setIsPlaying(playing);
    }

    return {
        loading,
        currentTime,
        isPlaying,

        onReady,
        onTimeUpdate,
        onPlayPause
    }
}