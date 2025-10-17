import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import { ReactNode } from "react";
import { ThemeSwitch } from "@/components/theme-switch";
import { GameLogo } from "@/components/icons";
import { Link } from "@heroui/link";
import { Icon20DownloadOutline, Icon20ListBulletOutline, Icon20SquareOutline } from "@vkontakte/icons";
import { Button } from "@heroui/button";
import { ExportButton } from "@/components/ExportButton";
import { TimelineSection } from "@/sections/TimelineSection";

interface EditorLayoutProps {
  children: ReactNode;
}

export function EditorLayout(props: EditorLayoutProps) {
    return (
        <div className="relative flex flex-col h-screen">
            <Navbar maxWidth="2xl" className="border-b-1 border-b-default-200">
                <NavbarContent>
                    <NavbarBrand className="max-w-fit mr-10">
                        <Link
                            className="flex justify-start items-center gap-2"
                            color="foreground"
                            href="/"
                        >
                            <GameLogo />
                            <p className="font-bold text-inherit">Beam & Beat</p>
                        </Link>
                    </NavbarBrand>
                    <ThemeSwitch />
                </NavbarContent>
                <NavbarContent justify="center">
                    <Button
                        as={Link}
                        href="#"
                        variant="light"
                        startContent={<Icon20SquareOutline />}
                    >
                        Notes
                    </Button>
                    <Button
                        as={Link}
                        href="#"
                        variant="light"
                        startContent={<Icon20ListBulletOutline />}
                    >
                        Details
                    </Button>
                </NavbarContent>
                <NavbarContent justify="end">
                    <ExportButton
                        variant="ghost"
                        color="primary"
                        startContent={<Icon20DownloadOutline />}
                    >
                        Export
                    </ExportButton>
                </NavbarContent>
            </Navbar>
            <main id="main-container" className="flex flex-col gap-8 m-8 justify-between h-full">
                {props.children}
            </main>
            <footer>
                <TimelineSection />
            </footer>
        </div>
    );
}
