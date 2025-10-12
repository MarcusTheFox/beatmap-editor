export const formatTime = (seconds: number): string => {
    const mins = Math.max(Math.floor(seconds / 60), 0);
    const secs = Math.max(Math.floor(seconds % 60), 0);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const convertTimeToBeats = (time: number, bpm: number, offset: number = 0) => {
    if (time < offset) return 0;

    const timeInSong = time - offset;
    const beatsPerSecond = bpm / 60;
    return Math.round(timeInSong * beatsPerSecond * 1000) / 1000;
};

export const convertBeatsToTime = (beat: number, bpm: number, offset: number = 0) => {
    const beatsPerSecond = bpm / 60;
    const timeInSong = beat / beatsPerSecond;
    return timeInSong + offset;
};

export const getNextBeatTime = (time: number, duration: number, bpm: number, offset: number = 0) => {
    const beat = convertTimeToBeats(time, bpm, offset);
    return Math.min(convertBeatsToTime(Math.floor(beat) + 1, bpm, offset), duration)
}

export const getPreviousBeatTime = (time: number, bpm: number, offset: number = 0) => {
    const beat = convertTimeToBeats(time, bpm, offset);
    return Math.max(convertBeatsToTime(Math.ceil(beat) - 1, bpm, offset), 0);
}

export const getFirstBeatTime = (bpm: number, offset: number) => {
    return convertBeatsToTime(0, bpm, offset);
}

export const getTotalBeats = (duration: number, bpm: number, offset: number) => {
    const beatsDuration = duration - offset;
    return Math.round(beatsDuration / (60 / bpm));
}