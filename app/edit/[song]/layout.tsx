"use client"

import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import React, { ReactNode, useEffect } from "react";
import { ThemeSwitch } from "@/src/features/theme-switch";
import { Link } from "@heroui/link";
import { Icon20DownloadOutline, Icon20ListBulletOutline, Icon20SquareOutline } from "@vkontakte/icons";
import { Button } from "@heroui/button";
import { ExportButton } from "@/src/features/level-export";
import { TimelineSection } from "@/src/features/timeline";
import { useAudio } from "@/src/entities/audio";
import { GameLogo } from "@/src/shared/ui";
import { EditorNotFound } from "@/src/widgets/editor-not-found/ui";

interface EditorLayoutProps {
    params: Promise<{ song: string; }>;
    children?: ReactNode;
}

export default function EditorLayout({ params, children }: EditorLayoutProps) {
    const { song } = React.use(params);
    const { audioUrl } = useAudio();
    
    if (!audioUrl) {
        return <EditorNotFound />;
    }

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, []);

    return (
        <div className="relative flex flex-col h-screen">
            <Navbar maxWidth="xl" className="border-b-1 border-b-default-200">
                <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                    <NavbarBrand className="max-w-fit gap-3">
                        <Link
                            className="flex justify-start items-center"
                            color="foreground"
                            href="/"
                        >
                            <GameLogo />
                        </Link>
                    </NavbarBrand>
                    <ThemeSwitch />
                </NavbarContent>
                <NavbarContent justify="center">
                    <Button
                        as={Link}
                        href={`/edit/${song}`}
                        variant="light"
                        startContent={<Icon20SquareOutline />}
                    >
                        Notes
                    </Button>
                    <Button
                        as={Link}
                        href={`/edit/${song}/details`}
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
                { children }
            </main>
            <footer>
                <TimelineSection />
            </footer>
        </div>
    );
}
