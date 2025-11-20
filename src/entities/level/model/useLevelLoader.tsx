"use client"

import { useAudio } from "@/src/entities/audio";
import { useLevelMetadata, useLevelProperties, useTimelineSettings } from ".";
import { AudioInfo, Beatmap, Level, LevelInfo, TimelineSettings } from "../types";
import { Note, NoteProperties, useNote } from "@/src/entities/note";

interface LevelDefaults {
  audioInfo: AudioInfo;
  levelInfo: LevelInfo;
  timeline: TimelineSettings;
  properties: NoteProperties;
}

const levelDefaults: LevelDefaults = {
  audioInfo: {
    title: "Song title",
    artist: "Song artist"
  },
  levelInfo: {
    authors: [],
    difficulty: "Normal",
    version: "0.0.0"
  },
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
  const { setMetadata } = useLevelMetadata();
  const audio = useAudio();
  const notes = useNote();

  const makeNotes = (beatmap: Beatmap): Note[] => {
    const noteArray: Note[] = [];
    beatmap.notes.map((note: Note) => {
      const newNote: Note = { ...note };
      noteArray.push(newNote);
    });
    return noteArray;
  }

  const load = (data: Level) => {
    const bpm = data.beatmap.settings.bpm;
    const offset = data.beatmap.settings.offset;
    setTimelineSettings({ bpm, offset });

    const levelProperties = data.beatmap.settings.properties || levelDefaults.properties;
    setLevelProperties({ ...levelProperties });

    setMetadata({ ...data.audioInfo, ...data.levelInfo });
    notes.set(makeNotes(data.beatmap));
    audio.setAudio(data.audioFile);
  }

  const create = (audioFile: File) => {
    setTimelineSettings({ ...levelDefaults.timeline });
    setLevelProperties({ ...levelDefaults.properties });
    setMetadata({ ...levelDefaults.audioInfo, ...levelDefaults.levelInfo });
    notes.clear();
    audio.setAudio(audioFile);
  }

  return {
    load,
    create
  }
}