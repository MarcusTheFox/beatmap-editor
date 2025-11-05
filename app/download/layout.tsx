import { DefaultLayout } from "@/src/widgets/layouts/default";

export default function DownloadLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4">
                {children}
            </section>
        </DefaultLayout>
    );
}
