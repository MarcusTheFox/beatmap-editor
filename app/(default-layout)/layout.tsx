import { DefaultLayout } from "@/src/app/layouts/default";

export default function MainLayout({
    children,
} : {
    children: React.ReactNode
}) {
    return (
        <DefaultLayout>
            { children }
        </DefaultLayout>
    );
}
