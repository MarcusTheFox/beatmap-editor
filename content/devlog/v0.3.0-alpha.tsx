import { VersionLogType } from ".";

export const VersionLog: VersionLogType = {
    title: "0.3.0-alpha",
    date: new Date( 2026, 1, 8 ),
    highlights: [
        "Добавлены новые оценки попаданий",
        "Обновлена система рассчета очков",
        "Уменьшен штраф за пропуск цели",
    ],
    body: (
        <>
            <h4 className="pt-4 border-t border-night-600">Важные изменения в геймплее и системе подсчета очков</h4>
            <p>Цель отображается в течение короткого промежутка времени.</p>
            <p>Система оценок была обновлена:</p>

            <ul>
                <li>
                    Добавлены оценки Great, Good, Early и Late;
                </li>

                <li>
                    Обновлен расчет очков в зависимости от времени попадания в цель:
                </li>

                <ul>
                    <li>
                        Perfect — 100 очков;
                    </li>

                    <li>
                        Great — 90 очков;
                    </li>

                    <li>
                        Good — 80 очков;
                    </li>

                    <li>
                        Early/Late — 70 очков;
                    </li>
                </ul>

                <li>
                    Снижен штраф за промах с 50 до 10 очков;
                </li>
            </ul>
        </>
    ),
};
