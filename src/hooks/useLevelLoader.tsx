import { Beatmap, Level, Note } from "@/types";
import { useAudio } from "./useAudio";
import { useNote } from "./useNote";
import { useTimelineSettings } from "@/contexts/TimelineSettingsContext";
import { useLevelProperties } from "@/contexts/LevelProperties";

const levelSettingsDefaults = {
  timeline: {
    bpm: 120,
    offset: 0
  },
  properties: {
    power: 1500
  }
}

export const useLevelLoader = () => {
  const { setTimelineSettings } = useTimelineSettings();
  const { setLevelProperties } = useLevelProperties();
  const audio = useAudio();
  const notes = useNote();

  const makeNotes = (beatmap: Beatmap): Note[] => {
    const noteArray: Note[] = [];
    beatmap.notes.map((note: Note) => {
      const newNote: Note = {
        ...note,
        properties: {
          power: note.properties?.power || beatmap.settings.properties.power || levelSettingsDefaults.properties.power
        }
      }
      noteArray.push(newNote);
    });
    return noteArray;
  }

  const load = (data: Level) => {
    setTimelineSettings({
      bpm: data.beatmap.settings.bpm || levelSettingsDefaults.timeline.bpm,
      offset: data.beatmap.settings.offset || levelSettingsDefaults.timeline.offset
    });
    const levelProperties = data.beatmap.settings.properties || levelSettingsDefaults.properties;
    setLevelProperties({ ...levelProperties });
    notes.set(makeNotes(data.beatmap));
    audio.setAudio(data.audioFile);
  }

  const create = (audioFile: File) => {
    setTimelineSettings({ ...levelSettingsDefaults.timeline })
    setLevelProperties({ ...levelSettingsDefaults.properties });
    notes.clear();
    audio.setAudio(audioFile);
  }

  return {
    load,
    create
  }
}