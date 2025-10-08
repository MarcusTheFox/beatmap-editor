import { InfoJson, LevelData } from "@/types";
import JSZip from "jszip";

export const useZip = () => {
    const importZip = async(file: File): Promise<LevelData> => {
        if (!file) {
            return Promise.reject(new Error("Файл не предоставлен"));
        }

        const zipFile = await JSZip.loadAsync(file);

        const infoFile = zipFile.file('info.json');
        if (!infoFile) {
            throw new Error("Файл info.json не найден");
        }

        const infoContent = await infoFile.async('string');
        const infoJson = JSON.parse(infoContent) as InfoJson;
        
        const audioFileName = infoJson.audioFile;
        const audioZipFile = zipFile.file(audioFileName);
        if (!audioZipFile) {
            throw new Error("Аудио файл не найден.\nВозможно он отсутствует или не указан в info.json");
        }

        const audioBlob = await audioZipFile.async("blob");
        const audioFileObject = new File([audioBlob], infoJson.audioFile, { type: 'audio/wav' });
        
        const beatmapFileName = infoJson.beatmapFile || "beatmap.json";
        const beatmapFile = zipFile.file(beatmapFileName);
        if (!beatmapFile) {
            throw new Error("Файл карты битов не найден");
        }
        
        const beatmapContent = await beatmapFile.async("string");
        const beatmapJson = JSON.parse(beatmapContent);

        return {
            info: infoJson,
            audioFile: audioFileObject,
            beatmap: beatmapJson
        }
    }

    return {
        importZip
    }
}