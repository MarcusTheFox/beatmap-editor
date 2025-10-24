"use client"

import { title, subtitle } from "@/src/shared/lib";
import { UploadButton, UploadButtonRef } from "@/src/shared/ui";
import { Level, useLevelLoader } from "@/src/entities/level";
import { getURIFromFileName, getURIFromString } from "@/src/shared/lib";
import { useZip } from "@/src/features/level-export";
import { useRef } from "react";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { DefaultLayout } from "@/src/widgets/layouts/default";

export default function IndexPage() {
    const router = useRouter();
    const zip = useZip();
    const { load, create } = useLevelLoader();
    const archiveButtonRef = useRef<UploadButtonRef>(null);

    const handleWavImport = (file: File) => {
        create(file);
        router.push(`/edit/${getURIFromFileName(file)}`);
    };

    const handleZipImport = async (file: File) => {
        let levelData: Level | null;
        try {
            levelData = await zip.importZip(file);
        } catch (e: any) {
            console.error(e);
            addToast({
                title: "Ошибка импорта",
                description: e.message,
                color: "danger",
                timeout: 10000,
                shouldShowTimeoutProgress: true,
                variant: "bordered"
            });
            archiveButtonRef.current?.clearFile();
            return;
        }
        load(levelData);
        router.push(`/edit/${getURIFromString(levelData.id)}`);
    };

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center">
                    <span className={title()}>Создавайте крутые треки в редакторе</span>
                    <br />
                    <span className={title({ color: "violet" })}>Beam & Beat</span>
                    <br />
                </div>

                <div className="flex gap-3 mt-8">
                    <UploadButton
                        accept=".wav" 
                        radius="full" 
                        size="lg" 
                        color="primary" 
                        variant="shadow"
                        onFileSelect={handleWavImport}
                    >
                        Создать новый уровень (.wav)
                    </UploadButton>
                    <UploadButton
                        ref={archiveButtonRef}
                        accept=".zip" 
                        radius="full" 
                        size="lg" 
                        color="secondary" 
                        variant="ghost"
                        onFileSelect={handleZipImport}
                    >
                        Загрузить проект (.zip)
                    </UploadButton>
                </div>
            </section>
        </DefaultLayout>
    );
}