import { AudioInfo } from "./audio";
import { LevelInfo } from "./info";

export interface PackageAudioInfo extends AudioInfo {
    fileName: string
}

export interface PackageLevelInfo extends LevelInfo {
    beatmapFileName: string
}

export interface SongPackage {
    id: SongID,
    audioInfo: PackageAudioInfo,
    levelInfo: PackageLevelInfo
}

export type SongID = `${string} - ${string}`;