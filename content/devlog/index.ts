import { VersionLog as Log1 } from "./v0.1.0-alpha";
import { VersionLog as Log2 } from "./v0.2.0-alpha";

export type VersionLogType = {
    title: string,
    date: Date,
    body: React.ReactNode
    highlights: string[]
}

export const DevLog: Record<string, VersionLogType> = {
    "0.2.0-alpha": Log2,
    "0.1.0-alpha": Log1,
}