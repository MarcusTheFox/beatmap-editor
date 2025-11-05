import { siteConfig } from "@/config/site";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";

export default function DownloadPage() {
    return (
        <>
            <h1 className="text-4xl font-bold">Скачать ритм-игру Beam & Beat</h1>
            <div className="text-center mb-4">
                <h2 className="text-lg font-bold">Попробуйте раннюю версию прямо сейчас и поделитесь своим опытом с нами.</h2>
                <p>Вы можете привнести вклад в развитие и помочь сделать игру лучше.</p>
            </div>
            <Alert
                title={
                    <span className="text-medium font-bold">
                        Игра сейчас находится на стадии активной разработки.
                    </span>
                }
                description={"Могут встречаться баги и ошибки. Если вы их встретите, пожалуйста, сообщите нам о них."}
                isVisible={true}
                color="danger"
                variant="faded"
            />
            <Card className="w-full">
                <CardHeader className="flex flex-row justify-between gap-4 border-b-1 border-b-default-200 bg-default-100">
                    <h3 className="font-bold">Версия 0.1.0-alpha</h3>
                    <span className="font-light text-sm text-default-500">6 сентября 2025</span>
                </CardHeader>
                <CardBody className="inline-block justify-center">
                    <div className="space-y-4 text-left">
                        <p>
                            Добро пожаловать в первую альфа-версию Beam & Beat! Этот релиз — наш фундамент, и мы приглашаем вас стать одними из первых, кто опробует ключевые механики, которые делают эту игру уникальной.
                        </p>

                        <h4 className="font-bold text-lg">Что вас ждёт в игре?</h4>
                        <p>
                            Каждый созданный вами трек оживает благодаря системе, которая точно следует вашим инструкциям из редактора. Вот как это работает на практике:
                        </p>
                        <ul className="list-disc list-inside pl-4 space-y-2">
                            <li>
                                <span className="font-semibold">Появление целей:</span> Каждая нота, которую вы разместили на сетке 7x7 в редакторе, превращается в цель, появляющуюся из той же точки на игровом поле. Это дает вам полный контроль над "танцем" целей на экране.
                            </li>
                            <li>
                                <span className="font-semibold">Свойство "Power":</span> Это один из ключевых параметров, который вы задаете в редакторе. Он определяет начальную скорость и высоту полета цели. Экспериментируя с этим значением, вы можете создавать как плавные, так и очень резкие, динамичные уровни.
                            </li>
                            <li>
                                <span className="font-semibold">Система очков и комбо:</span> Ваш успех вознаграждается! За каждое попадание начисляются очки, а непрерывная серия успехов (комбо) активирует множитель, позволяя достигать невероятных результатов.
                            </li>
                            <li>
                                <span className="font-semibold">Оценка ваших действий:</span> Игра анализирует каждое ваше действие и дает оценку:
                                <ul className="list-['-_'] list-inside pl-6 pt-1">
                                    <li><span className="font-bold text-green-500">Perfect:</span> Отлично! Вы попали в цель и продлили свою серию комбо.</li>
                                    <li><span className="font-bold text-gray-500">Miss:</span> Цель была упущена. Ваша серия комбо прервётся.</li>
                                    <li><span className="font-bold text-red-500">Lost:</span> Цель упала обратно на платформу, что считается ошибкой. Это не только сбросит комбо, но и отнимет 50 очков.</li>
                                </ul>
                            </li>
                        </ul>

                        <h4 className="font-bold text-lg">От идеи к игре за 4 шага</h4>
                        <p>
                            Мы постарались сделать процесс переноса ваших творений в игру максимально простым:
                        </p>
                        <ol className="list-decimal list-inside pl-4 space-y-2">
                            <li>Откройте наш веб-редактор и загрузите свой любимый трек в формате <code className="bg-default-200 px-1 rounded-md">.wav</code>.</li>
                            <li>Дайте волю своему воображению и создайте уникальную карту битов.</li>
                            <li>Нажмите "Export", чтобы упаковать ваш уровень (аудио, карта и метаданные) в один <code className="bg-default-200 px-1 rounded-md">.zip</code> архив.</li>
                            <li>Переместите этот архив в папку <code className="bg-default-200 px-1 rounded-md">UserTracks</code> в директории игры. Готово! Ваш трек появится в игре.</li>
                        </ol>

                        <p>
                            Теперь, когда вы знаете основы, самое интересное в ваших руках. Мы будем очень рады, если вы поделитесь своими впечатлениями. Насколько удобно создавать уровни? Как ощущается игровой процесс? Ваше мнение поможет нам понять, что уже работает хорошо, а что можно сделать еще лучше.
                        </p>
                        <p>
                            Спасибо, что присоединились к нам на этом раннем этапе. Приятной игры и творчества!
                        </p>
                    </div>
                </CardBody>
                <CardFooter>
                    <Button
                        as={Link}
                        color="primary"
                        variant="ghost"
                        href={siteConfig.links.game["0.1.0-alpha"]}
                    >
                        Скачать версию 0.1.0-alpha
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}
