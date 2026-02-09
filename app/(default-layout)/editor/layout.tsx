import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Онлайн битмап редактор для ритм игры | Создать уровень из WAV",
    description: "Бесплатный инструмент для создания уровней (карт) к ритм шутеру Beam & Beat. Загрузите свой WAV файл и создайте битмапу без скачивания игры.",
    openGraph: {
        title: "Онлайн битмап редактор для ритм игры",
        description: "Бесплатный инструмент для создания уровней к ритм шутеру Beam & Beat. Загрузите свой WAV файл и создайте битмапу без скачивания игры.",
        type: "website",
        locale: "ru_RU",
        siteName: "Beam & Beat",
    },
};

export default function EditorPageLayout({
    children,
} : {
    children: React.ReactNode
}) {
    return (
        <>
            { children }
        </>
    );
}
