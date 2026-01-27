import { Alert } from "@heroui/alert";
import { VersionLogType } from ".";

export const VersionLog: VersionLogType = {
    title: "0.2.1-alpha",
    date: new Date(2026, 0, 26),
    highlights: [
        "Исправление багов"
    ],
    body: (
        <>
            <h4 className="pt-4 border-t border-night-600">Исправлены баги</h4>
            <ul>
                <li>
                    Мультиспавн целей при частом рестарте в начале игры.
                </li>
                <li>
                    Музыка не воспроизводилась, после рестарта нормально законченной игры.
                </li>
            </ul>
        </>
    )
};