"use client";

import { useState } from "react";
import { WaveSurferControls } from "./useWaveSurfer";

interface TimelineStateProps {
    setControls: ( controls: WaveSurferControls | null ) => void;
    setIsPlaying: ( playing: boolean ) => void;
    setCurrentTime: ( time: number ) => void;
}

export const useTimelineState = ( props: TimelineStateProps ) => {
    const { setControls, setIsPlaying, setCurrentTime } = props;
    const [ loading, setLoading ] = useState<boolean>( false );

    const onReady = ( controls: WaveSurferControls ) => {
        setControls( controls );
        setIsPlaying( controls.isPlaying());
        setLoading( false );
    };

    const onTimeUpdate = ( time: number ) => {
        setCurrentTime( time );
    };

    const onPlayPause = ( playing: boolean ) => {
        setIsPlaying( playing );
    };

    return {
        loading,

        onReady,
        onTimeUpdate,
        onPlayPause,
    };
};
