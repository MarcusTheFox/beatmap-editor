"use client"

import { title, subtitle } from "@/src/shared/lib";
import { Step, UploadButton, UploadButtonRef } from "@/src/shared/ui";
import { Level, useLevelLoader } from "@/src/entities/level";
import { getURIFromFileName, getURIFromString } from "@/src/shared/lib";
import { useZip } from "@/src/features/level-export";
import { useRef } from "react";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@heroui/card";
import { Icon24MusicOutline, Icon20ZipOutline } from "@vkontakte/icons";
import { paths } from "@/config/paths";
import { LayoutWithLights } from "@/src/app/layouts";
import editorUsingGif from "@/src/shared/images/editor-using.gif";
import Image from "next/image";

export default function EditorStartPage() {
    const router = useRouter();
    const zip = useZip();
    const { load, create } = useLevelLoader();
    const archiveButtonRef = useRef<UploadButtonRef>(null);

    const handleWavImport = (file: File) => {
        create(file);
        router.push(paths.editor.song(getURIFromFileName(file)).root);
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
        router.push(paths.editor.song(getURIFromString(levelData.id)).root);
    };

    return (
        <LayoutWithLights>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-16">
                <div className="text-center">
                    <h1 className={title()}>Онлайн редактор уровней</h1>
                    <h2 className={subtitle()}>
                        Конструктор уровней для ритм шутера. Создайте карту из своей музыки прямо в браузере.
                    </h2>
                </div>

                <Card className="w-full max-w-4xl mt-8 p-4">
                    <CardBody>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-content2 p-6 rounded-xl flex flex-col items-center text-center gap-4">
                                <div className="bg-primary/10 text-primary p-3 rounded-lg">
                                    <Icon24MusicOutline width={32} height={32} />
                                </div>
                                <h3 className="text-xl font-bold">Создать новый уровень</h3>
                                <p className="text-night-800">Начните с нуля, загрузив аудиофайл в формате .wav.</p>
                                <UploadButton
                                    accept=".wav" 
                                    color="primary" 
                                    variant="shadow"
                                    onFileSelect={handleWavImport}
                                >
                                    Выбрать .wav файл
                                </UploadButton>
                            </div>
                             <div className="bg-content2 p-6 rounded-xl flex flex-col items-center text-center gap-4">
                                <div className="bg-warning/10 text-warning p-3 rounded-lg">
                                    <Icon20ZipOutline width={32} height={32} />
                                </div>
                                <h3 className="text-xl font-bold">Загрузить проект</h3>
                                <p className="text-night-800">Продолжите работу над существующим уровнем, импортировав .zip архив.</p>
                                <UploadButton
                                    ref={archiveButtonRef}
                                    accept=".zip" 
                                    variant="bordered"
                                    className="border-warning text-warning hover:!bg-warning/10 font-semibold"
                                    onFileSelect={handleZipImport}
                                >
                                    Выбрать .zip архив
                                </UploadButton>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </section>

            <section className="px-6 py-8 md:py-16 space-y-12 grow">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Быстрый старт</h2>
                        <div className="flex flex-col gap-6">
                            <Step num="1" title="Подготовьте музыку" description="Выберите трек с четким ритмом в формате .wav." />
                            <Step num="2" title="Создайте карту" description="Загрузите файл, расставьте цели на игровом поле и настройте их." />
                            <Step num="3" title="Экспортируйте и играйте" description="Сохраните уровень в .zip и протестируйте его в игре." />
                        </div>
                    </div>
                    <div className="bg-night-500 w-full min-h-[350px] rounded-2xl flex items-center justify-center border border-night-600 overflow-clip">
                        <Image unoptimized src={editorUsingGif} alt="Гиф как начать работу с редактором"/>
                    </div>
                </div>
            </section>
        </LayoutWithLights>
    );
}