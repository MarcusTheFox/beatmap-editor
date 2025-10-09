export interface Note {
    position: NotePosition,
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