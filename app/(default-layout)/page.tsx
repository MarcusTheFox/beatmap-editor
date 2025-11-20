import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Icon24TargetOutline, Icon24BrushOutline, Icon24Users3Outline, Icon24Download, Icon24Write } from "@vkontakte/icons";
import { Metadata } from "next";
import { Step } from "@/src/shared/ui";
import { LayoutWithLights } from "@/src/app/layouts";

export const metadata: Metadata = {
  title: "Ритм-игра с битмап онлайн-редактором | Скачать игру бесплатно",
  description: "Beam & Beat - ритм-игра, где вы поражаете цели в такт музыки. Создавайте собственные карты из WAV-файлов в нашем онлайн-редакторе. Скачайте альфа-версию игры Beam & Beat для Windows бесплатно",
  keywords: "\
ритм игра, ритм шутер, музыкальная игра, игра под музыку, \
битмап редактор, редактор уровней, редактор карт, редактор карты битов, редактор для ритм игр, \
создать уровень из музыки, создать битмап, создать карту битов, сделать битмап из wav, \
create beatmap, level editor, beatmap editor, \
beam and beat, beam & beat, beam beat, beambeat, beam n beat, beamnbeat, bnb, \
скачать игру, скачать ритм игру, скачать beam and beat, \
игра, ритм, аудио, редактор, editor, beam, beat, битмап, beatmap\
  ".trim(),
  openGraph: {
    title: "Ритм-игра с битмап редактором",
    description: "Поражайте цели в такт музыки. Создавайте собственные карты из любых WAV-файлов. Скачайте альфа-версию бесплатно.",
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Beam & Beat',
  }
};

const AudioWave = (props : {
    color?: "yellow" | "blue",
    bottom?: boolean,
    className?: string,
} ) => {
  const gradientDirection = props.bottom ? "bg-gradient-to-b" : "bg-gradient-to-t";
  const color = props.color == "yellow" ? "from-warning" : "from-primary-500";
  const rounded = props.bottom ? "rounded-b" : "rounded-t";
  const itemsDirection = props.bottom ? "items-start" : "items-end";

  return (
    <div className={`absolute flex ${itemsDirection} h-20 w-full gap-1 ${props.className}`}>
      {Array.from({ length: 150 }, (_, i) => (
        <div
            key={i}
            className={`flex-1 ${gradientDirection} ${color} ${rounded} animate-height-wave`}
            style={{ 
                height: "60px",
                transformOrigin: props.bottom ? 'top' : 'bottom',
                animationDuration: `${Math.random() * 2 + 1}s`,
            }}
        />
      ))}
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="bg-content1 p-6 rounded-xl border border-default-200 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-3">
            <div className="bg-warning/10 text-warning p-3 rounded-lg">
                {icon}
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-night-800">{description}</p>
    </div>
);

export default function IndexPage() {
    return (
        <LayoutWithLights lights={{ bottom: { color: "primary20", height: "lg"} }}>
            <section className="relative">
                <div className="relative w-[96rem] mx-auto">
                    <div className="absolute bg-gradient-to-l from-warning h-5 w-full left-60 top-60 rotate-[45deg] animate-pulse"/>
                    <div className="absolute bg-gradient-to-r from-primary h-5 w-full left-80 top-70 -rotate-[30deg] animate-pulse" style={{animationDelay: ".5s"}}/>
                </div>
                <AudioWave color="yellow" className="bottom-0 -skew-3" />
                <div className="container mx-auto px-6 gap-12 items-center py-20 md:py-28">
                    <div className="text-center lg:text-left content-center h-80 lg:h-96">
                        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tighter bg-gradient-to-t from-default-400 to-default-900 bg-clip-text text-transparent">
                            BEAM <span className="bg-gradient-to-t from-warning-300 to-warning bg-clip-text text-transparent">& </span>BEAT
                        </h1>
                        <p className="mt-6 text-lg text-night-800 max-w-lg mx-auto lg:mx-0">
                            Ритм-игра, где точность выстрелов зависит от чувства ритма. Поражайте цели в такт музыки. Создавайте собственные игровые уровни из любых WAV-файлов в нашем редакторе.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
                            <Button 
                                as={Link}
                                href="/download"
                                color="primary"
                                variant="shadow"
                                radius="full"
                                size="lg"
                                className="text-lg px-8 py-3 font-bold"
                            >
                                Скачать игру
                            </Button>
                            <Button
                                as={Link}
                                href="/editor"
                                variant="bordered"
                                radius="full"
                                size="lg"
                                color="warning"
                                className="text-lg px-8 py-3 hover:!bg-warning/10 font-semibold"
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
                        <p className="text-lg text-night-800 mt-2">Три ключевые особенности ритм-игры Beam & Beat</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Icon24TargetOutline />}
                            title="Играйте в ритм"
                            description="Сбивайте летящие цели, точно попадая в бит музыки. Повышайте рекорды за счет комбо и идеальной точности попаданий."
                        />
                        <FeatureCard
                            icon={<Icon24BrushOutline />}
                            title="Создавайте уровни"
                            description="Встроенный битмап редактор на сайте позволит легко превратить любой ваш WAV-трек в уникальный игровой уровень."
                        />
                        <FeatureCard
                            icon={<Icon24Users3Outline />}
                            title="Делитесь картами"
                            description="Экспортируйте созданные карты битов в ZIP-архивах и обменивайтесь ими с друзьями и сообществом."
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
                            <div className="relative bg-night-500 w-full min-h-[350px] rounded-2xl flex items-center justify-center p-4 border border-night-600 shadow-xl">
                                <p className="text-night-800 text-center">[GIF-анимация редактора]</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h2 className="text-3xl lg:text-4xl font-bold">Создайте свой уровень за 3 шага</h2>
                            <Step 
                                num="1" 
                                title="Загрузите аудиофайл" 
                                description="Начните создание уровня, загрузив ваш любимый трек в формате WAV." 
                            />
                            <Step 
                                num="2" 
                                title="Расставьте цели" 
                                description="Перемещайтесь по таймлайну и отмечайте на поле, когда и где должны появляться цели." 
                            />
                            <Step 
                                num="3" 
                                title="Экспортируйте и играйте" 
                                description="Сохраните готовую битмапу и добавьте её в игру, чтобы посмотреть результат." 
                            />
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="px-6 py-20">
                <div className="max-w-4xl mx-auto p-8 md:p-12 text-center">
                    <h2 className="text-4xl font-bold">Присоединяйтесь к альфа-тестированию</h2>
                    <p className="text-lg text-night-800 mt-2 mb-8">Beam & Beat находится на стадии активной разработки. Скачайте альфа-версию, опробуйте редактор уровней и помогите нам сделать игру лучше!</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            as={Link}
                            href="/download"
                            color="primary"
                            variant="shadow"
                            size="lg"
                            startContent={<Icon24Download />}
                        >
                            Скачать Beam & Beat
                        </Button>
                        <Button
                            as={Link}
                            href="/editor"
                            color="secondary"
                            variant="bordered"
                            size="lg"
                            startContent={<Icon24Write />}
                        >
                            Попробовать редактор
                        </Button>
                    </div>
                </div>
            </section>
        </LayoutWithLights>
    );
}