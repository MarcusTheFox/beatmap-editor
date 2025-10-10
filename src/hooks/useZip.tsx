import { Beatmap, Level, SongPackage } from "@/types";
import JSZip from "jszip";

export const useZip = () => {
    const importZip = async(file: File): Promise<Level> => {
        if (!file) {
            return Promise.reject(new Error("Файл не предоставлен"));
        }

        const zipFile = await JSZip.loadAsync(file);

        const infoFile = zipFile.file('info.json');
        if (!infoFile) {
            throw new Error("Файл info.json не найден");
        }

        const infoContent = await infoFile.async('string');
        const infoJson = JSON.parse(infoContent) as SongPackage;
        
        const audioFileName = infoJson.audioInfo.fileName;
        const audioZipFile = zipFile.file(audioFileName);
        if (!audioZipFile) {
            throw new Error("Аудио файл не найден.\nВозможно он отсутствует или не указан в info.json");
        }

        const audioBlob = await audioZipFile.async("blob");
        const audioFile = new File([audioBlob], audioFileName, { type: 'audio/wav' });
        
        const beatmapFileName = infoJson.levelInfo.beatmapFileName || "beatmap.json";
        if (!beatmapFileName.endsWith('.json')) {
            throw new Error("Неверный формат файла карты битов.\nИспользуйте формат JSON");
        }
        const beatmapFile = zipFile.file(beatmapFileName);
        if (!beatmapFile) {
            throw new Error("Файл карты битов не найден");
        }
        
        const beatmapContent = await beatmapFile.async("string");
        const beatmap = JSON.parse(beatmapContent) as Beatmap;

        return {
            ...infoJson,
            audioFile,
            beatmap
        }
    }

    const exportZip = async(level: Level): Promise<boolean> => {
        console.log(level)
        return true;
    }

    return {
        importZip,
        exportZip
    }
}