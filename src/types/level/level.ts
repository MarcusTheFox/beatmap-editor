import { Beatmap, SongPackage } from "..";

export interface Level extends SongPackage {
    audioFile: File,
    beatmap: Beatmap
}