import { paths } from "./paths";

export type SiteConfig = typeof siteConfig;

const gameVersions = {
  "0.1.0-alpha": "https://github.com/MarcusTheFox/BeamNBeat/releases/download/v0.1.0-alpha/BeamNBeat-0.1.0-alpha.zip",
  "0.2.0-alpha": "https://github.com/MarcusTheFox/BeamNBeat/releases/download/v0.2.0-alpha/BeamNBeat-0.2.0-alpha.zip",
  "0.2.1-alpha": "https://github.com/MarcusTheFox/BeamNBeat/releases/download/v0.2.1-alpha/BeamNBeat-0.2.1-alpha.zip",
  "0.3.0-alpha": "https://github.com/MarcusTheFox/BeamNBeat/releases/download/v0.3.0-alpha/BeamNBeat-0.3.0-alpha.zip",
}

export type GameVersion = keyof typeof gameVersions;

export const siteConfig = {
  name: "Beam & Beat",
  description: "Beam & Beat - ритм-игра, где вы поражаете цели в такт музыки. Создавайте собственные карты из WAV-файлов в нашем онлайн-редакторе. Скачайте альфа-версию игры Beam & Beat для Windows бесплатно",
  navItems: [
    {
      label: "Главная",
      href: paths.root,
    },
    {
      label: "Вики",
      href: paths.wiki.root,
    },
    {
      label: "Редактор",
      href: paths.editor.root,
    },
  ],
  navMenuItems: [
    {
      label: "Главная",
      href: paths.root,
    },
    {
      label: "Вики",
      href: paths.wiki.root,
    },
    {
      label: "Редактор",
      href: paths.editor.root,
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    telegram: "https://t.me/+1SJ5S08Sq8JhMTVi",
    docs: "https://heroui.com",
    discord: "https://discord.gg/nmzBqYBz9g",
    sponsor: "https://patreon.com/jrgarciadev",
    game: gameVersions
  },
};
