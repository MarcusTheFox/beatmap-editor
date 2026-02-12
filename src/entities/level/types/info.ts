export interface LevelInfo {
    authors: string[],
    version: string,
    difficulty: DifficultyName
}

export type DifficultyName = "Easy" | "Normal" | "Hard" | "Expert";
