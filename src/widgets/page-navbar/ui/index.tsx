"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { GameLogo } from "@/src/shared/ui";
import { Icon24Download } from "@vkontakte/icons";
import { usePathname } from "next/navigation";
import { Tab, Tabs } from "@heroui/tabs";

export const Navbar = () => {
  const pathname = usePathname();

  const getTabKey = () => {
    const foundItem = siteConfig.navItems.find(item => {
        if (item.href === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(item.href);
    });
    
    return foundItem ? foundItem.href : null;
  };

  return (
    <HeroUINavbar 
        maxWidth="xl" 
        position="sticky" 
        isBlurred={false}
        isBordered
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit mr-4">
          <Link color="foreground" className="flex justify-start items-center gap-2" href="/">
            <GameLogo />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      
      <NavbarContent className="hidden lg:flex basis-1/5 sm:basis-full" justify="center">
        <Tabs selectedKey={getTabKey()} aria-label="Navigation" variant="underlined" radius="full">
          {siteConfig.navItems.map((item) => {
            return (
              <Tab key={item.href} href={item.href} title={item.label}/>
            )
          })}
        </Tabs>
      </NavbarContent>
      
      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem>
            <Button
                as={Link}
                href="/download"
                color="primary"
                variant="shadow"
                radius="full"
                size="sm"
                className="font-bold px-6"
                startContent={<Icon24Download width={16} height={16}/>}
            >
                Скачать
            </Button>
        </NavbarItem>
      </NavbarContent>
      
      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="bg-night-100/95 backdrop-blur-2xl pt-8 border-t border-white/5">
        <div className="mx-4 flex flex-col gap-6">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={pathname === item.href ? "primary" : "foreground"}
                className={clsx(
                    "w-full text-xl font-bold py-2 tracking-tight",
                    pathname === item.href && "pl-4 border-l-4 border-primary"
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          <div className="mt-8 pt-8 border-t border-white/10">
             <Button 
                fullWidth 
                as={Link} 
                href="/download" 
                color="primary" 
                size="lg"
                variant="shadow"
                startContent={<Icon24Download />}
            >
                Скачать игру
             </Button>
          </div>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};