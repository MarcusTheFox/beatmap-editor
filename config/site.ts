import { paths } from "./paths";

export type SiteConfig = typeof siteConfig;

const gameVersions = {
  "0.1.0-alpha": "https://github.com/MarcusTheFox/BeamNBeat/releases/download/v0.1.0-alpha/BeamNBeat-0.1.0-alpha.zip",
  "0.2.0-alpha": "https://github.com/MarcusTheFox/BeamNBeat/releases/download/v0.2.0-alpha/BeamNBeat-0.2.0-alpha.zip"
}

export type GameVersion = keyof typeof gameVersions;

export const siteConfig = {
  name: "Next.js + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Главная",
      href: paths.root,
    },
    {
      label: "Редактор",
      href: paths.editor.root,
    },
    {
      label: "Скачать",
      href: paths.download,
    },
  ],
  navMenuItems: [
    {
      label: "Главная",
      href: paths.root,
    },
    {
      label: "Редактор",
      href: paths.editor.root,
    },
    {
      label: "Скачать",
      href: paths.download,
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
