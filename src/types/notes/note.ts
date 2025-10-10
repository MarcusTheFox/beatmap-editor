export interface Note extends NotePosition {
    properties?: Partial<NoteProperties>
}

export interface NotePosition {
    beat: number,
    id: number
}

export type NotePositionKey = `${number}-${number}`;

export interface NoteProperties {
    power: number
}