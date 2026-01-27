import { Link } from "@heroui/link";
import { siteConfig } from "@/config/site";
import { paths } from "@/config/paths";
import { GameLogo } from "@/src/shared/ui";
import { DiscordIcon, TelegramIcon } from "@/src/shared/ui/icons";

export const Footer = () => {
    return (
        <footer className="w-full bg-night-100 border-t border-default-200 py-8">
            <div className="container mx-auto px-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
                    <div className="flex flex-col gap-3">
                        <Link href="/" color="foreground" className="flex items-center gap-2" aria-label="На главную">
                            <GameLogo size="sm" />
                        </Link>
                        <p className="text-xs text-default-500 leading-relaxed max-w-[240px]">
                            Ритм шутер с онлайн редактором уровней.
                            Стреляй в бит, создавай карты, делись с друзьями.
                        </p>
                        <div className="flex gap-4 mt-1">
                            <Link isExternal href={siteConfig.links.telegram} aria-label="Наш Telegram">
                                <TelegramIcon className="text-default-400 hover:text-[#229ED9] transition-colors w-5 h-5" />
                            </Link>
                            <Link isExternal href={siteConfig.links.discord} aria-label="Наш Discord">
                                <DiscordIcon className="text-default-400 hover:text-[#5865F2] transition-colors w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="font-bold text-default-600 text-xs uppercase tracking-wider mb-3">Игра</h3>
                        <ul className="space-y-1.5">
                            <li>
                                <Link href={paths.download} size="sm" className="text-default-500 hover:text-primary transition-colors text-sm">
                                    Скачать на ПК
                                </Link>
                            </li>
                            <li>
                                <Link href={paths.wiki.requirements} size="sm" className="text-default-500 hover:text-primary transition-colors text-sm">
                                    Системные требования
                                </Link>
                            </li>
                            <li>
                                <Link href={paths.wiki.gameplay} size="sm" className="text-default-500 hover:text-primary transition-colors text-sm">
                                    Таблица рангов
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="font-bold text-default-600 text-xs uppercase tracking-wider mb-3">Маппинг</h3>
                        <ul className="space-y-1.5">
                            <li>
                                <Link href={paths.editor.root} size="sm" className="text-default-500 hover:text-primary transition-colors text-sm">
                                    Онлайн редактор
                                </Link>
                            </li>
                            <li>
                                <Link href={paths.wiki.editorGuide} size="sm" className="text-default-500 hover:text-primary transition-colors text-sm">
                                    Гайд по созданию карт
                                </Link>
                            </li>
                            <li>
                                <Link href={paths.wiki.levelFormat} size="sm" className="text-default-500 hover:text-primary transition-colors text-sm">
                                    Формат файлов (.zip)
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="font-bold text-default-600 text-xs uppercase tracking-wider mb-3">Поддержка</h3>
                        <ul className="space-y-1.5">
                            <li>
                                <Link href={paths.wiki.root} size="sm" className="text-default-500 hover:text-primary transition-colors text-sm">
                                    Вики (Wiki)
                                </Link>
                            </li>
                            <li>
                                <Link href={paths.wiki.faq} size="sm" className="text-default-500 hover:text-primary transition-colors text-sm">
                                    Решение проблем (FAQ)
                                </Link>
                            </li>
                            <li>
                                <Link href={paths.wiki.customLevels} size="sm" className="text-default-500 hover:text-primary transition-colors text-sm">
                                    Где лежат сохранения
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-default-200/50 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-default-500">
                    <div>© {new Date().getFullYear()} Beam & Beat. All rights reserved.</div>
                    <div>Developed by MarcusTheFox</div>
                </div>
            </div>
        </footer>
    );
};