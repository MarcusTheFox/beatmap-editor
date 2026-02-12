"use client";

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
import { redirect } from "next/navigation";
import { paths } from "@/config/paths";

interface EditorLayoutProps {
    params: Promise<{ song: string; }>;
    children?: ReactNode;
}

export default function EditorLayout({ params, children }: EditorLayoutProps ) {
    const { song } = React.use( params );
    const { audioUrl } = useAudio();

    if ( !audioUrl ) {
        redirect( paths.editor.notFound );
    }

    useEffect(() => {
        const handleBeforeUnload = ( e: BeforeUnloadEvent ) => {
            e.preventDefault();
        };

        window.addEventListener( "beforeunload", handleBeforeUnload );
        return () => window.removeEventListener( "beforeunload", handleBeforeUnload );
    }, []);

    return (
        <div className="relative flex flex-col h-screen">
            <Navbar className="border-b-1 border-b-default-200" maxWidth="xl">
                <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                    <NavbarBrand className="max-w-fit gap-3">
                        <Link
                            className="flex justify-start items-center"
                            color="foreground"
                            href={ paths.root }
                        >
                            <GameLogo />
                        </Link>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent justify="center">
                    { /* <Button
                        as={Link}
                        href={paths.editor.song(song).root}
                        variant="light"
                        startContent={<Icon20SquareOutline />}
                    >
                        Ноты
                    </Button>
                    <Button
                        as={Link}
                        href={paths.editor.song(song).details}
                        variant="light"
                        startContent={<Icon20ListBulletOutline />}
                    >
                        Детали
                    </Button> */ }
                </NavbarContent>

                <NavbarContent justify="end">
                    <ExportButton
                        color="primary"
                        startContent={ <Icon20DownloadOutline /> }
                        variant="ghost"
                    >
                        Экспорт
                    </ExportButton>
                </NavbarContent>
            </Navbar>

            <main className="flex flex-col gap-8 m-8 justify-between h-full" id="main-container">
                { children }
            </main>

            <footer>
                <TimelineSection />
            </footer>
        </div>
    );
}
