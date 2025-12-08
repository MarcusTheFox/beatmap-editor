import { Metadata } from "next";
import { Link } from "@heroui/link";
import { paths } from "@/config/paths";
import { Icon24InfoCircleOutline } from "@vkontakte/icons";
import { siteConfig } from "@/config/site";
import { Button } from "@heroui/button";

export const metadata: Metadata = {
    title: "Вики | База знаний и гайды по ритм шутеру",
    description: "Официальная документация по ритм шутеру Beam & Beat. Узнайте, как создать уровень в онлайн битмап редакторе, как рассчитывается ранг в ритм шутере, где лежат сохранения и как исправить ошибки запуска."
};

export default function WikiHomePage() {
    return (
        <>
            <h1>Вики и гайды по ритм шутеру Beam & Beat</h1>
            <p className="text-xl text-default-500 mb-8">
                Добро пожаловать в официальную базу знаний. 
                Здесь собраны подробные инструкции по установке игры, механикам геймплея (очки, ранги) и созданию собственных битмап карт.
            </p>

            {/* Блок "С чего начать" */}
            <div className="not-prose my-8 p-6 bg-default-100/50 rounded-xl border border-default-200">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                    <Icon24InfoCircleOutline className="text-primary" />
                    С чего начать?
                </h3>
                <p className="text-default-500 mb-4">
                    Если вы здесь впервые, рекомендуем начать с установки игры. Если вы уже играете и хотите создать свою карту, переходите к гайду по редактору.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Button 
                        as={Link}
                        href={paths.wiki.installation}
                        variant="solid"
                        color="primary"
                    >
                        Как установить игру →
                    </Button>
                    <Button 
                        as={Link}
                        href={paths.wiki.editorGuide} 
                        variant="solid"
                        className="bg-default-200"
                    >
                        Гайд по созданию уровня
                    </Button>
                </div>
            </div>

            <h2>Разделы документации</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 not-prose mt-6">
                <div>
                    <h3 className="text-xl font-bold mb-4 text-foreground border-b border-default-200 pb-2">
                        Игровой процесс
                    </h3>
                    <ul className="space-y-3">
                        <li>
                            <Link href={paths.wiki.installation} className="block group">
                                <span className="text-foreground font-medium group-hover:text-primary transition-colors">Установка и запуск</span>
                                <span className="block text-sm text-default-500">Скачивание игры и распаковка игры на ПК</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={paths.wiki.requirements} className="block group">
                                <span className="text-foreground font-medium group-hover:text-primary transition-colors">Системные требования</span>
                                <span className="block text-sm text-default-500">Минимальные характеристики для комфортной игры</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={paths.wiki.customLevels} className="block group">
                                <span className="text-foreground font-medium group-hover:text-primary transition-colors">Уровни и сохранения</span>
                                <span className="block text-sm text-default-500">Как добавить свою карту и где искать сохранения</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={paths.wiki.gameplay} className="block group">
                                <span className="text-foreground font-medium group-hover:text-primary transition-colors">Очки и ранги</span>
                                <span className="block text-sm text-default-500">Как начисляются очки и как получить максимальный ранг</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                
                <div>
                    <h3 className="text-xl font-bold mb-4 text-foreground border-b border-default-200 pb-2">
                        Создание уровней (Маппинг)
                    </h3>
                    <ul className="space-y-3">
                        <li>
                            <Link href={paths.wiki.editorGuide} className="block group">
                                <span className="text-foreground font-medium group-hover:text-primary transition-colors">Гайд по редактору</span>
                                <span className="block text-sm text-default-500">Интерфейс, тайминг и экспорт</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={paths.wiki.levelFormat} className="block group">
                                <span className="text-foreground font-medium group-hover:text-primary transition-colors">Формат файлов</span>
                                <span className="block text-sm text-default-500">Структура .zip и JSON схем</span>
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>

            <h2>Сообщество</h2>
            <p>
                Wiki поддерживается сообществом. Если вы нашли ошибку или хотите дополнить статью, обязательно напишите нам в <Link isExternal href={siteConfig.links.telegram} underline="hover">Telegram</Link>.
            </p>
        </>
    );
}