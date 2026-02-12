import { Beatmap } from "./beatmap";
import { SongPackage } from "./package";

export interface Level extends SongPackage {
    audioFile: File,
    beatmap: Beatmap
}
