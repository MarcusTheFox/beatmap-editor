import { Beatmap, BeatmapSettings, Level, Note } from "@/types";
import { useAudio } from "./useAudio";
import { useLevel } from "./useLevel";
import { useNote } from "./useNote";

const levelSettingsDefaults: BeatmapSettings = {
  bpm: 120,
  offset: 0,
  properties: {
    power: 1500
  }
}

export const useLevelLoader = () => {
  const level = useLevel();
  const audio = useAudio();
  const notes = useNote();

  const makeNotes = (beatmap: Beatmap): Note[] => {
      const noteArray: Note[] = [];
      beatmap.notes.map((note: Note) => {
          const newNote: Note = {
              position: {
                  ...note.position
              },
              properties: {
                  power: note.properties?.power || beatmap.settings.properties.power || levelSettingsDefaults.properties.power
              }
          }
          noteArray.push(newNote);
      });
      return noteArray;
  }

  const load = (data: Level) => {
    level.setBpm(data.beatmap.settings.bpm || levelSettingsDefaults.bpm );
    level.setOffset(data.beatmap.settings.offset || levelSettingsDefaults.offset);
    level.setPower(data.beatmap.settings.properties.power || levelSettingsDefaults.properties.power);
    notes.set(makeNotes(data.beatmap));
    audio.setAudio(data.audioFile);
  }

  const create = (audioFile: File) => {
    level.setBpm(levelSettingsDefaults.bpm);
    level.setOffset(levelSettingsDefaults.offset);
    level.setPower(levelSettingsDefaults.properties.power);
    notes.clear();
    audio.setAudio(audioFile);
  }

  return {
    load,
    create
  }
}