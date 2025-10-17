import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import { ReactNode } from "react";
import { ThemeSwitch } from "@/components/theme-switch";
import { GameLogo } from "@/components/icons";
import { Link } from "@heroui/link";

interface EditorLayoutProps {
  children: ReactNode;
}

export function EditorLayout(props: EditorLayoutProps) {
    return (
        <div className="relative flex flex-col h-screen">
            <Navbar maxWidth="xl">
                <NavbarContent>
                    <NavbarBrand>
                        <Link
                            className="flex justify-start items-center gap-2"
                            color="foreground"
                            href="/"
                        >
                            <GameLogo />
                            <p className="font-bold text-inherit">Beam & Beat</p>
                        </Link>
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent justify="end">
                    <ThemeSwitch />
                </NavbarContent>
            </Navbar>
            <main id="main-container" className="flex flex-col gap-4 m-8 h-full">{props.children}</main>
            <footer />
        </div>
    );
}
