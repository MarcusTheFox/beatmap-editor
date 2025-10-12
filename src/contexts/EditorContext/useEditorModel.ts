import { WaveSurferControls } from "@/sections/TimelineSection/WaveSurferComponent/useWaveSurfer";
import { Model, useModel } from "@/shared/lib/useModel";
import { Level } from "@/types";

export type EditorModel = Model<{controls: WaveSurferControls} & Level>;

export const useEditorModel = (): EditorModel => {
    return useModel();
}