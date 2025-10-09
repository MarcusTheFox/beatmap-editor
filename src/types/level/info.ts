export interface LevelInfo {
    authors: string[],
    version: string,
    difficulty: DifficultyName,
    beatmapFileName: string
}

export type DifficultyName = "Easy" | "Normal" | "Hard" | "Expert";