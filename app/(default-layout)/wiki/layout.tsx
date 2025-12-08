"use client"

import { Link } from "@heroui/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ReactNode } from "react";
import { LayoutWithLights } from "@/src/app/layouts";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { paths } from "@/config/paths";

const wikiNavSections = [
  {
    title: "Начало",
    items: [
      { label: "Установка и запуск", href: paths.wiki.installation },
      { label: "Системные требования", href: paths.wiki.requirements },
      { label: "Свои уровни и сохранения", href: paths.wiki.customLevels },
    ]
  },
  {
    title: "Геймплей",
    items: [
      { label: "Очки и Ранги", href: paths.wiki.gameplay },
    ]
  },
  {
    title: "Создание уровней",
    items: [
      { label: "Гайд по редактору", href: paths.wiki.editorGuide },
      { label: "Формат файлов", href: paths.wiki.levelFormat },
    ]
  },
  {
    title: "Поддержка",
    items: [
      { label: "Решение проблем", href: paths.wiki.faq },
    ]
  }
];

export default function WikiZenLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <LayoutWithLights>
    <div>
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_240px] gap-12">
          
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <nav className="space-y-6">
                {wikiNavSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-3">{section.title}</h3>
                    <ul className="space-y-1">
                      {section.items.map((item) => (
                        <li key={item.label}>
                          <Button
                            as={Link}
                            variant="light"
                            href={item.href}
                            color={pathname === item.href ? "primary" : "default"}
                            className={clsx(
                              "justify-start w-full text-md",
                              pathname === item.href
                                ? "font-semibold"
                                : "text-default-400 hover:text-white"
                            )}
                          >
                            {item.label}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          <Card className="p-8 lg:p-12 border border-white/10">
            <article className="prose prose-invert max-w-none">
              {children}
            </article>
          </Card>
        </div>
      </div>
    </div>
    </LayoutWithLights>
  );
}