import { siteConfig, GameVersion } from "@/config/site";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { DevLog } from "@/content/devlog";
import { title, subtitle } from "@/src/shared/lib";
import { Icon24Download, Icon24ArchiveOutline, Icon24CheckCircleOutline, Icon24ComputerOutline } from "@vkontakte/icons";
import { Card } from "@heroui/card";

export default function DownloadPage() {
    const allVersions = Object.entries(DevLog);
    const [ latestVersionKey ] = allVersions[0];

    return (
        <>
            <section className="text-center pb-8">
                <h1 className={title()}>Скачать игру</h1>
                <h2 className={subtitle({ className: "max-w-2xl mx-auto" })}>
                    Скачайте последнюю альфа-версию Beam & Beat и следите за историей обновлений.
                </h2>
            </section>
            
            <section className="container mx-auto px-6 mb-12">
                <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/10 to-transparent border-2 border-primary/50 shadow-xl shadow-primary/5">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-3xl font-bold">Скачать последнюю версию</h3>
                            <p className="font-mono text-lg text-primary mt-1">{latestVersionKey}</p>
                        </div>
                        <Button
                            as={Link}
                            color="primary"
                            variant="shadow"
                            size="lg"
                            href={siteConfig.links.game[latestVersionKey as GameVersion]}
                            startContent={<Icon24Download />}
                            className="w-full md:w-auto font-bold text-lg px-8 py-4"
                        >
                            Скачать
                        </Button>
                    </div>
                </Card>
            </section>
            
            <section className="container mx-auto px-6 pb-16">
                <div className="relative text-center mb-12">
                    <hr className="border-t border-night-600" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-background flex items-center gap-2 text-night-800">
                        <Icon24ArchiveOutline />
                        История версий
                    </span>
                </div>
                
                <div className="space-y-8">
                    {allVersions.map(([version, log]) => (
                        <Card key={version} className="bg-content2 grid grid-cols-1 md:grid-cols-3">
                            <div className="md:col-span-1 p-6 border-b md:border-b-0 md:border-r border-night-600">
                                <h4 className="font-bold mb-3">Ключевые изменения:</h4>
                                <ul className="space-y-2">
                                    {log.highlights.map((item, index) => (
                                        <li key={index} className="flex items-start gap-2 text-sm text-night-800">
                                            <Icon24CheckCircleOutline className="flex-shrink-0 mt-0.5 text-green-500" width={16} height={16} />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="md:col-span-2 p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold">{log.title}</h3>
                                    <p className="text-sm text-night-700">{log.date.toLocaleDateString('ru-RU')}</p>
                                </div>
                                <div className="prose prose-invert text-night-800">
                                    {log.body}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
            
            <section className="w-full border-t border-night-600 pt-8">
                <div className="container mx-auto px-6 text-center text-sm text-night-700">
                     <h4 className="font-bold text-night-800 mb-2 flex items-center justify-center gap-2">
                        <Icon24ComputerOutline />
                        Системные требования (Alpha)
                    </h4>
                    <p>
                        <strong>ОС:</strong> Windows 10+ | <strong>Память:</strong> 4 GB ОЗУ | <strong>Видеокарта:</strong> DirectX 11 | <strong>Место:</strong> 400 MB</p>
                </div>
            </section>
        </>
    );
}