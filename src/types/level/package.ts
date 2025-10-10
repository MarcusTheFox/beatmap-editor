import { AudioInfo, LevelInfo } from "..";

export interface SongPackage {
    id: SongID,
    audioInfo: AudioInfo,
    levelInfo: LevelInfo
}

export type SongID = `${string} - ${string}`;