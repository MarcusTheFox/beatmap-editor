import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Онлайн-редактор уровней для ритм-игры | Создайте свою битмапу",
  description: "Создавайте уникальные карты для ритм-игры Beam & Beat в нашем онлайн-редакторе. Загрузите свой .wav трек, расставьте цели и экспортируйте готовую битмапу в .zip",
  openGraph: {
    title: "Онлайн-редактор уровней для ритм-игры",
    description: "Создавайте уникальные карты для ритм-игры Beam & Beat из WAV-треков в нашем онлайн-редакторе.",
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Beam & Beat',
  }
};

export default function EditorPageLayout({
    children
} : {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}