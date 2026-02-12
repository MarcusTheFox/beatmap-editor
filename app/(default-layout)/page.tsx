import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Icon24TargetOutline, Icon24BrushOutline, Icon24Users3Outline, Icon24Download, Icon24Write } from "@vkontakte/icons";
import { Metadata } from "next";
import { Step } from "@/src/shared/ui";
import { LayoutWithLights } from "@/src/app/layouts";
import Image from "next/image";
import editorNotesGif from "@/src/shared/images/editor-notes.gif";
import { AudioWave } from "@/src/shared/ui/AudioWave";

export const metadata: Metadata = {
    title: "Новый ритм шутер Beam & Beat, где надо стрелять в такт музыки | Попробуйте онлайн битмап редактор бесплатно",
    description: "Бесплатный ритм шутер на ПК, где нужно стрелять по летящим целям под музыку. Создавайте свои уровни в онлайн битмап редакторе из WAV файлов. Скачать ритм шутер Beam & Beat бесплатно на Windows.",
    openGraph: {
        title: "Новый ритм шутер с онлайн битмап редактором",
        description: "Стреляйте по целям в такт музыки. Создавайте собственные карты из любых WAV-файлов. Скачайте игру Beam & Beat бесплатно.",
        type: "website",
        locale: "ru_RU",
        siteName: "Beam & Beat",
    },
    verification: {
        yandex: "baeea4418c6bcf20",
    },
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="bg-content1 p-6 rounded-xl border border-default-200 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-3">
            <div className="bg-warning/10 text-warning p-3 rounded-lg">
                { icon }
            </div>

            <h3 className="text-xl font-bold">{ title }</h3>
        </div>

        <p className="text-night-800">{ description }</p>
    </div>
);

export default function IndexPage() {
    return (
        <LayoutWithLights lights={{ bottom: { color: "primary20", height: "lg" } }}>
            <section className="relative">
                <div className="relative w-[96rem] mx-auto">
                    <div className="absolute bg-gradient-to-l from-warning h-5 w-full left-60 top-60 rotate-[45deg] animate-pulse"/>
                    <div className="absolute bg-gradient-to-r from-primary h-5 w-full left-80 top-70 -rotate-[30deg] animate-pulse" style={{ animationDelay: ".5s" }}/>
                </div>

                <AudioWave className="bottom-0 -skew-3" color="yellow" />

                <div className="container mx-auto px-6 gap-12 items-center py-20 md:py-28">
                    <div className="text-center lg:text-left content-center h-80 lg:h-96">
                        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tighter bg-gradient-to-t from-default-400 to-default-900 bg-clip-text text-transparent">
                            BEAM
                            { " " }
                            <span className="bg-gradient-to-t from-warning-300 to-warning bg-clip-text text-transparent">&</span>
                            { " " }
                            BEAT
                        </h1>

                        <p className="mt-6 text-lg text-night-800 max-w-lg mx-auto lg:mx-0">
                            Новый динамичный ритм шутер, где точность выстрелов зависит от чувства ритма.
                            Стреляйте по летящим целям в такт музыки. Используйте онлайн битмап редактор, чтобы создать уровень из любой песни.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
                            <Button
                                as={ Link }
                                className="text-lg px-8 py-3 font-bold"
                                color="primary"
                                href="/download"
                                radius="full"
                                size="lg"
                                variant="shadow"
                            >
                                Скачать игру
                            </Button>

                            <Button
                                as={ Link }
                                className="text-lg px-8 py-3 hover:!bg-warning/10 font-semibold"
                                color="warning"
                                href="/editor"
                                radius="full"
                                size="lg"
                                variant="bordered"
                            >
                                Открыть редактор
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative py-20 md:py-24">
                <div className="absolute inset-0 bg-night-400 -skew-y-3" />

                <div className="relative container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold">Играйте, создавайте, делитесь</h2>
                        <p className="text-lg text-night-800 mt-2">Три ключевые особенности ритм шутера Beam & Beat</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            description="В игре цели летят вверх. Стреляйте по целям точно попадая в бит музыки. Повышайте рекорды за счет комбо и идеальной точности попаданий."
                            icon={ <Icon24TargetOutline /> }
                            title="Играйте в ритм"
                        />

                        <FeatureCard
                            description="Наш онлайн битмап редактор позволит легко превратить любой ваш WAV трек в уникальный игровой уровень."
                            icon={ <Icon24BrushOutline /> }
                            title="Создавайте уровни"
                        />

                        <FeatureCard
                            description="Экспортируйте созданные карты битов в ZIP-архивах и обменивайтесь ими с друзьями и сообществом в нашем Telegram."
                            icon={ <Icon24Users3Outline /> }
                            title="Делитесь картами"
                        />
                    </div>
                </div>
            </section>

            <section className="relative py-20 md:py-24">
                <div className="pt-30"/>
                <AudioWave bottom className="top-0 -skew-3"/>

                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                        <div className="relative flex items-center justify-center p-8">
                            <div className="absolute inset-0 border-2 border-dashed border-night-600 rounded-3xl transform rotate-6" />

                            <div className="relative bg-night-500 w-full min-h-[350px] rounded-2xl flex items-center justify-center border border-night-600 shadow-xl overflow-clip">
                                <Image unoptimized alt="Демонстрация нот в редакторе" src={ editorNotesGif } />
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h2 className="text-3xl lg:text-4xl font-bold">
                                Как создать свой уровень с нуля
                            </h2>

                            <Step
                                description="Начните создание уровня, загрузив ваш любимый трек в формате WAV."
                                num="1"
                                title="Загрузите аудиофайл"
                            />

                            <Step
                                description="Перемещайтесь по таймлайну и отмечайте на поле, где и когда должны появляться цели."
                                num="2"
                                title="Расставьте цели"
                            />

                            <Step
                                description="Сохраните готовый уровень и добавьте его в игру, чтобы посмотреть результат."
                                num="3"
                                title="Экспортируйте и играйте"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 py-20">
                <div className="max-w-4xl mx-auto p-8 md:p-12 text-center">
                    <h2 className="text-4xl font-bold">Присоединяйтесь к альфа-тестированию</h2>
                    <p className="text-lg text-night-800 mt-2 mb-8">Ритм игра Beam & Beat находится на стадии активной разработки. Скачайте альфа-версию, опробуйте онлайн редактор уровней и помогите нам сделать игру лучше!</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            as={ Link }
                            color="primary"
                            href="/download"
                            size="lg"
                            startContent={ <Icon24Download /> }
                            variant="shadow"
                        >
                            Скачать Beam & Beat
                        </Button>

                        <Button
                            as={ Link }
                            color="secondary"
                            href="/editor"
                            size="lg"
                            startContent={ <Icon24Write /> }
                            variant="bordered"
                        >
                            Попробовать редактор
                        </Button>
                    </div>
                </div>
            </section>
        </LayoutWithLights>
    );
}
