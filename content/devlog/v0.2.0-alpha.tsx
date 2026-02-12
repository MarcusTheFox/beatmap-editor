import { Alert } from "@heroui/alert";
import { VersionLogType } from ".";

export const VersionLog: VersionLogType = {
    title: "0.2.0-alpha",
    date: new Date( 2025, 10, 18 ),
    highlights: [
        "Улучшена синхронизация целей с музыкой",
        "Пересмотрен баланс начисления очков",
        "Обновлен внутренний формат уровней",
        "Внимание: старые карты и рекорды несовместимы",
    ],
    body: (
        <>
            <h4 className="pt-4 border-t border-night-600">Важные изменения в геймплее</h4>

            <ul>
                <li>
                    Цели теперь появляются заранее и достигают пика полета в указанный бит.
                </li>

                <li>
                    Система начисления очков изменена, чтобы случайные ошибки не так сильно влияли на итоговый счет и рейтинг.
                </li>
            </ul>

            <Alert className="text-sm" color="warning" title={ <b>Внимание</b> } variant="faded">
                <span>Из-за нового баланса старые рекорды стали неактуальны. Рекомендуем удалить файлы сохранений, чтобы избежать сравнения с недостижимыми результатами.</span>
            </Alert>

            <h4 className="pt-4 border-t border-night-600">Обновлен формат карты битов</h4>

            <ul>
                <li>
                    Файл
                    { " " }
                    <code>info.json</code>
                    { " " }
                    полностью переработан.
                </li>

                <li>
                    В
                    { " " }
                    <code>beatmap.json</code>
                    { " " }
                    свойства нот (например,
                    { " " }
                    <code>power</code>
                    ) теперь находятся внутри объекта
                    { " " }
                    <code>properties</code>
                    { }
                    .
                </li>
            </ul>

            <Alert className="text-sm" color="danger" title={ <b>Внимание</b> } variant="faded">
                <span>
                    Карты, созданные для версии
                    { " " }
                    <code className="text-danger-700">0.1.0-alpha</code>
                    { }
                    ,
                    { " " }
                    <strong className="text-danger-700">несовместимы</strong>
                    { " " }
                    с новой версией. Пожалуйста, пересоздайте ваши уровни в обновленном редакторе.
                </span>
            </Alert>

            <p className="text-sm text-night-700 mt-6 pt-4 border-t border-night-600">
                <em>
                    Спасибо за вашу поддержку и фидбек! Мы продолжаем работу над улучшением игры и редактора.
                </em>
            </p>
        </>
    ),
};
