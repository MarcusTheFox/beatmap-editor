import { BeatmapJson, BeatmapNote, BeatmapSettings, LevelData, Note } from "@/types";
import { useAudio } from "./useAudio";
import { useLevel } from "./useLevel";
import { useNote } from "./useNote";

const levelSettingsDefaults: BeatmapSettings = {
  bpm: 120,
  offset: 0,
  power: 1500
}

export const useLevelLoader = () => {
  const level = useLevel();
  const audio = useAudio();
  const notes = useNote();

  const makeNotes = (beatmap: BeatmapJson): Note[] => {
      const noteArray: Note[] = [];
      beatmap.notes.map((note: BeatmapNote) => {
          const newNote: Note = {
              pos: {
                  beat: note.beat,
                  id: note.id
              },
              properties: {
                  power: note.power || beatmap.settings.power || levelSettingsDefaults.power
              }
          }
          noteArray.push(newNote);
      });
      return noteArray;
  }

  const load = (data: LevelData) => {
    level.setBpm(data.beatmap.settings.bpm || data.info.bpm || levelSettingsDefaults.bpm );
    level.setOffset(data.beatmap.settings.offset || levelSettingsDefaults.offset);
    level.setPower(data.beatmap.settings.power || levelSettingsDefaults.power);
    notes.set(makeNotes(data.beatmap));
    audio.setAudio(data.audioFile);
  }

  const create = (audioFile: File) => {
    level.setBpm(levelSettingsDefaults.bpm);
    level.setOffset(levelSettingsDefaults.offset);
    level.setPower(levelSettingsDefaults.power);
    notes.clear();
    audio.setAudio(audioFile);
  }

  return {
    load,
    create
  }
}