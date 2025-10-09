import { AudioInfo, Beatmap, LevelInfo } from "..";

export interface Level {
    levelInfo: LevelInfo,
    audioInfo: AudioInfo,
    audioFile: File,
    beatmap: Beatmap
}