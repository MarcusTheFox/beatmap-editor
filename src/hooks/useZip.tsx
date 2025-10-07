import { BeatmapJson, InfoJson } from "@/types";
import JSZip from "jszip";
import { useState } from "react";

export const useZip = () => {
    const [ info, setInfo ] = useState<InfoJson | null>(null);
    const [ audioFile, setAudioFile ] = useState<File | null>(null);
    const [ beatmap, setBeatmap ] = useState<BeatmapJson | null>(null);

    const [ error, setError ] = useState<string>('');
    const [ loading, setLoading ] = useState<boolean>(false);

    const importZip = async(file: File) => {
        if (!file) return

        setLoading(true);
        setError('');
        setInfo(null);
        setAudioFile(null);
        setBeatmap(null);

        try {
            const zipFile = await JSZip.loadAsync(file);

            const infoFile = zipFile.file('info.json');
            if (!infoFile) {
                setError("Файл info.json не найден");
                setLoading(false);
                return;
            }

            const infoContent = await infoFile.async('string');
            const infoJson = JSON.parse(infoContent) as InfoJson;
            
            const audioFileName = infoJson.audioFile;
            const audioZipFile = zipFile.file(audioFileName);
            if (!audioZipFile) {
                setError("Аудио файл не найден.\nВозможно он отсутствует или не указан в info.json");
                setLoading(false);
                return;
            }
            const audioBlob = await audioZipFile.async("blob");
            const audioFileObject = new File([audioBlob], infoJson.audioFile, { type: audioBlob.type });
            
            const beatmapFileName = infoJson.beatmapFile || "beatmap.json";
            const beatmapFile = zipFile.file(beatmapFileName);
            if (!beatmapFile) {
                setError("Файл карты битов не найден");
                setLoading(false);
                return;
            }
            
            const beatmapContent = await beatmapFile.async("string");
            const beatmapJson = JSON.parse(beatmapContent);

            setInfo(infoJson);
            setAudioFile(audioFileObject);
            setBeatmap(beatmapJson);

        } catch (e) {
            console.error(e);
            setError("Ошибка при чтении архива");
        } finally {
            setLoading(false);
        }
    }

    return {
        info,
        audioFile,
        beatmap,

        error,
        loading,

        importZip,
    }
}