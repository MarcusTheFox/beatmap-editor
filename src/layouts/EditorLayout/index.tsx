import { Navbar, NavbarContent } from "@heroui/navbar";
import { ReactNode } from "react";

import { ThemeSwitch } from "@/components/theme-switch";
import { Title } from "@/components/Title";

interface EditorLayoutProps {
  children: ReactNode;
}

export function EditorLayout(props: EditorLayoutProps) {
    return (
        <div className="relative flex flex-col h-screen">
            <Navbar>
                <NavbarContent>
                    <Title text="Beatmap Editor" />
                </NavbarContent>
                <NavbarContent justify="end">
                    <ThemeSwitch />
                </NavbarContent>
            </Navbar>
            <main className="grid grid-cols-4 gap-4 m-8 h-screen">{props.children}</main>
            <footer />
        </div>
    );
}
