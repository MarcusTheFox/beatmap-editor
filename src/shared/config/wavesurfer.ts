import { WaveSurferOptions } from "wavesurfer.js";
import { MinimapPluginOptions } from "wavesurfer.js/dist/plugins/minimap.js";
import { RegionParams } from "wavesurfer.js/dist/plugins/regions.js";

const colorScheme = {
  waveColor: ["rgb(150, 150, 150)", "rgb(100, 100, 100)"],
  progressColor: ["rgb(0, 200, 255)", "rgb(0, 100, 255)"],
  cursorColor: "#ff8a00",
  regionColors: "hsl(var(--heroui-default-600) / 0.5)",
  minimapProgress: "#3b82f6",
};

export const wavesurferOptions: Partial<WaveSurferOptions> = {
  autoCenter: true,
  autoScroll: true,
  hideScrollbar: true,
  minPxPerSec: 100,
  sampleRate: 16000,
  barWidth: 3,
  barRadius: 5,
  barGap: 1,
  barAlign: "bottom",
  waveColor: colorScheme.waveColor,
  progressColor: colorScheme.progressColor,
  cursorColor: colorScheme.cursorColor,
  cursorWidth: 3,
};

export const regionOptions: Partial<RegionParams> = {
  color: colorScheme.regionColors,
  resize: false,
  drag: false,
  minLength: 1,
  contentEditable: false,
  channelIdx: 3,
};

export const minimapOptions: Partial<MinimapPluginOptions> = {
  height: 20,
  dragToSeek: true,
  progressColor: colorScheme.minimapProgress,
};
