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
      label: "Home",
      href: paths.root,
    },
    {
      label: "Editor",
      href: paths.editor.root,
    },
    {
      label: "Wiki",
      href: paths.wiki,
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Download",
      href: paths.download,
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    telegram: "https://t.me/+1SJ5S08Sq8JhMTVi",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
    game: gameVersions
  },
};
