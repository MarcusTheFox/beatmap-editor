import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Системные требования для ритм шутера Beam & Beat (Alpha)",
    description: "Минимальные и рекомендуемые требования для запуска ритм шутера на Windows.",
};

export default function RequirementsPage() {
    return (
        <>
            <h1>Системные требования</h1>

            <p>
                Beam & Beat создана на движке
                { " " }
                <strong>Unreal Engine 5</strong>
                .
                На данном этапе альфа-тестирования игра не прошла полную оптимизацию, поэтому для стабильной работы требуется современное железо.
            </p>

            <h2 id="pc-specs">Требования к ПК</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-6">
                <div className="p-6 border border-default-200 rounded-xl bg-content1 shadow-sm">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        Минимальные
                    </h3>

                    <ul className="space-y-3 text-sm">
                        <li className="flex justify-between border-b border-default-200 pb-2">
                            <span className="font-semibold text-default-600">ОС:</span>
                            <span>Windows 10 (64-bit)</span>
                        </li>

                        <li className="flex justify-between border-b border-default-200 pb-2">
                            <span className="font-semibold text-default-600">Процессор:</span>

                            <span className="text-right">
                                Intel Core i3-8100 /
                                <br/>
                                AMD Ryzen 3 1200
                            </span>
                        </li>

                        <li className="flex justify-between border-b border-default-200 pb-2">
                            <span className="font-semibold text-default-600">ОЗУ:</span>
                            <span>8 GB</span>
                        </li>

                        <li className="flex justify-between border-b border-default-200 pb-2">
                            <span className="font-semibold text-default-600">Видеокарта:</span>

                            <span className="text-right">
                                DX11 совместимая
                                <br/>
                                (2 GB VRAM)
                            </span>
                        </li>

                        <li className="flex justify-between pt-1">
                            <span className="font-semibold text-default-600">Место на диске:</span>
                            <span>~ 1 GB</span>
                        </li>
                    </ul>
                </div>

                <div className="p-6 border border-primary/30 bg-primary/5 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary">
                        Рекомендуемые
                    </h3>

                    <ul className="space-y-3 text-sm">
                        <li className="flex justify-between border-b border-primary/20 pb-2">
                            <span className="font-semibold text-default-600">ОС:</span>
                            <span>Windows 10 / 11 (64-bit)</span>
                        </li>

                        <li className="flex justify-between border-b border-primary/20 pb-2">
                            <span className="font-semibold text-default-600">Процессор:</span>

                            <span className="text-right">
                                Intel Core i5-10400 /
                                <br/>
                                AMD Ryzen 5 3600
                            </span>
                        </li>

                        <li className="flex justify-between border-b border-primary/20 pb-2">
                            <span className="font-semibold text-default-600">ОЗУ:</span>
                            <span>16 GB</span>
                        </li>

                        <li className="flex justify-between border-b border-primary/20 pb-2">
                            <span className="font-semibold text-default-600">Видеокарта:</span>

                            <span className="text-right">
                                NVIDIA GTX 1660 /
                                <br/>
                                RTX 2060
                            </span>
                        </li>

                        <li className="flex justify-between pt-1">
                            <span className="font-semibold text-default-600">Место на диске:</span>
                            <span>{ ">" } 1 GB (SSD)</span>
                        </li>
                    </ul>
                </div>
            </div>

            <blockquote>
                <strong>Примечание:</strong>
                { " " }
                Игра требует установки пакета
                <strong>DirectX Runtime</strong>
                { " " }
                и драйверов видеокарты последней версии. На интегрированных видеокартах (Intel HD/UHD) работа не гарантируется.
            </blockquote>

            <h2 id="editor-req">Требования для онлайн-редактора</h2>

            <p>
                Редактор уровней работает отдельно от игры, прямо в вашем браузере.
            </p>

            <ul>
                <li>
                    <strong>Браузер:</strong>
                    { " " }
                    Chrome, Edge, Yandex (движок Chromium).
                </li>

                <li>
                    <strong>ОЗУ:</strong>
                    { " " }
                    Не менее 4 GB (редактор хранит аудио и все данные уровня в памяти вкладки).
                </li>

                <li>
                    <strong>Экран:</strong>
                    { " " }
                    Желательно 1920x1080 для удобной работы с таймлайном.
                </li>
            </ul>

        </>
    );
}
