import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import { ReactNode, useEffect } from "react";
import { ThemeSwitch } from "@/components/theme-switch";
import { GameLogo } from "@/components/icons";
import { Link } from "@heroui/link";
import { Icon20DownloadOutline, Icon20ListBulletOutline, Icon20SquareOutline } from "@vkontakte/icons";
import { Button } from "@heroui/button";
import { ExportButton } from "@/components/ExportButton";
import { TimelineSection } from "@/sections/TimelineSection";
import { Outlet, useParams } from "react-router-dom";
import { useAudio } from "@/hooks/useAudio";
import { EditorNotFound } from "@/pages/editorNotFound";

interface EditorLayoutProps {
  children?: ReactNode;
}

export function EditorLayout(props: EditorLayoutProps) {
    const { song } = useParams();
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
                        href={`edit/${song}`}
                        variant="light"
                        startContent={<Icon20SquareOutline />}
                    >
                        Notes
                    </Button>
                    <Button
                        as={Link}
                        href={`edit/${song}/details`}
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
                { props.children ?? <Outlet /> }
            </main>
            <footer>
                <TimelineSection />
            </footer>
        </div>
    );
}
